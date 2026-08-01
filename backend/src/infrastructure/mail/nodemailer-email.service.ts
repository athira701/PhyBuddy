import { injectable } from "tsyringe";
import { IEmailService } from "../../domain/user/services/email-service.interface";
import { otpEmailTemplate } from "./templates/otp-email.template";
import { createTransporter } from "./transporter";


@injectable()
export class NodeMailerEmailService implements IEmailService{

    async sendOtpEmail(email: string, otp: string): Promise<void> {
        const transporter = createTransporter()
        
        console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS ? "Loaded" : "Missing");
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject:"Verify your PhyBuddy account",
            html: otpEmailTemplate(otp),
        })

    }
}