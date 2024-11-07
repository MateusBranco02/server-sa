import conexao from '../database.js';
import { DataTypes } from 'sequelize';
import { Epi } from './Epi.js';
import { Historico } from './Historico.js';

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

Funcionario.hasMany(Epi, {
    foreignKey: 'idFuncionario'
});

Funcionario.belongsToMany(Epi, {
    through: {
        model: Historico
    },
    foreignKey: 'idFuncionario'
});

Epi.belongsToMany(Funcionario, {
    through: {
        model: Historico
    },
    foreignKey: 'idEpi'
});

Funcionario.hasMany(Historico, { foreignKey: 'idFuncionario' });
Historico.belongsTo(Funcionario, { foreignKey: 'idFuncionario' });
Epi.hasMany(Historico, { foreignKey: 'idEpi' });
Historico.belongsTo(Epi, { foreignKey: 'idEpi' });

export { Funcionario };
