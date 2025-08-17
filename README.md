# Message Manager

Um pacote TypeScript para gerenciamento padronizado de mensagens com suporte a templates e registry.

**Criado seguindo os princípios de DDD (Domain-Driven Design) e Clean Architecture**, este pacote foi projetado para organizar mensagens por domínios e agregados, facilitando a manutenção e escalabilidade em aplicações corporativas.

## 🚀 Características

- ✅ **Tipagem forte** com TypeScript
- 🏗️ **Arquitetura baseada em DDD** - Organização por domínios e agregados
- 🎯 **Clean Architecture** - Separação clara de responsabilidades
- 🔄 **Sistema de registro** para gerenciar múltiplas classes de mensagens
- 📝 **Templates predefinidos** para mensagens de validação comuns
- 🔍 **Detecção de duplicatas** automática
- 🎯 **Geração automática de códigos** hierárquicos por domínio

## 📦 Instalação

```bash
npm install @your-org/message-manager
```

## 🎯 Uso Básico

### 1. Criando uma Classe de Mensagem

```typescript
import { Message } from '@your-org/message-manager';
import { default as _ } from '@your-org/message-manager';

class UserMessage extends Message {
  protected static readonly aggregateName = 'user';

  public static readonly nameIsRequired = _.getIsRequired('Name');
  public static readonly nameMinLength = _.getMinLength('Name', '2');
  public static readonly nameMaxLength = _.getMaxLength('Name', '60');
  public static readonly nameIsInvalid = _.getIsInvalid('Name');
  public static readonly emailIsRequired = _.getIsRequired('E-mail');
  public static readonly emailIsInvalid = _.getIsInvalid('E-mail');
  public static readonly passwordIsRequired = _.getIsRequired('Password');
  public static readonly passwordMinUpperCase = _.getMinUpperCase('Password', '1');
  public static readonly passwordMinLowerCase = _.getMinLowerCase('Password', '1');
  public static readonly passwordMinNumber = _.getMinNumber('Password', '1');
  public static readonly passwordMinLength = _.getMinLength('Password', '8');
  public static readonly passwordMaxLength = _.getMaxLength('Password', '60');
  public static readonly passwordMinSpecialChar = 'Password must have at least one special character: #?!@$%^&*-';
  public static readonly error = _.getError();
}
```

### 2. Mensagens de Caso de Uso

```typescript
import { Message } from '@your-org/message-manager';
import { default as _ } from '@your-org/message-manager';

class CreateUserMessage extends Message {
  protected static readonly aggregateName = 'user';

  public static readonly emailIsExisting = 'E-mail is invalid. Enter another e-mail to create an account';
  public static readonly userNotFoundError = _.getNotFoundError('User');
  public static readonly createError = _.getCreateError('User');
  public static readonly tokenIsRequired = _.getIsRequired('Token');
}
```

### 3. Usando o Registry

```typescript
import { MessageRegistry } from '@your-org/message-manager';
import { UserMessage } from './messages/UserMessage';
import { CreateUserMessage } from './messages/CreateUserMessage';

const messageRegistry = new MessageRegistry()
  .register([UserMessage, CreateUserMessage]);

// Obter todas as mensagens
const allMessages = messageRegistry.getAll();
console.log(allMessages);
/*
{
  "user.user.nameIsRequired": "Name is required",
  "user.user.emailIsInvalid": "E-mail is invalid",
  "user.createUser.emailIsExisting": "E-mail is invalid. Enter another e-mail to create an account",
  ...
}
*/

// Obter mensagem específica
const message = UserMessage.getMessage('nameIsRequired');
console.log(message);
// { code: "user.user.nameIsRequired", message: "Name is required" }
```

### 4. Integração com NestJS

#### Module

```typescript
import { Module } from '@nestjs/common';
import { Routes } from '@nestjs/core';
import { MessageRegistry } from '@your-org/message-manager';
import { MessageController } from '../message/message.controller';

// Importando mensagens das camadas
import { UserMessage } from '../../domain/user/user-message';
import { CreateUserMessage } from '../../application/usecases/user/create/create-user-message';

const messages = [UserMessage, CreateUserMessage];

@Module({
  controllers: [MessageController],
  providers: [
    {
      provide: MessageRegistry,
      useValue: new MessageRegistry().register(messages),
    },
  ],
  exports: [MessageRegistry],
})
export class MessageModule {
  public static getRoutes(): Routes {
    return [{ path: 'messages', module: MessageModule }];
  }
}
```

