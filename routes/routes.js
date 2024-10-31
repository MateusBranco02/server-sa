import express from 'express';
import { cadastrarFuncionario, mostrarProdutos } from '../controllers/epiController.js';
import { cadastrar, exibir } from '../controllers/funcionarioController.js';
const router = express.Router();

router.get('/epis', mostrarProdutos);
router.get('/funcionarios', exibir);
router.post('/cadastrar', cadastrar);

router.post('/cadastrar-funcionario',cadastrarFuncionario)

export default router;
