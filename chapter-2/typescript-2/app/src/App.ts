import express from "express";
import CategoriesRoutes from "./Categories/Routes/Routes";
import SpecificationRoutes from "./Specification/Routes/Routes";


const app = express();

app.use(express.json());
app.use("/categories",CategoriesRoutes);
app.use("/specification",SpecificationRoutes)



export { app };