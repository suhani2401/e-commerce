import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  description: Joi.string().allow("").optional(),
  category: Joi.string().required(),
  stock: Joi.number().integer().min(0).required(),
  image: Joi.string().required(),
});

export const updateProductStockSchema = Joi.object({
  id: Joi.string().required(),
  stock: Joi.number().integer().min(0).optional(),
});
