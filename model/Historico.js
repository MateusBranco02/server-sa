import conexao from '../database.js';
import { DataTypes } from 'sequelize';

const Historico = conexao.define('Historico', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    tableName: 'historico'
});

export { Historico };
