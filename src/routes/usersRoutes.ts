import {Router} from 'express';
import { UsersController } from '../controller/usersController';
import { authentication } from '../middlewares/authentication';
import { validationHandler } from '../middlewares/validations';
import { UserUpdateSchema } from '../models/updateUserModels';
import { UsersSchema } from '../models/usersModel';
import { loginSchema } from '../models/loginModel';

export const userRouter = Router();
const usersController = new UsersController();


userRouter.post('/signup', validationHandler(UsersSchema), usersController.createUser);
userRouter.post('/login', validationHandler(loginSchema), usersController.loginUser);

userRouter.get('/me', authentication, usersController.getUserByUsername);
userRouter.patch('/me', authentication, validationHandler(UserUpdateSchema), usersController.updateUser);