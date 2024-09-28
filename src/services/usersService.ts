import { config } from "../config/config";
import { usersData } from "../data/usersData";
import { ApiError } from "../middlewares/error";
import { Users, UsersParams } from "../models/usersModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UpdateUser } from "../models/updateUserModels";

export class UsersService {
  async getUserByUsername(username: string) {
    return await usersData.getUserByUsername(username);
  }

  async getUserByEmail(email: string) {
    return await usersData.getUserByUsername(email);
  }

  async createUser(user: UsersParams): Promise<Omit<Users, "password">> {
    const { username, email } = user;

    const userName = await usersData.getUserByUsername(username);
    const em = await usersData.getUserByEmail(email);
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const userCreate = {
      ...user,
      password: hashedPassword,
    };

    if (userName) {
      new ApiError("username already exists", 400);
    }

    if (em) {
      new ApiError("email already exists", 400);
    }

    const data = await usersData.createUser(userCreate);

    const { password, ...userWithoutPassword } = data;
    return userWithoutPassword;
  }

  async loginUser(username: string, password: string) {
    
    const user = await usersData.getUserByUsername(username);

    if (!user) {
      throw new ApiError("User not found", 404);
    }
    
    const pass = await bcrypt.compare(password, user.password);

    if (pass) {
      const dataToken = jwt.sign(
        {
          username: user.username,
          email: user.email,
          role: user.role,
        },
        config.secret.key,
        { expiresIn: "1h" }
      );

      return dataToken;
    } else {
      throw new ApiError("Invalid credentials", 401);
    }
  }

  async updateUser(dataUpdate:UpdateUser, username:string){
         
    const user = await usersData.getUserByUsername(username);

    

    return await usersData.updateUser(dataUpdate, user.id);
  
  }
}

export const usersService = new UsersService();
