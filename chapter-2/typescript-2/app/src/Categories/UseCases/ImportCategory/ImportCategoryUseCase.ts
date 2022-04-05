import fs from "fs";
import { parse } from "csv-parse";
import { ICategoryRepository } from "../../Repositories/ICategoryRepository";


interface ImportCategory {
    name: string;
    description: string;
}

export class ImportCategoryUseCase {

    constructor(private repository: ICategoryRepository) { }

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
        })
    }


    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        categories.map(async (category) => {
            const {name,description} = category;

            const existCategory = this.repository.findByName(category);

            if(!existCategory){
                this.repository.create(category);
            }
        });

        console.log(categories);
    }
}