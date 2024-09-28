import { Router } from "express";
import { PostsController } from "../controller/postController";
import { validationHandler } from "../middlewares/validations";
import { PostSchema } from "../models/postModel";
import { authentication } from "../middlewares/authentication";

export const postRouter = Router();
const postController = new PostsController();


postRouter.post('/posts', authentication, validationHandler(PostSchema), postController.createNewPost);