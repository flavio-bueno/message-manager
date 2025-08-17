import { Message } from '../core/message';
import MessageTemplate from '../templates/message-template';

/**
 * Mensagens que compõem o agregado User
 * Seguindo os princípios de DDD, esta classe contém todas as mensagens
 * relacionadas ao agregado User do domínio
 */
export class UserMessage extends Message {
  protected static readonly aggregateName = 'user';

  // Mensagens de validação para nome
  public static readonly nameIsRequired = MessageTemplate.getIsRequired('Name');
  public static readonly nameMinLength = MessageTemplate.getMinLength('Name', '2');
  public static readonly nameMaxLength = MessageTemplate.getMaxLength('Name', '60');
  public static readonly nameIsInvalid = MessageTemplate.getIsInvalid('Name');

  // Mensagens de validação para e-mail
  public static readonly emailIsRequired = MessageTemplate.getIsRequired('E-mail');
  public static readonly emailIsInvalid = MessageTemplate.getIsInvalid('E-mail');

  // Mensagens de validação para senha
  public static readonly passwordIsRequired = MessageTemplate.getIsRequired('Password');
  public static readonly passwordMinUpperCase = MessageTemplate.getMinUpperCase('Password', '1');
  public static readonly passwordMinLowerCase = MessageTemplate.getMinLowerCase('Password', '1');
  public static readonly passwordMinNumber = MessageTemplate.getMinNumber('Password', '1');
  public static readonly passwordMinLength = MessageTemplate.getMinLength('Password', '8');
  public static readonly passwordMaxLength = MessageTemplate.getMaxLength('Password', '60');
  public static readonly passwordMinSpecialChar = 'Password must have at least one special character: #?!@$%^&*-';

  // Mensagens de validação para confirmação de senha
  public static readonly passwordConfirmationIsRequired = MessageTemplate.getIsRequired('Password confirmation');
  public static readonly passwordConfirmationMustBeEqual = MessageTemplate.getMustBeEqual('Password confirmation');

  // Mensagens de validação para telefone
  public static readonly phoneIsInvalid = MessageTemplate.getIsInvalid('Phone');
  public static readonly phoneMaxLength = MessageTemplate.getMaxLength('Phone', '15');

  // Mensagens de validação para data de nascimento
  public static readonly birthDateIsRequired = MessageTemplate.getIsRequired('Birth date');
  public static readonly birthDateIsInvalid = MessageTemplate.getIsInvalid('Birth date');

  // Mensagens genéricas
  public static readonly error = MessageTemplate.getError();
  public static readonly userNotFoundError = MessageTemplate.getNotFoundError('User');
}

// Exemplo de uso direto:
console.log('=== Exemplos de uso da UserMessage ===');

// Obter uma mensagem específica
const nameRequiredMessage = UserMessage.getMessage('nameIsRequired');
console.log('Mensagem específica:', nameRequiredMessage);

// Obter todas as mensagens da classe
const allUserMessages = UserMessage.getAllMessages();
console.log('\nTodas as mensagens:');
allUserMessages.forEach(msg => {
  console.log(`${msg.code}: ${msg.message}`);
});

// Usando com MessageRegistry
import { MessageRegistry } from '../core/message-registry';

const registry = new MessageRegistry();
registry.register([UserMessage]);

console.log('\n=== Mensagens via Registry ===');
const registryMessages = registry.getAll();
Object.entries(registryMessages).forEach(([code, message]) => {
  console.log(`${code}: ${message}`);
});