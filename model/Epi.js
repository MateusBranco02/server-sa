import conexao from '../database.js';
import { DataTypes } from 'sequelize';

const Epi = conexao.define('Epi', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

    imagem: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'epis'
});

export { Epi };
