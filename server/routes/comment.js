const express = require("express");
const router = express.Router();

const { Comment } = require("../models/Comment");

//=================================
//             Comment
//=================================

/*********************************************  Comment  ******************************************* */

/* root form에서 입력한 정보 DB에 저장시키기 */
router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err });

    // save할 때는 파라미터로 받은 comment로 populate 쓸수 없음. writer의 모든 정보를 가져올 수 없다.
    // 따라서 모델 Comment를 가져와 comment._id로 저장된 정보를 찾는다.
    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, result });
      });
  });
});

module.exports = router;
