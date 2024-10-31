import { Funcionario } from "../model/Funcionario.js";

const exibir = async (req, res) => {
    try {
        const response = await Funcionario.findAll({ attributes: ['nome'] });
        res.status(200).send({ resultado: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro Interno!' });
    }
}

const cadastrar = async (req, res) => {
    try {
        const { nome, funcao, telefone, email, cpf } = req.body
        const response = await Funcionario.create({ nome, funcao, telefone, email, cpf });
        res.status(201).send({ resposta: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro ao cadastrar!' });
    }
}

export { exibir, cadastrar }