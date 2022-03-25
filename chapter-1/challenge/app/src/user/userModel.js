import { v4 as uuidV4 } from "uuid";

export class User {

    constructor(name, username, id = null) {
        this.name = name;
        this.username = username;
        this.todos = [];

        if (id === null) {
            this.id = uuidV4();
        }
    }

}