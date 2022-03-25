const express = require("express");

const app = express();

app.use(express.json());

const cursos = ["Curso 1", "Curso 2", "Curso 3"];

/* 
GET - Retoirnar uma informação do servidor
POST - inserir uma informação no servidor
PUT - Alterar uma informação no servidor
PATCH - Alterar uma informação especifica no servidor
DELETE - deletar uma informação do servidor
*/

/* 
    tipos de parametros
    route params => parametros passado direto na rota
    body params => no corpo da requisição
    query params => passados na rota com separador `?` chave = valor
*/

app.get("/courses", (req, res) => {
    const query = req.query;
    res.status(201).json({query,cursos});
});

app.post("/courses", (req, res) => {
    const { curso } = req.body;
    cursos.push(curso);
    res.status(201).json({ message: "Curso adicionado" });
});

app.put("/courses/:id", (req, res) => {
    const { id } = req.params;
    res.status(201).json({ PutId: id });
});

app.patch("/courses/:id", (req, res) => {
    const { id } = req.params;
    res.status(201).json({ PathchId: id });
});

app.delete("/courses/:id", (req, res) => {
    const { id } = req.params;
    res.status(201).json({ Message: `Deleted ${id}` });
});

app.listen(3000, () => console.log("Api Started"));