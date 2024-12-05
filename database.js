import { Sequelize } from 'sequelize';

const conexao = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

try {
    await conexao.authenticate();
    console.log('Banco de Dados Conectado!');
} catch (error) {
    console.log('Erro ao conectar no banco de dados!');
    console.log(error);
}

export default conexao;
