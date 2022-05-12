import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
export class Car {

    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    daily_rate: number;

    @Column()
    description: string;

    @Column()
    fine_amount: number;

    @Column()
    license_plate: string;

    @Column()
    brand: string;

    @Column()
    available: boolean = true;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @Column()
    category_id: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(() => Specification)
    @JoinTable(
        {
            name: "cars_specifications",
            joinColumns: [{ name: "car_id" }],
            inverseJoinColumns: [{ name: "specification_id" }]
        }
    )
    specifications: Specification[]


    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}