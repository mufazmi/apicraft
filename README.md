# API Craft CLI Tool

API Craft CLI Tool is a command-line utility designed to automate the creation of API module files within a Node.js project.

## Features

- Automatically generates controller, DTO, model, route, service, and validation files.
- Uses templates to ensure consistent file structure across projects.
- Simplifies project setup and enhances productivity.

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

### Initializing a New Module

To initialize a new module in your Node.js project:

```bash
npx api-craft init <moduleName>
```

Replace `<moduleName>` with the name of your module. This command will create the following files in the `src` directory of your project:

- `controller-<moduleName>.ts`
- `dto-<moduleName>.ts`
- `model-<moduleName>.ts`
- `route-<moduleName>.ts`
- `service-<moduleName>.ts`
- `validation-<moduleName>.ts`

### Example

For example, to create a module named `user`:

```bash
npx api-craft init user
```

This will generate files such as `controller-user.ts`, `dto-user.ts`, etc., in your project's `src` directory.

## Templates

The API Craft CLI Tool uses predefined templates located in the `templates` folder of the tool's directory. You can customize these templates to suit your project's specific requirements.

## Structure

The tool assumes the following directory structure within your project:

```
project-root/
├── src/
│   ├── controllers/
│   ├── dtos/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── validations/
├── templates/
├── utils/
├── bin/
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or issues, please submit them to the GitHub repository.

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
