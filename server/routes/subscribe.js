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

/* 구독버튼 눌렀을 때 이미 구독중이라면 구독취소 */
router.post("/unSubscribe", (req, res) => {
  Subscriber.findOneAndDelete({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
});

/* 구독버튼 눌렀을 때 이미 구독중이 아니라면 구독 */
router.post("/subscribe", (req, res) => {
  const subscribe = new Subscriber(req.body);

  subscribe.save((err, dox) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
