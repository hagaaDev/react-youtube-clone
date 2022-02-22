import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";

export default function Comment(props) {
  const videoId = props.postId;
  const user = useSelector((state) => state.user); // 리덕스를 이용하여 로그인유저 정보를 가져옴
  const [commentValue, setCommentValue] = useState("");
  const handleClick = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      content: commentValue,
      writer: user.userData._id,
      postId: videoId,
    };
    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        props.refreshFunction(response.data.result);
        setCommentValue("");
      } else {
        alert("코멘트를 저장하지 못했습니다.");
      }
    });
  };

  return (
    <div>
      <br />
      <p> Replies</p>
      <hr />

      {/* Comment Lists */}
      {props.commentLists &&
        props.commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <SingleComment
                refreshFunction={props.refreshFunction}
                comment={comment}
                postId={videoId}
              />
            )
        )}

      {/* Root Comment Form */}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={commentValue}
          placeholder="코멘트를 작성해 주세요"
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
