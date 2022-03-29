const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DislikeSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    }
  },
  { timestamps: true }
);
// 만든 date와 업데이트한 date를 표시하기 위해 timestamps 추가

const Dislike = mongoose.model("Dislike", DislikeSchema);

module.exports = { Dislike };