#### Controller

```typescript
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { MessageRegistry } from '@your-org/message-manager';

@Controller()
export class MessageController {
  constructor(private readonly messageRegistry: MessageRegistry) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async get() {
    return this.messageRegistry.getAll();
  }
}
```

## 🔧 API Reference

### Message (Classe Abstrata)

- `getAggregateName()`: Retorna o nome do agregado
- `getSectionName()`: Gera nome da seção baseado no nome da classe  
- `getMessage(attribute)`: Obtém uma mensagem específica com código
- `getAllMessages()`: Retorna todas as mensagens da classe

### MessageRegistry

- `register(classes)`: Registra array de classes de mensagem
- `getAll()`: Retorna todas as mensagens como objeto Record<string, string>

### MessageTemplate (Templates Disponíveis)

- `getIsRequired(name)`: Gera mensagem de campo obrigatório
- `getMinLength(name, number)`: Gera mensagem de tamanho mínimo
- `getMaxLength(name, number)`: Gera mensagem de tamanho máximo
- `getIsInvalid(name)`: Gera mensagem de campo inválido
- `getMinUpperCase(name, number)`: Gera mensagem de letras maiúsculas mínimas
- `getMinLowerCase(name, number)`: Gera mensagem de letras minúsculas mínimas
- `getMinNumber(name, number)`: Gera mensagem de números mínimos
- `getCreateError(name)`: Gera mensagem de erro de criação
- `getError()`: Retorna mensagem de erro genérica
- `getNotFoundError(name)`: Gera mensagem de "não encontrado"
- `getMustBeEqual(name)`: Gera mensagem de campos que devem ser iguais
- `getFileMaxSize(file, size)`: Gera mensagem de tamanho máximo de arquivo
- `getFileInvalidFormat(file, format)`: Gera mensagem de formato inválido de arquivo
- `getGatewayIntegrationError()`: Retorna mensagem de erro de integração

## 🏗️ Estrutura de Código Gerado

Os códigos são gerados automaticamente seguindo o padrão hierárquico do DDD:

```
{aggregateName}.{sectionName}.{attributeName}
```

Esta estrutura reflete a organização por **domínios** e **agregados**, facilitando a identificação e manutenção das mensagens em aplicações que seguem Clean Architecture.

**Exemplos:**
- `user.user.nameIsRequired` - Domínio: user, Agregado: user, Atributo: nameIsRequired
- `user.createUser.emailIsExisting` - Domínio: user, Agregado: createUser, Atributo: emailIsExisting

## 📁 Organização Recomendada

Estrutura de pastas seguindo os princípios de **DDD** e **Clean Architecture**:

```
src/
├── domain/                        # Camada de Domínio
│   └── user/
│       ├── user-message.ts        # Mensagens que compõem o agregado User
│       └── index.ts
├── application/                   # Camada de Aplicação
│   └── usecases/
│       └── user/
│           ├── create/
│           │   └── create-user-message.ts
│           ├── update/
│           │   └── update-user-message.ts
│           └── index.ts
├── modules/                       # Módulos
│   ├── user.module.ts
│   └── message.module.ts
├── interface/                     # Camada de Interface
│   └── message/
│       └── message.controller.ts
```

### Estrutura por Camadas:

- **Domain**: Mensagens dos agregados do domínio
- **Application**: Mensagens dos casos de uso específicos
- **Interface**: Controllers, módulos e apresentação

Cada domínio mantém suas mensagens organizadas por **agregados** na camada de domínio e **casos de uso** na camada de aplicação, garantindo a separação de responsabilidades da Clean Architecture.

## 🚀 Build e Desenvolvimento

```bash
# Instalar dependências
npm install

# Build do projeto
npm run build

# Desenvolvimento com watch
npm run dev

# Lint
npm run lint
```

## 👨‍💻 Autor

**Flávio Bueno**  
📧 flavio.hp.bueno@outlook.com  
🐙 [GitHub](https://github.com/flavio-bueno)

## 📂 Repositório

🔗 [message-manager](https://github.com/flavio-bueno/message-manager)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.

## 🤝 Contribuição

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request
