import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import * as fs from "fs";

@injectable()
export class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        // this.createClient();
    }

    async sendEmail(to: string, subject: string, variables: any, path: string) {
        if (!this.client) {
            await this.createClient();
        }

        const templateFileContent = fs.readdirSync(path).toString();
        const templateParse = handlebars.compile(templateFileContent);
        const templateHtml = templateParse(variables);

        const message = await this.client.sendMail({
            to,
            from: "Rentx<noreply@rentx.com.br>",
            subject,
            html: templateHtml
        });

        console.log("Message sent: %s", message.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));

    }

    private async createClient() {
        try {
            const account = await nodemailer.createTestAccount();

            this.client = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });
        } catch (err) {
            console.error(`EtherealMailProvider - Error:\n${err}`);
        }
    }
}