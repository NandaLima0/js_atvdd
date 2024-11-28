const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let pessoas = [];
let id = 1;

app.get('/pessoa', (req, res) => 
    res.json(pessoas));

app.get('/pessoa/:id', (req, res) => {
    const pessoa = pessoas.find(p => p.id === parseInt(req.params.id));
    pessoa ? res.json(pessoa) : res.status(404).send({ message: 'Pessoa não encontrada.' });
});

app.post('/pessoa', (req, res) => {
    if (!req.body.nome) return res.status(400).send({ message: 'Nome é obrigatório.' });
    const novaPessoa = { id: id++, nome: req.body.nome };
    pessoas.push(novaPessoa);
    res.status(201).json(novaPessoa);
});

app.put('/pessoa/:id', (req, res) => {
    const pessoa = pessoas.find(p => p.id === parseInt(req.params.id));
    if (!pessoa) return res.status(404).send({ message: 'Pessoa não encontrada.' });
    if (!req.body.nome) return res.status(400).send({ message: 'Nome é obrigatório.' });
    pessoa.nome = req.body.nome;
    res.json(pessoa);
});

app.delete('/pessoa/:id', (req, res) => {
    const index = pessoas.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send({ message: 'Pessoa não encontrada.' });
    pessoas.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
