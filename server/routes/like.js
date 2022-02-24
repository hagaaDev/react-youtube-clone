const express = require("express");
const router = express.Router();

const { Like } = require("../models/Like");
const { DisLike } = require("../models/DisLike");

//=================================
//             like
//=================================

/*********************************************  Comment  ******************************************* */

/* like에 대한 정보 가져오기 */
router.post("/getLikes", (req, res) => {
  let variable = {};

  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }
  Like.find(variable).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, likes });
  });
});

module.exports = router;
