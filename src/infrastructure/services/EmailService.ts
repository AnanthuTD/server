import nodemailer from 'nodemailer';
import env from '../env/env';
import { injectable } from 'inversify';
import IEmailService from '../../domain/services/IEmailService';

@injectable()
class EmailService implements IEmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS,
    },
  });

  async sendVerificationEmail({
    to,
    verificationLink,
  }: {
    to: string;
    verificationLink: string;
  }): Promise<void> {
    const mailOptions = {
      from: 'no-reply@yourapp.com',
      to,
      subject: 'Email Verification',
      text: `Please verify your email by clicking the following link: ${verificationLink}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

export default EmailService;
