import React, { useEffect, useState } from "react";
import { loadAllPosts } from "../service/post-service";
import { Col, Row } from "reactstrap";
import Post from "./Post";

function NewFeed() {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });

  useEffect(() => {
    //load all the posts from server
    loadAllPosts()
      .then((data) => {
        console.log(data);
        setPostContent(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    // <div>This is new Feed</div>
    <div className="container-fluid">
      <Row>
        <Col
          md={{
            size: 10,
            offset: 1,
          }}
        >
          <h1>Blogs Count ({postContent?.totalElements})</h1>

          {postContent.content.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </Col>
      </Row>
    </div>
  );
}

export default NewFeed;
