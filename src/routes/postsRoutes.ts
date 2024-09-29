import { Router } from "express";
import { PostsController } from "../controller/postController";
import { validationHandler } from "../middlewares/validations";
import { PostSchema, UpdatePostSchema } from "../models/postModel";
import { authentication } from "../middlewares/authentication";

export const postRouter = Router();
const postController = new PostsController();


postRouter.post('/posts', authentication, validationHandler(PostSchema), postController.createNewPost);
postRouter.patch('/posts/:id', authentication, validationHandler(UpdatePostSchema), postController.updatePost);