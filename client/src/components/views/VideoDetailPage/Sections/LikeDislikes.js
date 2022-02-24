import React, { useState, useEffect } from "react";
import { Tooltip, Icon } from "antd";
import Axios from "axios";

export default function LikeDislikes(props) {
  const [Likes, setLikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);

  let variable = {};

  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    Axios.post("/api/like/getLikes", variable).then((response) => {
      if (response.data.success) {
        // 얼마나 많은 좋아요를 받았는지

        setLikes(response.data.likes.length);

        // 내가 이미 그 좋아요를 눌렀는지

        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("Likes에 정보를 가져오지 못했습니다.");
      }
    });
  }, []);

  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon type="like" theme="filled" onClick />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}> 1 </span>
      </span>

      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <Icon type="dislike" theme="outlined" onClick />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}> 1 </span>
      </span>
    </div>
  );
}
