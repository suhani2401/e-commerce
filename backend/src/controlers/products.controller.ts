import { Request, Response } from "express";
import { ProductRepository } from "../repositories/products.repository";
import { errorResponse, successResponse } from "../utils";

export class ProductController {
    private productRepo = new ProductRepository();

    getProducts = async (req: Request, res: Response) => {
        try {
            const data = req.params
                const products = await this.productRepo.getListOfProducts(data);
            return successResponse(res, "Products fetched", products, 200);
        } catch (error) {
            return errorResponse(res, `Something went wrong! ${error}`, 500)
        }
    };

    createProduct = async (req: Request, res: Response) => {
        try {
            const data = await this.productRepo.craeteNewProducts(req.body);
            return successResponse(res, "Products created", data, 200);
        } catch (error) {
            return errorResponse(res, `Something went wrong! ${error}`, 500)
        }
    };

    updateStock = async (req: Request, res: Response) => {
        try {
            const response = await this.productRepo.updateProductStock(req.body);
            return successResponse(res, "Stock updated", response, 200);
        } catch (error) {
            return errorResponse(res, `Something went wrong! ${error}`, 500)
        }
    }
}