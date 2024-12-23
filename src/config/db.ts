import { Sequelize } from "sequelize-typescript";
import dotnet from "dotenv";

dotnet.config();

export const db = new Sequelize( process.env.DATABASE_URL, {
    models: [__dirname + '/../models/**/*'], 
    define: {
        timestamps: true
    },
    logging: false,
    dialectOptions: {
        ssl: {
            require: false
        }
    }
});