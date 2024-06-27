#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const process = require('process');
const pluralize = require('pluralize');

const CREATE_TEMPLATES = {
    'service': 'services/service.ts',
    'validation': 'validations/validation.ts',
    'route': 'routes/index.ts',
    'controller': 'controllers/controller.ts',
    'dto': 'dtos/dto.ts',
    'model': 'models/model.ts',
};

const FOLDERS = {
    'service': 'services',
    'validation': 'validations',
    'route': 'routes',
    'controller': 'controllers',
    'dto': 'dtos',
    'model': 'models',
    'configs': 'configs',
    'middlewares': 'middlewares',
    'interfaces': 'interfaces',
    'templates': 'templates',
};

const INITIAL_AUTH_FILES = [
    { template: 'controllers/auth-controller.ts', dest: 'src/controllers/auth-controller.ts' },
    { template: 'models/user-model.ts', dest: 'src/models/user-model.ts' },
    { template: 'models/role-model.ts', dest: 'src/models/role-model.ts' },
    { template: 'models/company-model.ts', dest: 'src/models/company-model.ts' },
    { template: 'services/role-service.ts', dest: 'src/services/role-service.ts' },
    { template: 'services/mail-service.ts', dest: 'src/services/mail-service.ts' },
    { template: 'services/otp-service.ts', dest: 'src/services/otp-service.ts' },
    { template: 'services/token-service.ts', dest: 'src/services/token-service.ts' },
    { template: 'services/user-service.ts', dest: 'src/services/user-service.ts' },
    { template: 'dtos/auth-dto.ts', dest: 'src/dtos/auth-dto.ts' },
    { template: 'dtos/role-dto.ts', dest: 'src/dtos/role-dto.ts' },
    { template: 'dtos/user-dto.ts', dest: 'src/dtos/user-dto.ts' },
    { template: 'validations/auth-validation.ts', dest: 'src/validations/auth-validation.ts' },
    { template: 'utils/constants.ts', dest: 'src/utils/constants.ts' },
    { template: 'interfaces/request-interface.ts', dest: 'src/interfaces/request-interface.ts' },
    { template: 'interfaces/user-interface.ts', dest: 'src/interfaces/user-interface.ts' },
    { template: 'mails/mail-template.ts', dest: 'src/templates/mail-template.ts' },
];

const INITIAL_FILES = [
    { template: 'configs/db-config.ts', dest: 'src/configs/db-config.ts' },
    { template: 'configs/mail-config.ts', dest: 'src/configs/mail-config.ts' },
    { template: 'middlewares/async-middleware.ts', dest: 'src/middlewares/async-middleware.ts' },
    { template: 'middlewares/auth-middleware.ts', dest: 'src/middlewares/auth-middleware.ts' },
    { template: 'middlewares/error-middleware.ts', dest: 'src/middlewares/error-middleware.ts' },
    { template: 'app.ts', dest: 'app.ts' },
    { template: 'routes/index.ts', dest: 'src/routes/index.ts' },
    { template: 'utils/error-handler.ts', dest: 'src/utils/error-handler.ts' },
    { template: 'utils/messages.ts', dest: 'src/utils/messages.ts' },
    { template: 'utils/response.ts', dest: 'src/utils/response.ts' },
    { template: 'utils/joi-validation.ts', dest: 'src/utils/joi-validation.ts' },
    ...INITIAL_AUTH_FILES
];

function createFile(fileName, content) {
    fs.writeFileSync(fileName, content);
    console.log(`Created ${fileName}`);
}

function generateFiles(moduleName) {
    const moduleNameLowerCase = moduleName.toLowerCase();
    const modelName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
    const pluralModuleName = pluralize.plural(moduleNameLowerCase);

    Object.entries(CREATE_TEMPLATES).forEach(([fileType, templateFile]) => {
        const folder = FOLDERS[fileType];
        const fileName = `${moduleNameLowerCase}-${fileType}.ts`;
        const filePath = path.join('src', folder, fileName);
        const templatePath = path.join(__dirname, '..', 'templates', templateFile);
        let content = fs.readFileSync(templatePath, 'utf8');
        content = content.replace(/Base/g, modelName);
        content = content.replace(/base/g, moduleNameLowerCase);
        content = content.replace(/collectionName/g, `${pluralModuleName}`);
        fs.mkdirSync(path.join('src', folder), { recursive: true });

        createFile(filePath, content);
    });
}

function createInitialFiles() {
    INITIAL_FILES.forEach(({ template, dest }) => {
        const templatePath = path.join(__dirname, '..', 'templates', template);
        const content = fs.readFileSync(templatePath, 'utf8');
        const destPath = path.join(__dirname, '..', dest);
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.writeFileSync(destPath, content);
        console.log(`Created ${destPath}`);
    });
}

function initProject() {
    Object.values(FOLDERS).forEach(folder => {
        const folderPath = path.join('src', folder);
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Created folder ${folderPath}`);
    });

    createInitialFiles();
}

function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error('No command provided.');
        process.exit(1);
    }

    const command = args[0];

    switch (command) {
        case 'init':
            initProject();
            break;
        case 'create':
            if (args.length < 2) {
                console.error('No module name provided.');
                process.exit(1);
            }
            const moduleName = args[1];
            generateFiles(moduleName);
            break;
        default:
            console.error(`Unknown command: ${command}`);
            process.exit(1);
    }
}

main();
