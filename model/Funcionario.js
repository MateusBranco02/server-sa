import conexao from '../database.js';
import { DataTypes } from 'sequelize';

const Funcionario = conexao.define('Funcionario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    funcao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(14),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    cpf: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'funcionarios'
});

export { Funcionario };
