export default class MessageTemplate {
  private static isRequired = `:name is required`;
  private static minLength = `:name must have at least :number character (s)`;
  private static maxLength = `:name must have a maximum of :number character (s)`;
  private static isInvalid = `:name is invalid`;
  private static minUpperCase = `:name must have at least :number uppercase letter (s)`;
  private static minLowerCase = `:name must have at least :number lowercase letter (s)`;
  private static minNumber = `:name must have at least :number number (s)`;
  private static createError = `:name registration error`;
  private static error = `The request could not be made`;
  private static notFoundError = `:name not found`;
  private static mustBeEqual = `:name must be equal`;
  private static fileMaxSize = `Very large :file. Maximum size allowed: :size`;
  private static fileInvalidFormat = `Invalid :file format. Formats allowed: :format`;
  private static gatewayIntegrationError = `Gateway integration error`;

  public static getIsRequired(name: string): string {
    return this.isRequired.replaceAll(':name', name);
  }

  public static getMinLength(name: string, number: string): string {
    return this.minLength
      .replaceAll(':name', name)
      .replaceAll(':number', number);
  }

  public static getMaxLength(name: string, number: string): string {
    return this.maxLength
      .replaceAll(':name', name)
      .replaceAll(':number', number);
  }

  public static getIsInvalid(name: string): string {
    return this.isInvalid.replaceAll(':name', name);
  }

  public static getMinUpperCase(name: string, number: string): string {
    return this.minUpperCase
      .replaceAll(':name', name)
      .replaceAll(':number', number);
  }

  public static getMinLowerCase(name: string, number: string): string {
    return this.minLowerCase
      .replaceAll(':name', name)
      .replaceAll(':number', number);
  }

  public static getMinNumber(name: string, number: string): string {
    return this.minNumber
      .replaceAll(':name', name)
      .replaceAll(':number', number);
  }

  public static getCreateError(name: string): string {
    return this.createError.replaceAll(':name', name);
  }

  public static getError(): string {
    return this.error;
  }

  public static getNotFoundError(name: string): string {
    return this.notFoundError.replaceAll(':name', name);
  }

  public static getMustBeEqual(name: string): string {
    return this.mustBeEqual.replaceAll(':name', name);
  }

  public static getFileMaxSize(file: string, size: string): string {
    return this.fileMaxSize.replaceAll(':file', file).replaceAll(':size', size);
  }

  public static getFileInvalidFormat(file: string, format: string): string {
    return this.fileInvalidFormat
      .replaceAll(':file', file)
      .replaceAll(':format', format);
  }

  public static getGatewayIntegrationError(): string {
    return this.gatewayIntegrationError;
  }
}
