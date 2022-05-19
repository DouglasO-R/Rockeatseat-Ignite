import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { appDatasource } from "..";


async function create() {
    const id = uuidV4();
    const password = await hash("admin", 8);
    const con = await appDatasource.initialize();
    
    await con.query(
        `INSERT INTO USERS(id,name,email,password,"isAdmin",created_At,driver_license)
            values('${id}','admin','admin@rentx.com','${password}', true, 'now()', 'XXXX')
        `
    );

    await con.destroy();
}

create().then(() => console.log("admin created")).catch((err) => console.log(err));
