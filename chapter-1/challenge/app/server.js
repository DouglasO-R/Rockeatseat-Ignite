import { app } from "./src/App.js";

const port = process.env.PORT || 3000;

app.listen(port,()=>console.log("Server is Runing"));
