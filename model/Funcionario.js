import conexao from '../database.js';
import { DataTypes } from 'sequelize';

const Funcionario = conexao.define('Funcionarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    nome: {
        type: DataTypes.STRING,
    },

    funcao: {
        type: DataTypes.STRING,
    },

    telefone: {
        type: DataTypes.INTEGER,
    },

    email: {
        type: DataTypes.STRING,
    },

    cpf: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'funcionarios'
});

export { Funcionario };
