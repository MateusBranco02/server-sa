import { Sequelize } from 'sequelize';

const conexao = new Sequelize('postgresql://mateus:ZCQweZsNHvSqn8kbhOTYaQ@brainy-boar-3152.j77.aws-us-east-1.cockroachlabs.cloud:26257/db_sa?sslmode=verify-full');

try {
    await conexao.authenticate();
    console.log('Banco de Dados Conectado!');
} catch (error) {
    console.log('Erro ao conectar no banco de dados!');
    console.log(error);
}

export default conexao;
