import {
  Card,
  CardBody,
  CardHeader,
  Container,
  FormGroup,
  Input,
  Label,
  Form,
  Button,
  Col,
  Row,
} from "reactstrap";
import Base from "../component/Base";

const Login = () => {
  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="secondary" inverse>
              <CardHeader>
                <h3>Login Here</h3>
              </CardHeader>

              <CardBody>
                {/* createing form */}
                <Form>
                  {/* Email field */}
                  <FormGroup>
                    <Label for="email">Username</Label>
                    <Input type="email" placeholder="Enter here" id="email" />
                  </FormGroup>

                  {/* Password field */}
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter here"
                      id="password"
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button color="success">Login</Button>
                    <Button color="primary" type="reset" className="ms-2">
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Login;
