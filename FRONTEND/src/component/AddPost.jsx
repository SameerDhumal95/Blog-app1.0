import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import { loadAllCategories } from "../service/category-service";
import JoditEditor from "jodit-react";

const AddPost = () => {
  const editor = useRef(null);

  const [content, setContent] = useState("");

  const [categories, setCategories] = useState([]);
  const config = {
    placeholder: " Start typing...",
  };

  useEffect(() => {
    //setUser(getCurrentUserDetail());
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="wrapper">
      <Card className="shadow-0 mt-4">
        <CardBody>
          <h3>Whats going in your mind?</h3>
          <Form>
            <div className="my-3">
              <Label for="title">Post Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here"
                className="rounded"
              />
            </div>

            <div className="my-3">
              <Label for="title">Post Content</Label>
              {/* <Input
                type="textarea"
                id="content"
                placeholder="Enter here"
                className="rounded-0"
 
              /> */}
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                onChange={(newContent) => setContent(newContent)}
              />

              <Label for="category">Post Category</Label>
              <Input id="category" name="select" type="select">
                {/* <option disabled value={0}>
                  --Select category--
                </option> */}

                {categories.map((category) => (
                  <option value={category.categoryId} key={category.categoryId}>
                    {category.categoryTitle}
                  </option>
                ))}
              </Input>
            </div>
            <Container className="text-center">
              <Button color="warning">Create Post</Button>
              <Button color="primary" className="ms-2">
                Reset
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
      {/* {content} */}
    </div>
  );
};

export default AddPost;
