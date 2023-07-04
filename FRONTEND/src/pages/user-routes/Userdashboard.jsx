import React from "react";
import Base from "../../component/Base";
import AddPost from "../../component/AddPost";
import { Container } from "reactstrap";
import NewFeed from "../../component/NewFeed";

function Userdashboard() {
  return (
    <Base>
      <Container>
        <AddPost />
        <NewFeed />
      </Container>
    </Base>
  );
}

export default Userdashboard;
