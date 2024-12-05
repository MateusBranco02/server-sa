import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';

dotenv.config();

const conexao = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Aceita conexões com certificados SSL não verificados
        },
    },
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
