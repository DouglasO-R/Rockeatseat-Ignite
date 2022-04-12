import { inject, injectable } from "tsyringe";
import fs from "fs";
import { parse } from "csv-parse";
import { ICategoryRepository } from "@modules/Cars/Categories/Repositories/ICategoryRepository";


interface ImportCategory {
    name: string;
    description: string;
}

@injectable()
export class ImportCategoryUseCase {

    constructor(@inject("PostgresCategoryRepository") private repository: ICategoryRepository) { }

    loadCategories(file: Express.Multer.File): Promise<ImportCategory[]> {

        return new Promise((resolve, reject) => {
            
            const stream = fs.createReadStream(file.path);
            const categories: ImportCategory[] = [];

            const parseFile = parse();

            stream.pipe(parseFile);

            parseFile.on("data", async (line) => {
                const [name, description] = line;

                categories.push({
                    name,
                    description
                });

            }).on("end", () => {

                fs.promises.unlink(file.path);
                resolve(categories);

            }).on("error",(err)=>{

                reject(err);
            });

            return categories;
        });
    }


    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        categories.map(async (category) => {
            const {name} = category;

            const existCategory = await this.repository.findByName(name);

            if(!existCategory){
                await this.repository.create(category);
            }

        });

    }
}