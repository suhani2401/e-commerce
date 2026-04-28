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
import { OrderItemsAttributesType, RequiredOrderItemsAttributesType } from "./types/order_items.types";
import Order from "./order.model";

@Table({
    tableName: "ordered_items",
    timestamps: true,
    paranoid: true,
})
export default class OrderedItems extends Model<OrderItemsAttributesType, RequiredOrderItemsAttributesType> {
    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    id: string;

    @ForeignKey(() => Order)
    @AllowNull(false)
    @Column(DataTypes.UUID)
    order_id: string;

    @ForeignKey(() => Products)
    @AllowNull(false)
    @Column(DataTypes.UUID)
    product_id: string;

    @AllowNull(false)
    @Default(1)
    @Column(DataTypes.INTEGER)
    quantity: number;

    @BelongsTo(() => Order)
    order: Order;

    @BelongsTo(() => Products)
    product: Products;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
}
