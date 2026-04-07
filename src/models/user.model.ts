import { sequelize } from "../config/db.js";
import { DataTypes, Model } from "sequelize";

"use strict";

export class User extends Model {
  public id!: number;
  public name!: string;
  public gmail!: string;
  public password!: string;
  public age!: number;
  public department!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "user", tableName: "users" },
);




// interface CustomRequest extends Request {
//   params: { id:string };
// }