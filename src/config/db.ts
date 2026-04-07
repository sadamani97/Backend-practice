import { Sequelize } from "sequelize";
export const sequelize= new Sequelize("testdb", "root","root",{
    host:"localhost",
    dialect:"mysql"

});
