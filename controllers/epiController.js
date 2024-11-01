import { Epi } from "../model/Epi.js";

const mostrarEpis = async (req, res) => {
    try {
        const response = await Epi.findAll({ attributes: ['nome'] });
        res.status(200).send({ resultado: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro Interno!' });
    }
}

const cadastrarEpi = async (req, res) => {
    try {
        const { nome, quantidade, imagem } = req.body
        const response = await Epi.create({ nome, quantidade, imagem });
        res.status(201).send({ resposta: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro ao cadastrar!' });
    }
}

const editarEpi = async (req, res) => {
    try {
        const id = req.params.id
        const { nome, quantidade, imagem } = req.body
        const response = await Epi.update({ nome, quantidade, imagem }, { where: { id } });
        res.status(200).send({ mensagem: 'Dados alterados com sucesso!' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro ao editar!' });
    }
}

const removerEpi = async (req, res) => {
    try {
        const response = await Epi.findByPk(req.params.id);
        await response.destroy();
        res.status(200).send({ mensagem: 'Deletado com sucesso!' });
    } catch (error) {
        console.log(error)
        res.status(500).send({ mensagem: 'Erro ao remover!' });
    }
}

export { mostrarEpis, cadastrarEpi, editarEpi, removerEpi };
