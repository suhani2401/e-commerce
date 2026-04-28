import Joi from "joi";

export const addToCartSchema = Joi.object({
    product_id: Joi.string().required(),
    quantity: Joi.number().required()
});

export const removeFromCartSchema = Joi.object({
    cart_item_id: Joi.string().required(),
});

export const updateQuantitySchema = Joi.object({
    cart_item_id: Joi.string().required(),
    quantity: Joi.number().required(),
});