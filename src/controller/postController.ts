// controllers/postsController.ts
import { Response, NextFunction } from 'express';
import { PostSchemaParam } from '../models/postModel';
import { AuthencatedRequest } from '../middlewares/authentication';
import { postService } from '../services/postService';
import { ApiError } from '../middlewares/error';


export class PostsController {
  

    async createNewPost(req: AuthencatedRequest, res: Response, next: NextFunction) {
        try {
            const postData: PostSchemaParam = req.body; // Asumiendo que el cuerpo tiene los datos del post
            const username= req.user?.username;
            
            if(!username){
                 return next(new ApiError("User not found", 404));
            }

            const newPost = await postService.createNewPost(postData, username);
            

            return res.status(201).json({
                ok: true,
                message: "Post created successfully",
                data: newPost,
            });
        } catch (error) {
            return next(error);
        }
    }
}

export const postController = new PostsController();
