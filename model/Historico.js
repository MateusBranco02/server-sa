import conexao from '../database.js';
import { DataTypes } from 'sequelize';
import { Funcionario } from '../model/relacionamentoTabelas.js';

const Historico = conexao.define('Historico', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idFuncionario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Funcionario,
            key: 'id'
        }
    },
    idStatus: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'historico'
});

export { Historico };
