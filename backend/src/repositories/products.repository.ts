import { Op } from "sequelize";
import Products from "../models/products.model";
import { ProductsAttributesType, RequiredProductsAttributesType } from "../models/types/products.types";
import { BaseRepository } from "./base.repository";
import { WhenOptions } from "joi";
import { ParamsDictionary } from "express-serve-static-core";

export class ProductRepository extends BaseRepository<Products, ProductsAttributesType, RequiredProductsAttributesType> {
    constructor() {
        super(Products);
    }

    async getListOfProducts(data: ParamsDictionary): Promise<Products[]> {
        try {
            const { search, category, limit, offset } = data;
            const where: any = {};
            where['name'] = { [Op.like]: `%${search}%` }
            where['category'] = category

            return await this.findAll({ where, limit: Number(limit), offset: Number(offset) });
        } catch (error) {
            throw new Error(`Failed to fetch list of products: ${error}`);
        }
    }

    async craeteNewProducts(data: Products): Promise<Products> {
        try {
            return await this.create(data);
        } catch (error) {
            throw new Error(`Failed to create new products: ${error}`);
        }
    }

    async updateProductStock(data: Products) {
        try {
            return await this.update({ stock: data.stock }, { where: { id: data.id } })
        } catch (error) {
            throw new Error(`Failed to update stock of products: ${error}`);
        }
    }
}