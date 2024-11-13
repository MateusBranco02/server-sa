import { Funcionario } from './Funcionario.js';
import { Epi } from './Epi.js';
import { Historico } from './Historico.js';
import { Status } from './Status.js';

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

Status.hasMany(Epi, {
    foreignKey: 'idStatus'
});

Status.hasMany(Historico, {
    foreignKey: 'idStatus'
});

Historico.belongsTo(Status, {
    foreignKey: 'idStatus'
});

export { Funcionario, Epi, Historico, Status };
