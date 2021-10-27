const Item = require('../modelos/Item');

const pegarTodosItens = async (req, res) => {
    try {
        let itens;
        if (req.query.nome) {
            itens = await Item.find({ nome: { $regex: req.query.nome, $options: 'i' } });
        } else {
            itens = await Item.find({});
        }
        res.status(200).json({ itens });

    } catch (erro) {
        res.status(500).json({ erro: erro.message });
        console.log(erro.message);
    }
}

const adicionarItem = async (req, res) => {
    try {
        if (!req.body.marca) {
            delete req.body.marca;
        }
        if (!req.body.quantidade) {
            delete req.body.quantidade;
        }
        const item = await Item.create(req.body);
        res.status(201).json({ item });

    } catch (erro) {
        res.status(400).json({ erro: erro.message });
        console.log(erro.message);
    }
}

const atualizarItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        if (!req.body.marca) {
            delete req.body.marca;
        }
        if (!req.body.quantidade) {
            delete req.body.quantidade;
        }
        const item = await Item.findByIdAndUpdate(itemId, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ item });

    } catch (erro) {
        res.status(400).json({ erro: erro.message });
        console.log(erro.message);
    }
}

const deletarItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await Item.findByIdAndDelete(itemId);
        if (!item) {
            throw new Error('Item não encontrado');
        }
        res.status(200).json({ item });

    } catch (erro) {
        res.status(400).json({ erro: erro.message });
        console.log(erro.message);
    }
}

module.exports = {
    pegarTodosItens,
    adicionarItem,
    atualizarItem,
    deletarItem
};