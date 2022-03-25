import express from "express";
import userRoutes from"./user/routes.js";
import todosRoutes from "./todos/routes.js";


const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(todosRoutes);


export { app };