import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils";
import { UserRepository } from "../repositories/users.repository";

export class UsersController {
    private userRepo = new UserRepository();

    login = async (req: Request, res: Response) => {
        try {
            const data = await this.userRepo.loginUser(req.body);
            res.cookie("token", data.token, {
                httpOnly: true,
                secure: false,       // false for localhost
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });
            return successResponse(res, "User loggedin Sucessfully", data, 200);
        } catch (error) {
            return errorResponse(res, `Something went wrong! ${error}`, 500)
        }
    };

    register = async (req: Request, res: Response) => {
        try {
            const isUserExist = await this.userRepo.findUserByEmail(req.body.email);
            if (isUserExist) throw new Error('User Already Exist');

            const { confirmPassword, ...user } = req.body;

            const data = await this.userRepo.registerUser(user);
            return successResponse(res, "User registered successfully", data, 200);
        } catch (error) {
            return errorResponse(res, `Something went wrong! ${error}`, 500)
        }

    };
}