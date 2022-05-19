"use strict";

var _bcrypt = require("bcrypt");

var _uuid = require("uuid");

var _ = require("..");

async function create() {
  const id = (0, _uuid.v4)();
  const password = await (0, _bcrypt.hash)("admin", 8);
  const con = await _.appDatasource.initialize();
  await con.query(`INSERT INTO USERS(id,name,email,password,"isAdmin",created_At,driver_license)
            values('${id}','admin','admin@rentx.com','${password}', true, 'now()', 'XXXX')
        `);
  await con.destroy();
}

create().then(() => console.log("admin created")).catch(err => console.log(err));