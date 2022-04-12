import { Specification } from "../Entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "./ISpecificationRepository";

export class SpecificationRepository implements ISpecificationRepository {

    private specifications: Specification[];
    
    private static INSTANCE: SpecificationRepository;

    private constructor() {
        this.specifications = [];
    }

    public static getInstance(): SpecificationRepository {
        if (!SpecificationRepository.INSTANCE) {
            SpecificationRepository.INSTANCE = new SpecificationRepository();
        }
        return SpecificationRepository.INSTANCE;
    }

    create({ description, name }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description
        });

        this.specifications.push(specification);

    }

    findByname(name: string): Specification {
        const spec = this.specifications.find((item) => item.name === name);
        return spec;
    }

    list(): Specification[] {
        return this.specifications;
    }
}