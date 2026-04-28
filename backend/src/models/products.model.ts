import {
  AllowNull,
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
import { ProductsAttributesType, RequiredProductsAttributesType } from "./types/products.types";

@Table({
  tableName: "products",
  paranoid: true,
  timestamps: true,
})
export default class Products extends Model<ProductsAttributesType, RequiredProductsAttributesType> {

  @PrimaryKey
  @AllowNull(false)
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  description: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  category: string;

  @AllowNull(false)
  @Column(DataTypes.FLOAT)
  price: number;

  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  stock: number;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  image: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}