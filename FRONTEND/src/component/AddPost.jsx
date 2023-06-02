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
import { createPost as doCreatePost } from "../service/post-service";
import { getCurrentUserDetail } from "../auth";

const AddPost = () => {
  const editor = useRef(null);

  //for content
  //   const [content, setContent] = useState("");

  //for category
  const [categories, setCategories] = useState([]);
  //for user id
  const [user, setUser] = useState(undefined);
  //for post
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  //   const config = {
  //     placeholder: " Start typing...",
  //   };

  //for image
  //   const [image, setImage] = useState(null);

  useEffect(() => {
    setUser(getCurrentUserDetail());
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //field changes function
  const fieldChanged = (event) => {
    // console.log(event.target.value);
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  //jsx feature to chane fields
  const contentFieldChanged = (data) => {
    // console.log(event.target.value);
    setPost({ ...post, content: data });
  };

  const createPost = (event) => {
    event.preventDefault();
    console.log(post);

    if (post.title.trim() === "") {
      alert("post title is required !!");
      return;
    }

    if (post.content.trim() === "") {
      alert("post content is required !!");
      return;
    }

    if (post.categoryId === "") {
      alert("select category!!");
      return;
    }

    //submit the form on server
    post["userId"] = user.id; //Not getting
    doCreatePost(post)
      .then((data) => {
        alert("post created");
        console.log(post);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="wrapper">
      <Card className="shadow-0 mt-4">
        <CardBody>
          {/* {JSON.stringify(post)} */}
          <h3>Whats going in your mind?</h3>
          <Form onSubmit={createPost}>
            <div className="my-3">
              <Label for="title">Post Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here"
                className="rounded"
                name="title"
                onChange={fieldChanged}
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
                value={post.content}
                onChange={contentFieldChanged}
              />

              <Label for="category">Post Category</Label>
              <Input
                id="category"
                type="select"
                placeholder="Enter here"
                name="categoryId"
                onChange={fieldChanged}
              >
                <option disabledValue={0}>--Select category--</option>

                {categories.map((category) => (
                  <option value={category.categoryId} key={category.categoryId}>
                    {category.categoryTitle}
                  </option>
                ))}
              </Input>
            </div>
            <Container className="text-center">
              <Button color="warning" type="submit">
                Create Post
              </Button>
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
