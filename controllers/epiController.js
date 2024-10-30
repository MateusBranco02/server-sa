import { Epi } from "../model/Epi.js";

const mostrarProdutos = async (req, res) => {
    try {
        const response = await Epi.finAll({ attributes: ['nome'] });
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro Interno!' });
    }
}

export { mostrarProdutos }
