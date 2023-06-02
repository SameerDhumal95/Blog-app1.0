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
import {
  createPost as doCreatePost,
  uploadPostImage,
} from "../service/post-service";
import { getCurrentUserDetail } from "../auth";
import { toast } from "react-toastify";

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
  const [image, setImage] = useState(null);
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
    // console.log(post);

    if (post.title.trim() === "") {
      toast.error("post title is required !!");
      return;
    }

    if (post.content.trim() === "") {
      toast.error("post content is required !!");
      return;
    }

    if (post.categoryId === "") {
      toast.error("select category!!");
      return;
    }

    //submit the form on server
    post["userId"] = user.id;
    doCreatePost(post)
      .then((data) => {
        uploadPostImage(image, data.postId)
          .then((data) => {
            toast.success("Image Uploaded !!");
          })
          .catch((error) => {
            toast.error("Error in uploading image");
            console.log(error);
          });
        setPost({
          title: "",
          content: "",
          categoryId: "",
        });
        toast.success("Post Created !!");
        // console.log(post);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Post not created due to some error !!");
      });
  };

  //handling file chagne event
  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
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
              <Label for="content">Post Content</Label>
              {/* <Input
                type="textarea"
                id="content"
                placeholder="Enter here"
                className="rounded-0"
              /> */}

              <JoditEditor
                ref={editor}
                value={post.content}
                onChange={(newContent) => contentFieldChanged(newContent)}
              />
            </div>
            {/* file field  */}

            <div className="mt-3">
              <Label for="image">Select Post Image</Label>
              <Input id="image" type="file" onChange={handleFileChange} />
            </div>

            <div className="mt-3">
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
