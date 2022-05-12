import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./UploadCarImageUseCase";

interface IFiles {
    filename: string;
}

export class UploadCarImagesController {

    static async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const images = request.files as IFiles[];

        const uploadCarImage = container.resolve(UploadCarImagesUseCase);

        const images_name = images.map((file) => file.filename);

        await uploadCarImage.with({ car_id: id, images_name });

        return response.status(201).send();
    }
}