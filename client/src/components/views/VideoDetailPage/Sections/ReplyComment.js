import React from "react";
import SingleComment from "./SingleComment";

export default function ReplyComment(props) {
  const renderReplyComment = (parentCommentId) => {
    props.commentLists.map((comment, index) => (
      <>
        {comment.responseTo === parentCommentId && (
          <div>
            <SingleComment
              refreshFunction={props.refreshFunction}
              comment={comment}
              postId={props.videoId}
            />
            <ReplyComment
              commentLists={props.commentLists}
              postId={props.videoId}
              parentCommentId={comment._id}
            />
          </div>
        )}
      </>
    ));
  };

  return (
    <div>
      <p style={{ fontSize: "14px", margin: 0, color: "gray" }} onClick>
        View 1 more comment(s)
      </p>
      {renderReplyComment(props.parentCommentId)}
    </div>
  );
}
