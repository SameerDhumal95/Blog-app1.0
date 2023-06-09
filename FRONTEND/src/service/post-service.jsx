import { myAxios } from "./helper";

//add post
export const createPost = (postData) => {
  console.log(postData);
  return myAxios
    .post(
      `/api/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )
    .then((resp) => resp.data);
};

//upload image
export const uploadPostImage = (image, postId) => {
  let formData = new FormData();
  formData.append("image", image);
  return myAxios
    .post(`/api/posts/image/upload/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

//load all posts
export const loadAllPosts = (pageNumber, pageSize) => {
  return myAxios
    .get(`/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    .then((response) => response.data);
};

//load single post of given id
export const loadPost = (postId) => {
  return myAxios.get("/api/posts/" + postId).then((response) => response.data);
};
