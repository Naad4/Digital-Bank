const express = require('express');

const {
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta,
    deposito,
    saque,
    transferencia,
    visualizarSaldo,
    conferirExtrato
} = require('../controller/controller');

const {
    verifSenhaBanco,
    verifSenhaENumeroConta
} = require('../middlewares/middlewares');

const routes = express();

routes.get('/contas', verifSenhaBanco, listarContas);
routes.get('/contas/saldo', verifSenhaENumeroConta, visualizarSaldo);
routes.get('/contas/extrato', verifSenhaENumeroConta, conferirExtrato);
routes.post('/contas', criarConta);
routes.post('/transacoes/depositar', deposito);
routes.post('/transacoes/sacar', saque);
routes.post('/transacoes/transferir', transferencia);
routes.delete('/contas/:numeroConta', excluirConta);
routes.put('/contas/:numeroConta/usuario', atualizarUsuario);

module.exports = routes;
