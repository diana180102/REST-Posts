// controllers/postsController.ts
import { Request, Response, NextFunction } from 'express';
import { PostSchemaParam, UpdatePostSchema } from '../models/postModel';
import { AuthencatedRequest } from '../middlewares/authentication';
import { postService } from '../services/postService';
import { ApiError } from '../middlewares/error';




export class PostsController {
  

    async createNewPost(req: AuthencatedRequest, res: Response, next: NextFunction) {
        try {
            const postData: PostSchemaParam = req.body; 
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


    async updatePost(req: AuthencatedRequest, res: Response, next: NextFunction){
        try {
            
            const {id} = req.params;
            const updateData = req.body;
            

            const postExisting = await postService.getPostById(parseInt(id));

            if(!postExisting){
               return next (new ApiError("Post not found", 404));
            }

            if(Object.keys(updateData).length === 0){
                return  next (new ApiError("At least one field is required for updating", 400));
            }

            const validateData = UpdatePostSchema.parse(updateData);
            const updatePost = await postService.updatePost(validateData, Number(id));
                res.status(200).json({
                    ok: true,
                    message: "Post updated successfully",
                    data: updatePost
                });
            



            

          

        } catch (error) {
            return next(error);
        }
    }

    async insertLikeByPost(req: AuthencatedRequest, res: Response, next: NextFunction){
         try {
            
            const {postId} = req.params;
            const username = req.user?.username;
            
            if(!username){
                 return next(new ApiError("User not found", 404));
            }

            const newLike = await postService.insertLikeByPost(parseInt(postId), username);
            
             return res.status(201).json({
                ok: true,
                message: "Like registered",
                data: newLike,
            });


         } catch (error) {
            return next(error);
         }
    }

    async deleteLikeByPost(req: AuthencatedRequest, res: Response, next: NextFunction){
         try {
            
            const {postId} = req.params;
            const username = req.user?.username;
            
            if(!username){
                 return next(new ApiError("User not found", 404));
            }

            const newLike = await postService.deleteLikeByPost(parseInt(postId), username);
            
             return res.status(201).json({
                ok: true,
                message: "Like deleted",
                data: newLike,
            });


         } catch (error) {
            return next(error);
         }
    }


    async getPostByUsername(req: Request, res: Response, next: NextFunction){
        try {
            
            const {username} = req.params;

            
            
            const { page = 1, limit = 10, orderBy = `posts.createdAt`,  order = "asc" } = req.query;

            const numPage = Number(page);
            const numLimit = Number(limit)
            

            const postData = await postService.getPostByUsername(
                username, numPage, numLimit, `${orderBy}_${order}` );

                console.log(postData);
            
            const pagination = {
                page : numPage,
                pageSize : numLimit,
                totalItem: postData.totalPost,
                totalPages: Math.ceil(postData.totalPost / numLimit),
                nextPages: numPage < Math.ceil(postData.totalPost /  numLimit ) ? numPage :null,
                previousPage: numPage > 1 ? numPage - 1 : null,
            }

            return res.status(200).json({
                ok:true,
                data:postData.posts,
                pagination
                
            });


        } catch (error) {
           return next(error);
        }
    }


    async getPostAll(req: Request, res: Response, next: NextFunction){
        try {
            
           

            
            
            const { page = 1, limit = 10, username, orderBy = `posts.createdAt`,  order = "asc" } = req.query;

            const numPage = Number(page);
            const numLimit = Number(limit)
            const user = username  as string;
            

            const postData = await postService.getPostByUsername( user, numPage, numLimit, `${orderBy}_${order}` );

                console.log(postData);
            
            const pagination = {
                page : numPage,
                pageSize : numLimit,
                totalItem: postData.totalPost,
                totalPages: Math.ceil(postData.totalPost / numLimit),
                nextPages: numPage < Math.ceil(postData.totalPost /  numLimit ) ? numPage :null,
                previousPage: numPage > 1 ? numPage - 1 : null,
            }

            return res.status(200).json({
                ok:true,
                data:postData.posts,
                pagination
                
            });


        } catch (error) {
           return next(error);
        }
    }
}

export const postController = new PostsController();
