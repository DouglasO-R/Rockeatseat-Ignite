const { response } = require("express");
const express = require("express");
const { v4: uuidV4 } = require('uuid')
const app = express();

app.use(express.json());

/* 
cpf -string
name - string
id - uuid
statement - []
*/

const customers = [];

function verifyIfExistAccountCpf(req, res, next) {
    const { cpf } = req.headers;
    const customer = customers.find(customer => customer.cpf === cpf);

    if (!customer) {
        return res.status(400).json({ Error: "Customer NOt exist" });
    }

    req.customer = customer;

    return next();
};

function getBalance(statement) {
    const balance = statement.reduce((acc, statement) => {
        if (statement.type === "credit") {
            return acc + statement.amount;
        } else {
            return acc - statement.amount;
        }
    }, 0);
    return balance;
};

app.post('/account', (req, res) => {
    const { cpf, name } = req.body;

    const customersAlreadyExist = customers.some(customer => customer.cpf === cpf);

    if (customersAlreadyExist) {
        return res.status(400).json({ Error: "Customer already Exist" })
    }

    customers.push({
        cpf,
        name,
        id: uuidV4(),
        statement: []
    });

    return res.status(201).json({ message: "created" })

});

app.get("/statement", verifyIfExistAccountCpf, (req, res) => {
    const { customer } = req
    return res.status(200).json(customer.statement);
});

app.post('/deposit', verifyIfExistAccountCpf, (req, res) => {
    const { customer } = req;
    const { description, amount } = req.body;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }

    customer.statement.push(statementOperation);
    return res.status(201).json({ Message: "done" });
});

app.post('/withdraw', verifyIfExistAccountCpf, (req, res) => {
    const { amount } = req.body;
    const { customer } = req;


    const balance = getBalance(customer.statement);

    if (balance < amount) {
        return res.status(400).json({ Error: "Insuficient funds" });
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debit"
    };

    customer.statement.push(statementOperation);

    return res.status(201).json({ Message: "done" });
});

app.get('/statement/date', verifyIfExistAccountCpf, (req, res) => {
    const { customer } = req;
    const { date } = req.query;

    const dateFormat = new Date(date + "00:00");

    const statement = customer.statement.filter((statement) => statement.created_at.toDateString() === new Date(dateFormat).toDateString());

    return res.status(200).json(customer.statement)
});

app.put('/account', verifyIfExistAccountCpf, (req, res) => {
    const { name } = req.body;
    const { customer } = req;

    customer.name = name;

    return res.status(201).json({ Message: "done" });

});

app.get('/account', verifyIfExistAccountCpf, (req, res) => {
    const { customer } = req;
    return res.status(200).json({ customer });
});

app.delete('/account', verifyIfExistAccountCpf, (req, res) => {
    const { customer } = req;
    customers.splice(customer, 1);

    // return res.status(204).json({Message:"deleted"});
    return res.status(200).json(customers);
});

app.get('/balance', verifyIfExistAccountCpf, (req, res) => {
    const { customer } = req;
    const balance = getBalance(customer.statement);

    return res.status(200).json({balance});
});

app.listen(3000, () => console.log("api started"));