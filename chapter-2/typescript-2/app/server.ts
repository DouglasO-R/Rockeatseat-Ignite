import { Request, Response } from "express";
import { app } from "./src/App";

app.get("/", (request: Request, response: Response) => {
    response.json("ola mundo");
});

app.post("/courses", (request: Request, response: Response) => {
    const { name } = request.body;
    response.json(name);
});

app.listen(3000, () => console.log("Server is Runing"))