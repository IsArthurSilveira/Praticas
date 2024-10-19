const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Array de usuários
const usuarios = [
    { nome: 'usuario1', senha: 'senha1' },
    { nome: 'usuario2', senha: 'senha2' },
    { nome: 'usuario3', senha: 'senha3' }
];

// Configurar middleware para analisar o corpo das solicitações
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para a página inicial
app.get('/', (req, res) => {
    res.send(`
        <h1>Bem-vindo</h1>
        <a href="/cadastrar">Cadastrar</a><br>
        <a href="/login">Login</a>
    `);
});

// Rota para a página de cadastro
app.get('/cadastrar', (req, res) => {
    res.send(`
        <h1>Cadastrar</h1>
        <form action="/cadastrar" method="post">
            Nome: <input type="text" name="nome"><br>
            Senha: <input type="password" name="senha"><br>
            <button type="submit">Cadastrar</button>
        </form>
    `);
});

// Rota para processar o cadastro
app.post('/cadastrar', (req, res) => {
    const { nome, senha } = req.body;
    usuarios.push({ nome, senha });
    res.send('Usuário cadastrado com sucesso! <a href="/login">Login</a>');
});

// Rota para a página de login
app.get('/login', (req, res) => {
    res.send(`
        <h1>Login</h1>
        <form action="/login" method="post">
            Nome: <input type="text" name="nome"><br>
            Senha: <input type="password" name="senha"><br>
            <button type="submit">Login</button>
        </form>
    `);
});

// Rota para processar o login
app.post('/login', (req, res) => {
    const { nome, senha } = req.body;
    let autenticado = false;

    for (let usuario of usuarios) {
        if (usuario.nome === nome && usuario.senha === senha) {
            autenticado = true;
            break;
        }
    }

    if (autenticado) {
        res.send(`Olá, ${nome}! Você está autenticado.`);
    } else {
        res.send('Nome de usuário ou senha incorretos. <a href="/login">Tentar novamente</a>');
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});