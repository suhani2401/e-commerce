import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils";
import { OrderRepository } from "../repositories/order.repository";
import { User } from "../models/users.model";

export class OrderController {
    private orderRepo = new OrderRepository();

    handleCheckout = async (req: Request, res: Response) => {
        try {
            const user = req.user as User;
            const session = await this.orderRepo.handleCheckout(user);
            return successResponse(res, "move to checkout page", session.url, 200);
        } catch (error) {
            return errorResponse(res, `Something went wrong! ${error}`, 500)
        }
    };

    handleWebhook = async (req: Request, res: Response) => {
        try {
            const order = await this.orderRepo.handleWebHook(req.body);
            return successResponse(res, "move to checkout page", order, 200);
        } catch (error) {
            return errorResponse(res, `Something went wrong! ${error}`, 500)
        }
    };

    listOrders = async (req: Request, res: Response) => {
        try {
            const user_id = req.user?.id;
            const orders = await this.orderRepo.listOrders(user_id);
            return successResponse(res, "Orders Listed Successfully", orders, 200);
        } catch (error) {
            return errorResponse(res, `Something went wrong! ${error}`, 500)
        }
    };

    listAllOrders = async (req: Request, res: Response) => {
        try {
            const orders = await this.orderRepo.viewAllOrders();
            return successResponse(res, "Orders Listed Successfully", orders, 200);
        } catch (error) {
            return errorResponse(res, `Something went wrong! ${error}`, 500)
        }
    }
}