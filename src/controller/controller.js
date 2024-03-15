let {
    contas,
    depositos,
    saques,
    transferencias,
} = require('../bancodedados')

const {
    campoNaoInformado,
    informacoesIguais,
    cpfIgual,
    emailIgual,
    saldo0,
} = require('../verificacoes')

const { dataHoraFormatada } = require('./data')

let identificadorConta = 1

const listarContas = (req, res) => {

    try {
        return res.status(200).json(contas)
    } catch (erro) {
        return res.status(500).json({ mensagem: erro.mensagem })
    }
};

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const erro1 = campoNaoInformado({ nome, cpf, data_nascimento, telefone, email, senha });
    const erro2 = informacoesIguais({ cpf, email });

    if (erro1) {
        return res.status(400).json({ mensagem: erro1 })
    }
    if (erro2) {
        return res.status(400).json({ mensagem: erro2 })
    }

    try {
        const novaConta = {
            numero: identificadorConta,
            saldo: 0,
            usuario: {
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha
            }
        }
        contas.push(novaConta)
        identificadorConta++
        return res.status(204).send()
    } catch (erro) {
        return res.status(500).json({ mensagem: erro.mensagem })
    }
};

const atualizarUsuario = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params;

    const erro1 = campoNaoInformado({ nome, cpf, data_nascimento, telefone, email, senha });
    const erro2 = cpfIgual({ cpf, numeroConta })
    const erro3 = emailIgual({ email, numeroConta })

    if (erro1) {
        return res.status(400).json({ mensagem: erro1 })
    }
    if (erro2) {
        return res.status(400).json({ mensagem: erro2 })
    }
    if (erro3) {
        return res.status(400).json({ mensagem: erro3 })
    }

    try {
        let conta = contas.find((conta) => {
            return conta.numero === Number(numeroConta);
        });

        if (!conta) {
            return res.status(404).json({ mensagem: 'Conta não encontrada' });
        }

        conta.usuario.nome = nome
        conta.usuario.cpf = cpf
        conta.usuario.data_nascimento = data_nascimento
        conta.usuario.telefone = telefone
        conta.usuario.email = email
        conta.usuario.senha = senha

        return res.status(204).send()
    } catch (erro) {
        return res.status(500).json({ mensagem: erro.mensagem })
    }
}

const excluirConta = (req, res) => {
    const { numeroConta } = req.params

    const erro1 = saldo0()

    if (erro1) {
        return res.status(400).json({ mensagem: erro1 })
    }

    try {

        let conta = contas.find((conta) => {
            return conta.numero === Number(numeroConta);
        });

        if (!conta) {
            return res.status(404).json({ mensagem: 'Conta não encontrada' });
        }

        contas = contas.filter((conta) => {
            return conta.numero !== Number(numeroConta)
        })

        return res.status(204).send()

    } catch (erro) {
        return res.status(500).json({ mensagem: erro.mensagem })
    }
}

const deposito = (req, res) => {
    const { numero_conta, valor } = req.body

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: 'É necessário informar número da conta e valor' });
    }
    if (valor < 0 || valor === 0) {
        return res.status(400).json({ mensagem: 'o valor não pode ser menor ou igual a 0' })
    }

    try {
        let conta = contas.findIndex((conta) => {
            return conta.numero === Number(numero_conta);
        });

        if (conta < 0) {
            return res.status(404).json({ mensagem: 'Conta não encontrada' });
        }

        contas[conta].saldo += valor

        const registroDeposito = {
            data: dataHoraFormatada(),
            valor: Number(valor),
            numero_conta: numero_conta
        }

        depositos.push(registroDeposito)

        return res.status(204).send();
    } catch (erro) {
        return res.status(500).json({ mensagem: erro.mensagem })
    }


}

