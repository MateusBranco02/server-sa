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
    },

    quantidade: {
        type: DataTypes.INTEGER,
    },

    imagem: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'epis'
});

export { Epi };
