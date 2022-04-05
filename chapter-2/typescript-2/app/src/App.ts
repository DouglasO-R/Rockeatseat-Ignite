import express from "express";
import CategoriesRoutes from "./Categories/Routes/Routes";
import SpecificationRoutes from "./Specification/Routes/Routes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerFile));


app.use("/categories",CategoriesRoutes);
app.use("/specification",SpecificationRoutes)



export { app };