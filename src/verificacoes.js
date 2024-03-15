const { contas } = require("./bancodedados");

const campoNaoInformado = ({ nome, cpf, data_nascimento, telefone, email, senha }) => {
    if (!nome) {
        return 'O nome é um campo obrigatório'
    }
    if (!cpf) {
        return 'O cpf é um campo obrigatório'
    }
    if (!data_nascimento) {
        return 'A data de nascimento é um campo obrigatório'
    }
    if (!telefone) {
        return 'O telefone é um campo obrigatório'
    }
    if (!email) {
        return 'O email é um campo obrigatório'
    }
    if (!senha) {
        return 'A senha é um campo obrigatório'
    }
};

const informacoesIguais = ({ cpf, email }) => {

    const cpfouEmailExistente = contas.find(conta => conta.usuario.cpf === cpf || conta.usuario.email === email);
    if (cpfouEmailExistente) {
        return 'Já existe uma conta com o cpf ou email informado'
    }

};

const cpfIgual = ({ cpf, numeroConta }) => {
    const cpfEncontrado = contas.find(conta => conta.usuario.cpf === cpf && contas.numero !== numeroConta)

    if (cpfEncontrado) {
        return 'O cpf informado já foi cadastrado'
    }
}

const emailIgual = ({ email, numeroConta }) => {
    const emailEncontrado = contas.find(conta => conta.usuario.email === email && contas.numero !== numeroConta)

    if (emailEncontrado) {
        return 'O email informado já foi cadastrado'
    }
}

const saldo0 = () => {
    const contaComSaldoZero = contas.find((conta) => conta.saldo !== 0);

    if (contaComSaldoZero) {
        return 'Para a conta ser excluída é necessário que o saldo seja 0';
    }
}




module.exports = {
    campoNaoInformado,
    informacoesIguais,
    cpfIgual,
    emailIgual,
    saldo0,
}