import express from 'express';
import { cadastrarEpi, mostrarEpis, editarEpi, removerEpi, retirarEpi } from '../controllers/epiController.js';
import { cadastrarFuncionario, mostrarFuncionarios, editarFuncionario, removerFuncionario } from '../controllers/funcionarioController.js';
import { opcoesDeStatus } from '../controllers/statusController.js';
import { historico } from '../controllers/historicoController.js';

const router = express.Router();

router.get('/epis', mostrarEpis);
router.get('/funcionarios', mostrarFuncionarios);
router.get('/status', opcoesDeStatus);
router.get('/historico', historico);

router.post('/cadastrar-epi', cadastrarEpi);
router.post('/cadastrar-funcionario', cadastrarFuncionario);
router.post('/retirar-epi/:id', retirarEpi);

router.put('/editar-epi/:id', editarEpi);
router.put('/editar-funcionario/:id', editarFuncionario);

router.delete('/deletar-epi/:id', removerEpi);
router.delete('/deletar-funcionario/:id', removerFuncionario);

export default router;
