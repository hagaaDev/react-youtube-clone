const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId, // id만 넣어도 User.js의 모든 정보를 불러올 수 있다.
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    privacy: {
      type: Number,
    },
    filePath: {
      type: String,
    },
    category: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true }
);
// 만든 date와 업데이트한 date를 표시하기 위해 timestamps 추가

const Video = mongoose.model("Video", videoSchema);

module.exports = { Video };
