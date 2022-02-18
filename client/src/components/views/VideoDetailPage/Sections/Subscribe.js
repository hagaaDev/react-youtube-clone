import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function Subscribe(props) {
  const [SubscriberNumber, setSubscriberNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let variable = { userTo: props.userTo };

    /* 몇 명의 유저가 구독을 하고 있는지 조회 */
    Axios.post("/api/subscribe/subscribeNumber", variable).then((response) => {
      if (response.data.success) {
        setSubscriberNumber(response.data.subscribeNumber);
      } else {
        alert("구독자 수 정보를 받아오지 못했습니다.");
      }
    });

    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: localStorage.getItem("userId"),
    };

    /* 업로드한 유저를 구독 하고 있는지 조회 */
    Axios.post("/api/subscribe/subscribed", subscribedVariable).then(
      (response) => {
        if (response.data.success) {
          setSubscribed(response.data.subscribed);
        } else {
          alert("정보를 받아오지 못했습니다.");
        }
      }
    );
  }, []);

  return (
    <div>
      <button
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#cc0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
          border: "none",
          cursor: "pointer",
        }}
        onClick
      >
        {SubscriberNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}
