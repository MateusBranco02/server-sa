import conexao from '../database.js';
import { DataTypes } from 'sequelize';

const Status = conexao.define('Status', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.STRING
    }
}, {
    createdAt: false, updatedAt: false, tableName: 'status'
});

export { Status };
