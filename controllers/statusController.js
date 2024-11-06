import { Status } from '../model/Status.js';

const opcoesDeStatus = async (req, res) => {
    try {
        const response = await Status.findAll();
        res.status(200).send({ resultado: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro interno!' });
    }
}

export { opcoesDeStatus };
