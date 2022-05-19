import { S3 } from "aws-sdk";
import { IStorageProvider } from "../IStorageProvider";
import { resolve } from "path";
import fs from "fs";
import upload from "@config/upload";
import mime from "mime";




export class S3StorageProvider implements IStorageProvider {

    private client: S3;
    constructor() {
        this.client = new S3({
            apiVersion: '2006-03-01',
            accessKeyId: process.env.STORAGE_KEY_ID,
            secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY,
            endpoint: 'https://s3.filebase.com',
            region: process.env.STORAGE_BUCKET_REGION,
            s3ForcePathStyle: true
        })
    }

    async save(file: string, folder: string): Promise<string> {
        const originalName = resolve(upload.tmpFolder, file);

        const fileContent = await fs.promises.readFile(originalName);
        const contentType = mime.getType(originalName);

        await this.client.putObject({
            Bucket: `${process.env.STORAGE_BUCKET}/${folder}`,
            Key: file,
            ACL: "public-read",
            Body: fileContent,
            ContentType: contentType,
        }).promise()

        await fs.promises.unlink(originalName);

        return file;
    }


    async delete(file: string, folder: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: `${process.env.STORAGE_BUCKET}/${folder}`,
            Key: file,
        }).promise()
    }

}