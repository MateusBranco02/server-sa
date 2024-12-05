import { Funcionario, Epi, Historico, Status } from '../model/relacionamentoTabelas.js';

const historico = async (req, res) => {
    try {
        const response = await Historico.findAll({
            include: [
                {
                    model: Epi,
                    attributes: ['nome', 'quantidade']
                },
                {
                    model: Funcionario,
                    attributes: ['nome']
                },
                {
                    model: Status,
                    attributes: ['status']
                }
            ],
            attributes: ['quantidade', 'createdAt', 'updatedAt']
        });

        if (response.length === 0) {
            return res.status(200).send({ mensagem: 'Nenhum registro encontrado.' });
        }

        res.status(200).send({ resultado: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro Interno!' });
    }
}

export { historico };
