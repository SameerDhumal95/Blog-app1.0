import React from "react";
import Base from "../../component/Base";
import AddPost from "../../component/AddPost";
import { Container } from "reactstrap";

function Userdashboard() {
  return (
    <Base>
      <Container>
        <AddPost />
      </Container>
    </Base>
  );
}

export default Userdashboard;
