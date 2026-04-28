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
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import { User } from "./users.model";
import CartItem from "./cart_items.model";
import { CartAttributesType, RequiredCartAttributesType } from "./types/cart.types";

@Table({
    tableName: "cart",
    timestamps: true,
    paranoid: true,
})
export default class Cart extends Model<CartAttributesType, RequiredCartAttributesType> {
    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    id: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataTypes.UUID)
    user_id: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => CartItem)
    cart_items: CartItem[];
}
