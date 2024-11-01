import express from 'express';
import { cadastrarEpi, mostrarEpis, editarEpi, removerEpi } from '../controllers/epiController.js';
import { cadastrarFuncionario, mostrarFuncionarios, editarFuncionario, removerFuncionario } from '../controllers/funcionarioController.js';

const router = express.Router();

router.get('/epis', mostrarEpis);
router.get('/funcionarios', mostrarFuncionarios);
router.put('/editar-epi/:id', editarEpi)
router.delete('/deletar-epi/:id', removerEpi)
router.post('/cadastrar-epi', cadastrarEpi);
router.post('/cadastrar-funcionario', cadastrarFuncionario);
router.put('/editar-funcionario/:id', editarFuncionario)
router.delete('/deletar-funcionario/:id', removerFuncionario)

export default router;
