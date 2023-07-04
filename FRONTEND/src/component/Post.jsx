import React from "react";
import { Button, Card, CardBody, CardText } from "reactstrap";

function Post({
  post = {
    title: "This is a default post title",
    content: "This is a default post content",
  },
}) {
  return (
    <Card className="border-0 shadow-sm mt-4">
      <CardBody>
        <h1>{post.title}</h1>
        <CardText>
          <p>{post.content.substring(0, 50)}...</p>
        </CardText>

        <div>
          <Button>Read More</Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default Post;