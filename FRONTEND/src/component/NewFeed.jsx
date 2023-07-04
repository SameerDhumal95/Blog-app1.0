import React, { useEffect, useState } from "react";
import { loadAllPosts } from "../service/post-service";
import {
  Col,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";

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
    changePage(0);
  }, []);

  const changePage = (pageNumber = 0, pageSize = 5) => {
    console.log(pageNumber);
    console.log(postContent.pageNumber);
    if (pageNumber > postContent.pageNumber && postContent.lastPage) {
      return;
    }

    if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
      return;
    }

    loadAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPostContent(data);
        console.log(data);
        window.scroll(0, 0);
      })
      .catch((error) => {
        toast.error("Error in loading posts");
      });
  };

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
          <h2>Total Blogs {postContent?.totalElements}</h2>

          {postContent.content.map((post) => (
            <Post post={post} key={post.id} />
          ))}

          <Container className="mt-3">
            <Pagination size="lg">
              <PaginationItem
                onClick={() => changePage(postContent.pageNumber - 1)}
                disabled={postContent.pageNumber === 0}
              >
                <PaginationLink previous>Previous</PaginationLink>
              </PaginationItem>
              {[...Array(postContent.totalPages)].map((item, index) => (
                <PaginationItem
                  onClick={() => changePage(index)}
                  active={index === postContent.pageNumber}
                >
                  <PaginationLink>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem
                onClick={() => changePage(postContent.pageNumber + 1)}
                disabled={postContent.lastPage}
              >
                <PaginationLink next>Next</PaginationLink>
              </PaginationItem>
            </Pagination>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default NewFeed;
