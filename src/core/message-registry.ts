import { Message } from './message';

export class MessageRegistry {
  private messages: Array<typeof Message> = [];

  public register(messageClasses: Array<typeof Message>): this {
    for (const messageClass of messageClasses) {
      const className = messageClass.name;
      const alreadyRegistered = this.messages.find(m => m.name === className);
      if (alreadyRegistered) {
        throw new Error(`Message already registered: ${className}`);
      }
      this.messages.push(messageClass);
    }
    return this;
  }

  public getAll(): Record<string, string> {
    const output: Record<string, string> = {};

    for (const messageClass of this.messages) {
      for (const { code, message: text } of messageClass.getAllMessages()) {
        if (output.hasOwnProperty(code)) {
          throw new Error(
            `Duplicate message code detected: { code: ${code}, message: ${text} }`,
          );
        }
        output[code] = text;
      }
    }

    return output;
  }
}
