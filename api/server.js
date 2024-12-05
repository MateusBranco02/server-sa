import express from 'express';
import conexao from '../database.js';
import cors from 'cors';
import router from '../routes/routes.js';

const port = process.env.PORT || 3000;
const app = express();

try {
    await conexao.sync();
    console.log('Banco de Dados sincronizado!');
} catch (error) {
    console.error('Erro ao sincronizar banco de dados:', error);
}

app.use(cors());
app.use(express.json());
app.use('/', router);

export default app;
