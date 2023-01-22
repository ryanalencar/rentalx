import {
  IMailProvider,
  ISendMailParams,
} from '@shared/container/providers/mail-provider/IMailProvider';

export class MailProviderInMemory implements IMailProvider {
  private messages: any[] = [];

  async sendMail({
    path,
    subject,
    to,
    variables,
  }: ISendMailParams): Promise<void> {
    this.messages.push({ path, subject, to, variables });
  }
}
