# Message Manager

A TypeScript package for standardized message management with template and registry support.

**Created following DDD (Domain-Driven Design) and Clean Architecture principles**, this package was designed to organize messages by domains and aggregates, facilitating maintenance and scalability in corporate applications.

## 🚀 Features

- ✅ **Strong typing** with TypeScript
- 🏗️ **DDD-based architecture** - Organization by domains and aggregates
- 🎯 **Clean Architecture** - Clear separation of responsibilities
- 🔄 **Registry system** to manage multiple message classes
- 📝 **Predefined templates** for common validation messages
- 🔍 **Automatic duplicate detection**
- 🎯 **Automatic code generation** hierarchical by domain

## 📦 Installation

```bash
npm i fb-message-manager
```

## 🎯 Basic Usage

### 1. Creating a Message Class

```typescript
import { Message } from 'fb-message-manager';
import { default as _ } from 'fb-message-manager';

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

### 2. Use Case Messages

```typescript
import { Message } from 'fb-message-manager';
import { default as _ } from 'fb-message-manager';

class CreateUserMessage extends Message {
  protected static readonly aggregateName = 'user';

  public static readonly emailIsExisting = 'E-mail is invalid. Enter another e-mail to create an account';
  public static readonly userNotFoundError = _.getNotFoundError('User');
  public static readonly createError = _.getCreateError('User');
  public static readonly tokenIsRequired = _.getIsRequired('Token');
}
```

### 3. Using the Registry

```typescript
import { MessageRegistry } from 'fb-message-manager';
import { UserMessage } from './messages/UserMessage';
import { CreateUserMessage } from './messages/CreateUserMessage';

const messageRegistry = new MessageRegistry()
  .register([UserMessage, CreateUserMessage]);

// Get all messages
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

// Get specific message
const message = UserMessage.getMessage('nameIsRequired');
console.log(message);
// { code: "user.user.nameIsRequired", message: "Name is required" }
```

### 4. NestJS Integration

#### Module

```typescript
import { Module } from '@nestjs/common';
import { Routes } from '@nestjs/core';
import { MessageRegistry } from 'fb-message-manager';
import { MessageController } from '../message/message.controller';

// Importing messages from layers
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
import { MessageRegistry } from 'fb-message-manager';

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

### Message (Abstract Class)

- `getAggregateName()`: Returns the aggregate name
- `getSectionName()`: Generates section name based on class name  
- `getMessage(attribute)`: Gets a specific message with code
- `getAllMessages()`: Returns all messages from the class

### MessageRegistry

- `register(classes)`: Registers array of message classes
- `getAll()`: Returns all messages as Record<string, string> object

### MessageTemplate (Available Templates)

- `getIsRequired(name)`: Generates required field message
- `getMinLength(name, number)`: Generates minimum length message
- `getMaxLength(name, number)`: Generates maximum length message
- `getIsInvalid(name)`: Generates invalid field message
- `getMinUpperCase(name, number)`: Generates minimum uppercase letters message
- `getMinLowerCase(name, number)`: Generates minimum lowercase letters message
- `getMinNumber(name, number)`: Generates minimum numbers message
- `getCreateError(name)`: Generates creation error message
- `getError()`: Returns generic error message
- `getNotFoundError(name)`: Generates "not found" message
- `getMustBeEqual(name)`: Generates message for fields that must be equal
- `getFileMaxSize(file, size)`: Generates maximum file size message
- `getFileInvalidFormat(file, format)`: Generates invalid file format message
- `getGatewayIntegrationError()`: Returns integration error message

## 🏗️ Generated Code Structure

Codes are automatically generated following the DDD hierarchical pattern:

```
{aggregateName}.{sectionName}.{attributeName}
```

This structure reflects the organization by **domains** and **aggregates**, facilitating identification and maintenance of messages in applications that follow Clean Architecture.

**Examples:**
- `user.user.nameIsRequired` - Domain: user, Aggregate: user, Attribute: nameIsRequired
- `user.createUser.emailIsExisting` - Domain: user, Aggregate: createUser, Attribute: emailIsExisting

## 📁 Recommended Organization

Folder structure following **DDD** and **Clean Architecture** principles:

```
src/
├── domain/                        # Domain Layer
│   └── user/
│       ├── user-message.ts        # Messages that compose the User aggregate
│       └── index.ts
├── application/                   # Application Layer
│   └── usecases/
│       └── user/
│           ├── create/
│           │   └── create-user-message.ts
│           ├── update/
│           │   └── update-user-message.ts
│           └── index.ts
├── modules/                       # Modules
│   ├── user.module.ts
│   └── message.module.ts
├── interface/                     # Interface Layer
│   └── message/
│       └── message.controller.ts
```

### Layer Structure:

- **Domain**: Domain aggregate messages
- **Application**: Specific use case messages
- **Interface**: Controllers, modules and presentation

Each domain maintains its messages organized by **aggregates** in the domain layer and **use cases** in the application layer, ensuring Clean Architecture's separation of responsibilities.

## 🚀 Build and Development

```bash
# Install dependencies
npm install

# Build project
npm run build

# Development with watch
npm run dev

# Lint
npm run lint
```

## 👨‍💻 Author

**Flávio Bueno**  
📧 flavio.hp.bueno@outlook.com  
🐙 [GitHub](https://github.com/flavio-bueno)

## 📂 Repository

🔗 [message-manager](https://github.com/flavio-bueno/message-manager)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