const saque = (req, res) => {
    const { numero_conta, valor, senha } = req.body

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: 'É necessário informar número da conta, valor e senha' });
    }
    if (valor < 0 || valor === 0) {
        return res.status(400).json({ mensagem: 'o valor não pode ser menor ou igual a 0' })
    }

    try {
        let conta = contas.findIndex((conta) => {
            return conta.numero === Number(numero_conta);
        });
        if (conta < 0) {
            return res.status(404).json({ mensagem: 'Conta não encontrada' });
        }

        if (senha !== contas[conta].usuario.senha) {
            return res.status(401).json({ mensagem: 'Senha incorreta' })
        }

        if (contas[conta].saldo < valor) {
            return res.status(400).json({ mensagem: 'Saldo insuficiente!' })
        }

        contas[conta].saldo -= valor

        const registroSaque = {
            data: dataHoraFormatada(),
            valor: Number(valor),
            numero_conta: numero_conta
        }

        saques.push(registroSaque)

        return res.status(204).send();
    } catch (erro) {
        return res.status(500).json({ mensagem: erro.mensagem })
    }

}

const transferencia = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

    if (!numero_conta_origem || !valor || !senha || !numero_conta_destino) {
        return res.status(400).json({ mensagem: 'É necessário informar número da conta de origem e destino, valor e senha' });
    }
    if (valor < 0 || valor === 0) {
        return res.status(400).json({ mensagem: 'o valor não pode ser menor ou igual a 0' })
    }

    try {
        let contaOrigem = contas.findIndex((conta) => {
            return conta.numero === Number(numero_conta_origem);
        });
        if (contaOrigem < 0) {
            return res.status(404).json({ mensagem: 'Conta de origem não encontrada' });
        }

        let contaDestino = contas.findIndex((conta) => {
            return conta.numero === Number(numero_conta_destino);
        });
        if (contaDestino < 0) {
            return res.status(404).json({ mensagem: 'Conta de destino não encontrada' });
        }

        if (senha !== contas[contaOrigem].usuario.senha) {
            return res.status(401).json({ mensagem: 'Senha incorreta' })
        }

        if (numero_conta_origem === numero_conta_destino) {
            return res.status(400).json({ mensagem: 'O número da conta de origem e de destino precisam ser diferentes' })
        }

        if (contas[contaOrigem].saldo < valor) {
            return res.status(400).json({ mensagem: 'Saldo insuficiente!' })
        }

        contas[contaOrigem].saldo -= valor
        contas[contaDestino].saldo += valor

        const registroTransferencia = {
            data: dataHoraFormatada(),
            numero_conta_origem,
            numero_conta_destino,
            valor: Number(valor)
        }

        transferencias.push(registroTransferencia)

        return res.status(204).send();
    } catch (erro) {
        return res.status(500).json({ mensagem: erro.mensagem })
    }
}

const visualizarSaldo = (req, res) => {
    const { numero_conta, senha } = req.query

    try {
        let conta = contas.findIndex((conta) => {
            return conta.numero === Number(numero_conta);
        });

        return res.status(200).json(contas[conta].saldo)
    } catch (erro) {
        return res.status(500).json({ mensagem: erro.mensagem })
    }

}

const conferirExtrato = (req, res) => {
    const { numero_conta, senha } = req.query

    try {

        const depositosConta = depositos.filter((item) => {
            return item.numero_conta === numero_conta
        })

        const saquesConta = saques.filter((item) => {
            return item.numero_conta === numero_conta
        })

        const transferenciasEnviadas = transferencias.filter((item) => {
            return item.numero_conta_origem === numero_conta
        })

        const transferenciasRecebidas = transferencias.filter((item) => {
            return item.numero_conta_destino === numero_conta
        })

        return res.status(200).json({ depositos: depositosConta, saques: saquesConta, transferenciasEnviadas, transferenciasRecebidas })
    } catch (erro) {
        console.log(erro)
        return res.status(500).json({ mensagem: erro.mensagem })
    }
}



module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta,
    deposito,
    saque,
    transferencia,
    visualizarSaldo,
    conferirExtrato
}
