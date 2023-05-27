import { signUp } from "../service/user-service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  FormFeedback,
} from "reactstrap";
import Base from "../component/Base";
import { /*useEffect*/ useState } from "react";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  //for to get data on console
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  //handle change function
  const handleChange = (event, property) => {
    // console.log("name changed");
    // console.log(event.target.value);
    setData({ ...data, [property]: event.target.value });
    //asynchronously update
  };

  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (error.isError) {
      toast.error("Form data is invalid", {
        position: toast.POSITION.TOP_CENTER,
      });
      setError({ errors: error, isError: false });
      return;
    }

    console.log(data);
    //data validation

    //call server api for sending the data
    signUp(data)
      .then((resp) => {
        console.log(resp);
        console.log("Success log");
        toast.success("User is registered successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("Error log");
        //handle error

        setError({
          errors: error,
          isError: true,
        });
      });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          {/* {JSON.stringify(data)} */}

          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="secondary" inverse>
              <CardHeader>
                <h3>Register Here</h3>
              </CardHeader>

              <CardBody>
                {/* createing form */}
                <Form>
                  {/* Name field */}
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter here"
                      id="name"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                      invalid={
                        error.errors?.response?.data?.name ? true : false
                      }
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.name}
                    </FormFeedback>
                  </FormGroup>

                  {/* Email field */}
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter here"
                      id="email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      invalid={
                        error.errors?.response?.data?.email ? true : false
                      }
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.email}
                    </FormFeedback>
                  </FormGroup>

                  {/* Password field */}
                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter here"
                      id="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                      invalid={
                        error.errors?.response?.data?.password ? true : false
                      }
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>

                  {/* About field */}
                  <FormGroup>
                    <Label for="about">Enter About</Label>
                    <Input
                      type="textarea"
                      placeholder="Enter here"
                      id="about"
                      style={{ height: "125 px" }}
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                      invalid={
                        error.errors?.response?.data?.about ? true : false
                      }
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.about}
                    </FormFeedback>
                  </FormGroup>

                  <Container className="text-center">
                    <Button onClick={submitForm} color="success">
                      Register
                    </Button>

                    <Button
                      onClick={resetData}
                      color="primary"
                      type="reset"
                      className="ms-2"
                    >
                      Reset
                    </Button>

                    <ToastContainer />
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <br />
    </Base>
  );
};

export default Signup;
