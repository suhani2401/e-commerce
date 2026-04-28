import { DataTypes } from "sequelize";
import {
    AllowNull,
    BelongsTo,
    Column,
    CreatedAt,
    Default,
    DeletedAt,
    ForeignKey,
    HasMany,
    HasOne,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import { User } from "./users.model";
import OrderedItems from "./order_items.model";
import { OrderAttributesType, RequiredOrderAttributesType } from "./types/order.types";
import Payment from "./payment.model";

@Table({
    tableName: "orders",
    timestamps: true,
    paranoid: true,
})
export default class Order extends Model<OrderAttributesType, RequiredOrderAttributesType> {
    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    id: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataTypes.UUID)
    user_id: string;

    @AllowNull(false)
    @Column(DataTypes.FLOAT)
    final_price: number;

    @AllowNull(false)
    @Column(DataTypes.FLOAT)
    shipping_cost: number;

    @HasMany(() => OrderedItems)
    ordered_items: OrderedItems[];

    @BelongsTo(() => User)
    user: User;

    @HasOne(() => Payment, {
        foreignKey: "payable_id",
        scope: { payable_type: "order" },
        constraints: false,
    })
    payment: Payment;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
}
