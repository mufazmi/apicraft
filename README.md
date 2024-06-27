
# API Craft CLI Tool
API Craft CLI Tool is a command-line utility designed to streamline the setup of Node.js API projects, ensuring a well-structured and organized codebase. It automates the creation of essential files and folders, enhances code readability, and improves development productivity.

## Features

- Automatically generates controller, DTO, model, route, service, and validation files based on predefined templates.
- Integrated global error handling to eliminate repetitive try-catch blocks and ensure robust error management.
- Encourages best practices by enforcing a consistent file structure across projects.
- Simplifies project initialization and module creation.

## Prerequisites

Before using the API Craft CLI Tool, ensure you have the following installed:

- Node.js (version 12 or higher)
- npm (Node Package Manager)

## Installation

You can install the API Craft CLI Tool globally using npm:

```bash
npm install -g api-craft
```

## Usage

### Initializing a New Project

To initialize a new project with API Craft:

```bash
npx api-craft init
```

This command sets up the following structure in your project directory:

- `configs/`: Configuration files like database and email configurations.
- `controllers/`: Controllers to handle API endpoints.
- `dtos/`: Data Transfer Objects for input/output validation.
- `interfaces/`: TypeScript interfaces for defining data structures.
- `mails/`: Templates and services for email handling.
- `middlewares/`: Middleware functions like authentication and error handling.
- `models/`: Mongoose models for MongoDB schema definitions.
- `routes/`: Express routes to define API endpoints.
- `services/`: Business logic services for each module.
- `utils/`: Utility functions and constants.
- `validations/`: Joi validation schemas.

### Creating a New Module

To create a new module in your project:

```bash
npx api-craft create <moduleName>
```

Replace `<moduleName>` with the name of your module. This command generates:

- `controllers/<moduleName>-controller.ts`: Controller methods for handling API requests.
- `dtos/<moduleName>-dto.ts`: DTOs for validating input/output data.
- `models/<moduleName>-model.ts`: Mongoose model schema for MongoDB.
- `routes/<moduleName>-route.ts`: Express routes for module-specific endpoints.
- `services/<moduleName>-service.ts`: Business logic services for the module.
- `validations/<moduleName>-validation.ts`: Validation schemas for input data.

### Global Error Handling

API Craft includes global error handling to ensure robustness and prevent server crashes. Errors are handled centrally, returning a consistent `500 Internal Server Error` response with customizable error messages.

## Templates

API Craft uses predefined templates located in the `templates` directory of the tool's installation. These templates can be customized to suit specific project requirements, promoting code consistency and readability.

## Project Structure

The tool assumes the following directory structure within your project:

```
project-root/
├── src/
│   ├── configs/
│   ├── controllers/
│   ├── dtos/
│   ├── interfaces/
│   ├── mails/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── validations/
├── templates/
├── utils/
├── bin/
├── package.json
└── README.md
```

## Contributing

Contributions to the API Craft CLI Tool are welcome! If you have any suggestions, improvements, or issues, please submit them to the GitHub repository.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## About Me

I am an experienced Software Engineer, Security Researcher, and Hacker with a passion for creating robust and secure software solutions. With a track record of securing systems for renowned organizations, I bring expertise in enhancing digital security and developing innovative technologies.

### Short Bio

Software Engineer 👩‍💻 | Security Researcher 📖 | Hacker 💻

Secured NASA, WHO, Paytm, Dell, Nokia, Lenovo, United Airlines, ABN AMRO Bank, and more.