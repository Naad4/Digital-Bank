const {
    contas,
    transferencias,
    depositos,
    saques
} = require('../bancodedados')

const verifSenhaBanco = (req, res, next) => {
    const { senha_banco } = req.query

    if (!senha_banco) {
        return res.status(400).json({ menssagem: 'A senha não foi informada' })
    }
    if (senha_banco !== 'Cubos123Bank') {
        return res.status(401).json({ menssagem: 'A senha está incorreta' })
    }

    next()
};

const verifSenhaENumeroConta = (req, res, next) => {
    const { numero_conta, senha } = req.query

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'É necessário informar número da conta e senha' });
    }

    let conta = contas.findIndex((conta) => {
        return conta.numero === Number(numero_conta);
    });
    if (conta < 0) {
        return res.status(404).json({ mensagem: 'Conta não encontrada' });
    }

    if (senha !== contas[conta].usuario.senha) {
        return res.status(401).json({ mensagem: 'Senha incorreta' })
    }

    next()
}

module.exports = { verifSenhaBanco, verifSenhaENumeroConta }