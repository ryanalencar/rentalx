export interface ISendMailParams {
  to: string;
  subject: string;
  path: string;
  variables: {
    link: string;
    name: string;
  };
}

export interface IMailProvider {
  sendMail({ path, subject, to, variables }: ISendMailParams): Promise<void>;
}
