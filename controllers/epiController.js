import { Epi } from "../model/Epi.js";

const mostrarProdutos = async (req, res) => {
    try {
        const response = await Epi.findAll({ attributes: ['nome'] });
        res.status(200).send({ resultado: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro Interno!' });
    }
}

const cadastrarFuncionario = async (req, res) => {
    try {
        const { nome, quantidade, imagem } = req.body
        const response = await Epi.create({ nome, quantidade, imagem });
        res.status(201).send({ resposta: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro ao cadastrar!' });
    }
}

export { mostrarProdutos, cadastrarFuncionario }
