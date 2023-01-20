export interface ISendMailParams {
  to: string;
  subject: string;
  body: string;
}

export interface IMailProvider {
  sendMail({ body, subject, to }: ISendMailParams): Promise<void>;
}
