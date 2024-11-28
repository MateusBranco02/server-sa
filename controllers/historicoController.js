import { Epi } from '../model/Epi.js';
import { Funcionario } from '../model/Funcionario.js';
import { Historico } from '../model/Historico.js';
import { Status } from '../model/Status.js';

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
        res.status(200).send({ resultado: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro Interno!' });
    }
}

export { historico };
