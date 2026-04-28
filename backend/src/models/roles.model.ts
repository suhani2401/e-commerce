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
} from "sequelize-typescript";
import { RequiredRolesAttributesType, RolesAttributesType } from "./types/roles.type";

@Table({ tableName: "roles", paranoid: true, timestamps: true })
export class Roles extends Model<RolesAttributesType, RequiredRolesAttributesType> {
    @PrimaryKey
    @AllowNull(false)
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    id: string;

    @AllowNull(false)
    @Column(DataTypes.STRING)
    role: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
}