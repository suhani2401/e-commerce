import { DataTypes } from "sequelize";
import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AllowNull,
    Default,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    ForeignKey,
    BelongsTo,
    BeforeCreate,
    Unique,
} from "sequelize-typescript";
import { Roles } from "./roles.model";
import bcrypt from "bcrypt";
import { RequiredUserAttributesType, UserAttributesType } from "./types/users.types";

@Table({ tableName: "users", paranoid: true, timestamps: true })
export class User extends Model<UserAttributesType, RequiredUserAttributesType> {
    @PrimaryKey
    @AllowNull(false)
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    id: string;

    @AllowNull(false)
    @Column(DataTypes.STRING)
    name: string;

    @AllowNull(false)
    @Unique(true)
    @Column(DataTypes.STRING)
    email: string;

    @AllowNull(false)
    @Column(DataTypes.STRING)
    password: string;

    @ForeignKey(() => Roles)
    @AllowNull(false)
    @Column(DataTypes.UUID)
    role: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

    @BelongsTo(() => Roles)
    roleDetails!: Roles;

    @BeforeCreate
    static async hashPassword(instance: User) {
        instance.password = await bcrypt.hash(instance.password, 10);
    }
}