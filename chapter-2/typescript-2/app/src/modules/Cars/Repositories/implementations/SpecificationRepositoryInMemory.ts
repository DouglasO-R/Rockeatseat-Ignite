import { Specification } from "@modules/Cars/Infra/typeorm/Entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";


export default class SpecificationRepositoryInMemory implements ISpecificationRepository {

    private specifications: Specification[];

    private static INSTANCE: SpecificationRepositoryInMemory;

    private constructor() {
        this.specifications = [];
    }



    public static getInstance(): SpecificationRepositoryInMemory {
        if (!SpecificationRepositoryInMemory.INSTANCE) {
            SpecificationRepositoryInMemory.INSTANCE = new SpecificationRepositoryInMemory();
        }
        return SpecificationRepositoryInMemory.INSTANCE;
    }

    async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description
        });

        this.specifications.push(specification);
        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        const spec = this.specifications.find((item) => item.name === name);
        return spec;
    }

    async list(): Promise<Specification[]> {
        return this.specifications;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        return this.specifications.filter((spec) => ids.includes(spec.id));
    }
}