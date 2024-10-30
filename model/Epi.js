import conexao from "../database.js";
import { DataTypes } from "sequelize";

const Epi = conexao.define('Epis', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING
    }
}, {
    createdAt: false, updatedAt: false, tableName: 'epis'
});

export { Epi }
