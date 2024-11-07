import conexao from '../database.js';
import { DataTypes } from 'sequelize';
import { Epi } from './Epi.js';
import { Historico } from './Historico.js';

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

Status.hasMany(Epi, {
    foreignKey: 'idStatus'
});

Status.hasMany(Historico, {
    foreignKey: 'idStatus'
});

Historico.belongsTo(Status, {
    foreignKey: 'idStatus'
});

export { Status };
