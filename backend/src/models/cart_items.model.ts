import { DataTypes } from "sequelize";
import {
    AllowNull,
    BelongsTo,
    Column,
    CreatedAt,
    Default,
    DeletedAt,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import Products from "./products.model";
import Cart from "./cart.model";
import { CartItemsAttributesType, RequiredCartItemsAttributesType } from "./types/cart_items.types";

@Table({
    tableName: "cart_items",
    timestamps: true,
    paranoid: true,
})
export default class CartItem extends Model<CartItemsAttributesType, RequiredCartItemsAttributesType> {
    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    id: string;

    @ForeignKey(() => Cart)
    @AllowNull(false)
    @Column(DataTypes.UUID)
    cart_id: string;

    @ForeignKey(() => Products)
    @AllowNull(false)
    @Column(DataTypes.UUID)
    product_id: string;

    @AllowNull(false)
    @Default(1)
    @Column(DataTypes.INTEGER)
    quantity: number;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

    @BelongsTo(() => Cart)
    cart: Cart;

    @BelongsTo(() => Products)
    product!: Products;
}
