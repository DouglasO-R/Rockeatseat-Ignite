import { app } from "@shared/Infra/Http/App";
import { appDatasource } from "@shared/Infra/typeorm";
appDatasource.initialize().then((con) => console.log("connected")).catch((err) => console.log(err));

// (async () => {
//     await appDatasource.initialize();
//     console.log("connected");
// })()

app.listen(3000, () => console.log("Server is Runing"));
