import { Funcionario, Epi, Historico, Status } from '../model/relacionamentoTabelas.js';

const mostrarEpis = async (req, res) => {
    try {
        const response = await Epi.findAll({ attributes: ['id', 'nome', 'quantidade', 'imagem'] });
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
        const id = Number(req.params.id);
        const { nome, quantidade, imagem } = req.body;
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
        res.status(200).send({ mensagem: 'Epi deletado com sucesso!' });
    } catch (error) {
        console.log(error)
        res.status(500).send({ mensagem: 'Erro ao remover!' });
    }
}

const retirarEpi = async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, quantidade } = req.body;

        const verificarNomeFuncionario = await Funcionario.findOne({ where: { nome: nome } });

        const pegarIdEpi = await Epi.findByPk(id);

        const atualizarQuantidadeEpi = await pegarIdEpi.update({ quantidade: Number(pegarIdEpi.quantidade) - Number(quantidade) });

        const response = await Historico.create({
            idFuncionario: verificarNomeFuncionario.id,
            idEpi: pegarIdEpi.id,
            idStatus: 1,
            quantidade
        });

        res.status(201).send({ resultado: response });

    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro ao tentar retirar o EPI!' });
    }
}

const devolverEpi = async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, quantidade } = req.body;

        const verificarNomeFuncionario = await Funcionario.findOne({ where: { nome: nome } });
        if (!verificarNomeFuncionario) {
            return res.status(404).send({ mensagem: 'Funcionário não encontrado!' });
        }

        const pegarIdEpi = await Epi.findByPk(id);
        if (!pegarIdEpi) {
            return res.status(404).send({ mensagem: 'EPI não encontrado!' });
        }

        const totalRetirado = await Historico.sum('quantidade', { where: { idFuncionario: verificarNomeFuncionario.id, idEpi: pegarIdEpi.id, idStatus: 1 } });

        const totalDevolvido = await Historico.sum('quantidade', { where: { idFuncionario: verificarNomeFuncionario.id, idEpi: pegarIdEpi.id, idStatus: 2 } });

        const disponivelParaDevolucao = totalRetirado - totalDevolvido;

        if (disponivelParaDevolucao <= 0) {
            return res.status(400).send({ mensagem: 'Não há EPIs pendentes de devolução!' });
        }

        if (quantidade > disponivelParaDevolucao) {
            return res.status(400).send({
                mensagem: `Quantidade devolvida excede o que foi retirado! Você só pode devolver até ${quantidadeDisponivelParaDevolucao} unidade(s).`
            });
        }

        const atualizarQuantidadeEpi = await pegarIdEpi.update({ quantidade: Number(pegarIdEpi.quantidade) + Number(quantidade) });

        const response = await Historico.create({
            idFuncionario: verificarNomeFuncionario.id,
            idEpi: pegarIdEpi.id,
            idStatus: 2,
            quantidade
        });

        res.status(201).send({ resultado: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ mensagem: 'Erro ao tentar devolver o EPI!' });
    }
}

export { mostrarEpis, cadastrarEpi, editarEpi, removerEpi, retirarEpi, devolverEpi };
