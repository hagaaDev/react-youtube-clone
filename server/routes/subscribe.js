const express = require("express");
const router = express.Router();

const { Subscriber } = require("../models/Subscriber"); // 비디오 모델 가져오기

//=================================
//             Subscribe
//=================================

/*********************************************  VideoUploadPage  ******************************************* */

/* 몇 명의 유저가 구독을 하고 있는지 조회 */
router.post("/subscribeNumber", (req, res) => {
  Subscriber.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);
    return res
      .status(200)
      .json({ success: true, subscribeNumber: subscribe.length });
  });
});

/* 업로드한 유저를 구독 하고 있는지 조회 */
router.post("/subscribed", (req, res) => {
  Subscriber.find({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);
    let result = false;
    if (subscribe.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, subscribed: result });
  });
});

module.exports = router;
