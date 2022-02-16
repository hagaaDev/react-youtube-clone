const express = require("express");
const router = express.Router();
const multer = require("multer");

//const { Video } = require("../models/Video"); // 비디오 모델 가져오기
const { auth } = require("../middleware/auth");

//STORAGE MULTER CONFIG
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

router.post("/uploadfiles", (req, res) => {
  // 클라이언트에서 받은 비디오를 서버에 저장
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

module.exports = router;
