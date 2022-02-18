import React, { useEffect } from "react";
import axios from "axios";
import { FaCode } from "react-icons/fa";
import { Card, Icon, Avatar, Col, Typography, Row } from "antd";
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  //const renderCards =
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}> Recommended </Title>
      <hr />
      <Row gutter={[32, 16]}>
        {/* {renderCards}
        <Col key={index} lg={6} md={8} xs={2}>
          <a href={`/video/post/${video._id}`}>
          <div style={{ position: "relative" }}>
            {<img
                 style={{ width: "100%" }}
                src={`http://localhist:5000/${video.thumbnail}`}
                alt="thumbnail"
              />}
            <div className="duration">
              <span>
                  {minutes} : {seconds}
                </span>
            </div>
          </div>
          </a>
          <br />
          <Meta
            avartar={<Avartar src={video.writer.image} />}
            title={video.title}
            description=""
          />
          <span>{video.writer.name}</span>
          <br />
          <span style={{ marginLeft: "3rem" }}>{video.views} views</span> -
          <sapn>{moment(video.createdAt).format("MMM do YY")}</sapn>
        </Col> */}
      </Row>
    </div>
  );
}

export default LandingPage;
