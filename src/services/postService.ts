import { postData } from "../data/postData";
import { usersData } from "../data/usersData";
import { ApiError } from "../middlewares/error";
import { Post, PostSchemaParam } from "../models/postModel";

export class PostService {
  async createNewPost(post: PostSchemaParam, username: string): Promise<Post> {
    const user = await usersData.getUserByUsername(username);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const newPost = await postData.createNewPost(post, user.id);
    const dataPost = await postData.countLikesPost(newPost.id);
  

    return dataPost;
  }
}

export const postService = new PostService();
