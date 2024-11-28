import { Funcionario } from '../model/Funcionario.js';

const mostrarFuncionarios = async (req, res) => {
    try {
        const response = await Funcionario.findAll();
        res.status(200).send({ resultado: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro Interno!' });
    }
}

const cadastrarFuncionario = async (req, res) => {
    try {
        const { nome, funcao, telefone, email, cpf } = req.body;
        const response = await Funcionario.create({ nome, funcao, telefone, email, cpf });
        res.status(201).send({ resultado: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro Interno!' });
    }
}

const editarFuncionario = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { nome, funcao, telefone, email, cpf } = req.body;

        const response = await Funcionario.update({ nome, funcao, telefone, email, cpf }, { where: { id } });
        res.status(200).send({ mensagem: 'Dados alterados com sucesso!' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro Interno!' });
    }
}

const removerFuncionario = async (req, res) => {
    try {
        const response = await Funcionario.findByPk(req.params.id);
        await response.destroy();
        res.status(200).send({ mensagem: 'Deletado com sucesso!' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro Interno!' });
    }
}

export { mostrarFuncionarios, cadastrarFuncionario, editarFuncionario, removerFuncionario };
