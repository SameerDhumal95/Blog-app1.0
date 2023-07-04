import { Container } from "reactstrap";
import Base from "../component/Base";
import NewFeed from "../component/NewFeed";

const Home = () => {
  return (
    <Base>
      <Container>
        <NewFeed />
      </Container>
      {/* <h1>Home page</h1> */}
    </Base>
  );
};

export default Home;
