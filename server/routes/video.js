const express = require("express");
const router = express.Router();
const multer = require("multer");

const { Video } = require("../models/Video"); // 비디오 모델 가져오기
const { auth } = require("../middleware/auth");
var ffmpeg = require("fluent-ffmpeg");

/* STORAGE MULTER CONFIG */
let storage = multer.diskStorage({
  // 파일을 어디에 저장할지 설명
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  // 저장할 때 어떤 filename으로 저장할 지
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  // 파일의 확장자
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (
      ext !==
      ".mp4" /* || ext !== '.png' 식으로 or 조건으로 다른 확장자도 추가 가능하다.*/
    ) {
      return cb(res.status(400).end("only mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

//=================================
//             Video
//=================================

/* 클라이언트에서 받은 비디오를 서버에 저장 */
router.post("/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

/* 비디오 정보들을 저장 */
router.post("/uploadVideo", (req, res) => {
  const video = new Video(req.body);

  video.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

/* 썸네일 생성하고 비디오의 러닝타임 가져오기 */
router.post("/thumbnail", (req, res) => {
  let filePath = "";
  let fileDuration = "";

  console.log("post thumbnail > req", req);
  /* 비디오 정보 가져오기 */
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.dir(metadata);
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  /* 썸네일 생성 */
  ffmpeg(req.body.url)
    // 비디오 썸네일 filename 생성
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      console.log(filenames);

      filePath = "uploads/thumbnails/" + filenames[0];
    })
    // 생성 후 무엇을 할것인지
    .on("end", function () {
      console.log("Screenshots taken");
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
    })
    // 에러가 났을 시 어떻게 할건지
    .on("error", function (err) {
      console.error(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      // %b input basename ( filename w/o extension )
      filename: "thumbnail-%b.png",
    });
});

module.exports = router;
