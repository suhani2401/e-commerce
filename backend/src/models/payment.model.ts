import {
    AllowNull,
    BelongsTo,
    Column,
    CreatedAt,
    Default,
    DeletedAt,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import Order from "./order.model";
import { PaymentAttributesType, RequiredPaymentAttributesType } from "./types/payment.types";

@Table({
    tableName: "payments",
    timestamps: true,
    paranoid: true,
})
export default class Payment extends Model<PaymentAttributesType, RequiredPaymentAttributesType> {
    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    id: string;

    @AllowNull(false)
    @Column(DataTypes.STRING)
    transaction_id: string;

    @AllowNull(false)
    @Column(DataTypes.STRING)
    charge_id: string;

    @AllowNull(false)
    @Column(DataTypes.FLOAT)
    amount: number;

    @AllowNull(false)
    @Column(DataTypes.UUID)
    payable_id: string;

    @AllowNull(false)
    @Column(DataTypes.STRING)
    status: "pending" | "completed";

    @BelongsTo(() => Order, { foreignKey: "payable_id", constraints: false })
    order: Order;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
}
