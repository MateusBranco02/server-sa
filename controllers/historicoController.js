import { Historico } from '../model/Historico.js';

const historico = async (req, res) => {
    try {
        const response = await Historico.findAll();
        res.status(200).send({ resultado: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro Interno!' });
    }
}

export { historico };
