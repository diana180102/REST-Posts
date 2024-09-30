// db.test.js
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { pool } from '../db/database';
import request from "supertest";
import { app } from '..';
import bcrypt from "bcrypt";

import { truncateTable } from '../db/utils';


interface User {
    username: string;
    password: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: 'user' | 'admin';
}

const testUsers: User[] = [
    {
        username: "testuser1",
        password: "password123",
        email: "testuser1@example.com",
        firstName: "Test",
        lastName: "User",
    },
    {
        username: "adminuser",
        password: "password123",
        email: "adminuser@example.com",
        firstName: "Admin",
        lastName: "User",
        role: "admin",
    },
];


const insertUser = async (user: User) => {
      const query = `
        INSERT INTO users (username, password, email, firstName, lastName, role)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const values = [user.username, hashedPassword, user.email, user.firstName, user.lastName, user.role || 'user'];
    const result = await pool.query(query, values);
    return result.rows[0];


};





describe('User Signup ', () =>{
  
     beforeEach(async () => {
        await truncateTable("users");
        await Promise.all(testUsers.map(user => insertUser(user)));

       
    });

  it("should successfully create a user with role", async () =>{
     
      const userData: User = {
            username: "newuser",
            password: "newpassword123",
            email: "newuser@example.com",
            firstName: "New",
            lastName: "user",
            
        };

     const response = await request(app).post("/signup").send(userData);
     expect(response.statusCode).toBe(200);
     expect(response.body.data).toHaveProperty("id");
     expect(response.body.data.username).toBe(userData.username);
     expect(response.body.data.role).toBe("user"); 
  });
});


describe("Auth Login API", () =>{
     beforeEach(async () => {
        await truncateTable("users");
        await Promise.all(testUsers.map(user => insertUser(user)));
    });

    it("should successfully login with correct credentials", async () => {
        const loginData = {
            username: "testuser1",
            password: "password123"
        }

         const response = await request(app).post("/login").send(loginData);
      
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("data")
        
        expect(response.body.ok).toBeTruthy();
        

    });

     it("should fail to login with incorrect password", async () => {
        const loginData = {
            username: "testuser1",
            password: "wrongpassword"
        };

        const response = await request(app).post("/login").send(loginData);
        expect(response.statusCode).toBe(401); 
        expect(response.body.ok).toBeFalsy();
        expect(response.body.error.message).toBe("Invalid credentials");
    });

    it("should return a 404 error for non-existent user", async () => {
        const loginData = {
            username: "nonexistentuser",
            password: "password123"
        };

        const response = await request(app).post("/login").send(loginData);
        expect(response.statusCode).toBe(404);
        expect(response.body.ok).toBeFalsy();
        expect(response.body.error.message).toBe("User not found");
    });

    
});

describe("Show Profile API", () =>{
     
     let token: string;

     beforeEach(async () =>{
         // Realiza login para obtener el token
        const response = await request(app).post("/login").send({
            username: "testuser1",
            password: "password123"
        });
        token = response.body.data; // Guardar token

       
     });

        
     
     
     it("Should show user profile if authenticated", async () =>{
        
        const response = await request(app).get('/me')
                                    .set("Authorization", `Bearer ${token}`);
     
        expect(response.statusCode).toBe(200);
        expect(response.body.ok).toBeTruthy();
        expect(response.body).toHaveProperty("data");
         
     });

     it("Should return 403 error by Access Denied", async () =>{
        
        const response = await request(app).get('/me')
                                    .set("Authorization", `Bearer invalid_token`);
     
        expect(response.statusCode).toBe(403);
        expect(response.body.ok).toBeFalsy();
        expect(response.body.error.message).toBe("Unauthorized: Invalid token");
         
     });

      it("Should return 401 error if no token is provided", async () => {
        const response = await request(app).get('/me');

        expect(response.statusCode).toBe(401);
        expect(response.body.ok).toBeFalsy();
        expect(response.body.error.message).toBe("Unauthorized: No token provided");
    });

    

    
});

describe("Update Profile API", () => {
    let token: string;

    beforeEach(async () => {
        // Realiza el login para obtener el token
        const response = await request(app).post("/login").send({
            username: "testuser1",
            password: "password123"
        });
        token = response.body.data; // Guardar token
    });

    it("Should update user profile if authenticated and authorized", async () => {
        const response = await request(app)
            .patch('/me')
            .set("Authorization", `Bearer ${token}`)
            .send({
                email: "updatedemail@example.com"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.ok).toBeTruthy();
        expect(response.body.message).toBe("Profile updated successfully");
    });

    
});


