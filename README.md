# Digital Bank

<h1><img src="https://ik.imagekit.io/Naad4/imagem_2024-03-17_141309325.png?updatedAt=1710695678301" /></h1>

esta RESTful API permite:

-   Criar conta bancária
-   Listar contas bancárias
-   Atualizar os dados do usuário da conta bancária
-   Excluir uma conta bancária
-   Depósitar em uma conta bancária
-   Sacar de uma conta bancária
-   Transferir valores entre contas bancárias
-   Consultar saldo da conta bancária
-   Emitir extrato bancário

## Ferramentas para executar o projeto

-[Insomnia](https://insomnia.rest/download)

-[Postman](https://www.postman.com)

## Endpoints

### Listar contas bancárias

#### `GET` `/contas?senha_banco=Cubos123Bank`

Esse endpoint deverá listar todas as contas bancárias existentes.


### Criar conta bancária

#### `POST` `/contas`

Esse endpoint deverá criar uma conta bancária, onde será gerado um número único para identificação da conta (número da conta).

É necessário incluir no body do programa este seguinte modelo em JSON:

{

    "nome":""
    "cpf": ""
    "data_nascimento": "",
    "telefone": "",
    "email": "",
    "senha": ""
    
}


### Atualizar usuário da conta bancária

#### `PUT` `/contas/:numeroConta/usuario`

Esse endpoint deverá atualizar apenas os dados do usuário de uma conta bancária.

É necessário incluir no body do programa este seguinte modelo em JSON:

{

    "nome": "",
    "cpf": "",
    "data_nascimento": "",
    "telefone": "",
    "email": "",
    "senha": ""
    
}


### Excluir Conta

#### `DELETE` `/contas/:numeroConta`

Esse endpoint deve excluir uma conta bancária existente.

Você deverá incluir o identificador da conta desejada como parametro na rota


### Depositar

#### `POST` `/transacoes/depositar`

Esse endpoint deverá somar o valor do depósito ao saldo de uma conta válida e registrar essa transação.

É necessário incluir no body do programa este seguinte modelo em JSON:

{

	"numero_conta": "1",
	"valor": 1900
 
}


### Sacar

#### `POST` `/transacoes/sacar`

Esse endpoint deverá realizar o saque de um valor em uma determinada conta bancária e registrar essa transação.

É necessário incluir no body do programa este seguinte modelo em JSON:

{

	"numero_conta": "1",
	"valor": 1900,
    "senha": "123456"
}


### Transferir

#### `POST` `/transacoes/transferir`

Esse endpoint deverá permitir a transferência de recursos (dinheiro) de uma conta bancária para outra e registrar essa transação.

É necessário incluir no body do programa este seguinte modelo em JSON:

{

	"numero_conta_origem": "1",
	"numero_conta_destino": "2",
	"valor": 200,
	"senha": "123456"
 
}


### Saldo

#### `GET` `/contas/saldo?numero_conta=123&senha=123`

Esse endpoint deverá retornar o saldo de uma conta bancária.

Você deverá incluir o numero da conta (identificador) e a senha da mesma na url


### Extrato

#### `GET` `/contas/extrato?numero_conta=123&senha=123`

Esse endpoint deverá listar as transações realizadas de uma conta específica.

Você deverá incluir o numero da conta (identificador) e a senha da mesma na url

#### --Este projeto é feito em javascript,ou seja,o que é adcionado no banco de dados permanece somente na memória

