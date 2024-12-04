import { Funcionario, Epi, Historico, Status } from '../model/relacionamentoTabelas.js';

const mostrarEpis = async (req, res) => {
    try {
        const response = await Epi.findAll({ attributes: ['id', 'nome', 'quantidade', 'imagem'] });
        res.status(200).send({ resultado: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro interno!' });
    }
}

const mostrarEpiPeloId = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await Epi.findByPk(id);
        res.status(200).send({ resultado: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro interno!' });
    }
}

const cadastrarEpi = async (req, res) => {
    try {
        const { nome, quantidade, imagem } = req.body
        const response = await Epi.create({ nome, quantidade, imagem });
        res.status(201).send({ resultado: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro ao cadastrar!' });
    }
}

const editarEpi = async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, quantidade, imagem } = req.body;

        const response = await Epi.update({ nome, quantidade, imagem }, { where: { id } });
        res.status(200).send({ mensagem: 'Informações alteradas com sucesso!' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro interno!' });
    }
}

const removerEpi = async (req, res) => {
    try {
        const response = await Epi.findByPk(req.params.id);
        await response.destroy();
        res.status(200).send({ mensagem: 'Epi deletado com sucesso!' });
    } catch (error) {
        console.log(error)
        res.status(500).send({ mensagem: 'Erro Interno!' });
    }
}

const retirarEpi = async (req, res) => {
    try {
        const id = req.params.id;
        const { cpf, quantidade } = req.body;

        if (!cpf || !quantidade) {
            return res.status(400).send({ mensagem: 'Todos os campos são obrigatórios!' });
        }

        const verificarCpfFuncionario = await Funcionario.findOne({ where: { cpf: cpf } });
        if (!verificarCpfFuncionario) {
            return res.status(404).send({ mensagem: 'Funcionário não encontrado!' });
        }

        const pegarIdEpi = await Epi.findByPk(id);
        if (!pegarIdEpi) {
            return res.status(404).send({ mensagem: 'EPI não encontrado!' });
        }

        if (Number(quantidade) <= 0) {
            return res.status(400).send({ mensagem: 'A quantidade deve ser maior que zero!' });
        }

        if (Number(quantidade) > pegarIdEpi.quantidade) {
            return res.status(400).send({ mensagem: `Estoque insuficiente! Disponível: ${pegarIdEpi.quantidade}` });
        }

        await pegarIdEpi.update({ quantidade: Number(pegarIdEpi.quantidade) - Number(quantidade) });

        const response = await Historico.create({
            idFuncionario: verificarCpfFuncionario.id,
            idEpi: pegarIdEpi.id,
            idStatus: 1,
            quantidade
        });

        res.status(201).send({ resultado: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro interno!' });
    }
}

const devolverEpi = async (req, res) => {
    try {
        const id = req.params.id;
        const { cpf, quantidade } = req.body;

        if (!cpf || !quantidade) {
            return res.status(400).send({ mensagem: 'Todos os campos são obrigatórios!' });
        }

        const verificarCpfFuncionario = await Funcionario.findOne({ where: { cpf: cpf } });
        if (!verificarCpfFuncionario) {
            return res.status(404).send({ mensagem: 'Funcionário não encontrado!' });
        }

        const pegarIdEpi = await Epi.findByPk(id);
        if (!pegarIdEpi) {
            return res.status(404).send({ mensagem: 'EPI não encontrado!' });
        }

        const totalRetirado = await Historico.sum('quantidade', { where: { idFuncionario: verificarCpfFuncionario.id, idEpi: pegarIdEpi.id, idStatus: 1 } });

        const totalDevolvido = await Historico.sum('quantidade', { where: { idFuncionario: verificarCpfFuncionario.id, idEpi: pegarIdEpi.id, idStatus: 2 } });

        const disponivelParaDevolucao = totalRetirado - totalDevolvido;

        if (disponivelParaDevolucao <= 0) {
            return res.status(400).send({ mensagem: 'Não há EPI(s) pendentes de devolução!' });
        }

        if (quantidade > disponivelParaDevolucao) {
            return res.status(400).send({ mensagem: `Quantidade devolvida "${quantidade}" excede o limite disponível para devolução "${disponivelParaDevolucao}"!` });
        }

        const atualizarQuantidadeEpi = await pegarIdEpi.update({ quantidade: Number(pegarIdEpi.quantidade) + Number(quantidade) });

        const response = await Historico.create({
            idFuncionario: verificarCpfFuncionario.id,
            idEpi: pegarIdEpi.id,
            idStatus: 2,
            quantidade
        });

        res.status(201).send({ resultado: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro interno!' });
    }
}

export { mostrarEpis, mostrarEpiPeloId, cadastrarEpi, editarEpi, removerEpi, retirarEpi, devolverEpi };
