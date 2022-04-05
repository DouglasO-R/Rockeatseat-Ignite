

export class SpecificationDTO {
    id?: string;
    name: string;
    description: string;

    constructor({ id, name, description }: SpecificationDTO) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}