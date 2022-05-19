import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
export class User {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    driver_license: string;

    @Column()
    avatar: string;

    @Column()
    isAdmin: boolean;

    @CreateDateColumn()
    created_at: Date;

    @Expose({ name: "avatar_url" })
    avatar_url(): string {

        switch (process.env.DISK) {
            case "local":
                return `${process.env.APP_URL}/avatar/${this.avatar}`;
                break;

            case "s3":
                return `${process.env.STORAGE_BUCKET_URL}/avatar/${this.avatar}`;
                break;

            default:
                return null
                break;
        }
    }

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}