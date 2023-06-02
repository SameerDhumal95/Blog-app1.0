import { myAxios } from "./helper";

export const createPost = (postData) => {
  console.log(postData);
  return myAxios
    .post(
      `/api/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )
    .then((resp) => resp.data);
};
