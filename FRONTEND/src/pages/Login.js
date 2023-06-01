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
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../service/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, field) => {
    setLogin({
      ...login,
      [field]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(login);
    //validation
    if (login.username === "" || login.password === "") {
      toast.error("Username or Password is required!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return;
    }

    loginUser(login)
      .then((data) => {
        console.log(data);

        //save the data to localstorage
        doLogin(data, () => {
          console.log("Login details is saved to localstorage");
          //redirect to user dashboard
          navigate("/user/dashboard");
        });

        toast.success("Login Successful!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response.statusCode === 400 ||
          error.response.statusCode === 404
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Somthing Wrong", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
    setLogin({
      username: "",
      password: "",
    });
  };

  const resetData = () => {
    setLogin({
      username: "",
      password: "",
    });
    setLogin({
      username: "",
      password: "",
    });

    //submit data to server
  };

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
                <Form onSubmit={handleFormSubmit}>
                  {/* Email field */}
                  <FormGroup>
                    <Label for="text">Username</Label>
                    <Input
                      type="text"
                      placeholder="Enter here"
                      id="email"
                      value={login.username}
                      onChange={(e) => handleChange(e, "username")}
                    />
                  </FormGroup>

                  {/* Password field */}
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter here"
                      id="password"
                      value={login.password}
                      onChange={(e) => handleChange(e, "password")}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button onClick={handleFormSubmit} color="success">
                      Login
                    </Button>
                    <Button
                      onClick={resetData}
                      color="primary"
                      type="reset"
                      className="ms-2"
                    >
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
