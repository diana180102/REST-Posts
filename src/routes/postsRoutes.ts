import { Router } from "express";
import { PostsController } from "../controller/postController";
import { validationHandler } from "../middlewares/validations";
import { PostSchema, UpdatePostSchema } from "../models/postModel";
import { authentication } from "../middlewares/authentication";
import { authorize } from "../middlewares/authorization";

export const postRouter = Router();
const postController = new PostsController();


postRouter.post('/posts', authentication, authorize('admin','user'), validationHandler(PostSchema), postController.createNewPost);
postRouter.patch('/posts/:id', authentication, authorize('admin','user'), validationHandler(UpdatePostSchema), postController.updatePost);

postRouter.post('/posts/:postId/likes', authorize('admin','user'), authentication, postController.insertLikeByPost );
postRouter.delete('/posts/:postId/likes', authorize('admin','user'), authentication, postController.deleteLikeByPost );

postRouter.get('/:username', postController.getPostByUsername);
postRouter.get('/', postController.getPostAll);

