import { MessageOutput } from '../types/message.types';

export abstract class Message {
  protected static readonly aggregateName: string;

  public static getAggregateName(): string {
    return this.aggregateName;
  }

  public static getSectionName(): string {
    let output = this.name.replace(/\s+/g, '');
    output = output.charAt(0).toLowerCase() + output.slice(1);
    return output.endsWith('Message') ? (output = output.slice(0, -7)) : output;
  }

  public static getMessage<T extends typeof Message, K extends keyof T>(
    this: T,
    attribute: K
  ): MessageOutput {
    return attribute in this
      ? {
        code: `${this.getAggregateName()}.${this.getSectionName()}.${String(
          attribute,
        )}`,
        message: String(this[attribute]),
      }
      : { code: 'notFound', message: 'Message not found for request' };
  }

  public static getAllMessages<T extends typeof Message>(this: T): MessageOutput[] {
    return Object.entries(this)
      .filter(([key]) => key !== 'aggregateName' && key !== 'sectionName')
      .map(([key]) => this.getMessage(key as keyof Message));
  }
}
