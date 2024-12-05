import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import conexao from './database.js';

const port = 3000;
const app = express();

try {
    await conexao.sync();
} catch (error) {
    console.log(error);
}

app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(port, () => {
    console.log('Servidor rodando!');
});
