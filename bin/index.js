#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const process = require('process');
const pluralize = require('pluralize');

// Templates for each file type
const CREATE_TEMPLATES = {
    'service': 'services/service.ts',
    'validation': 'validations/validation.ts',
    'route': 'routes/index.ts',
    'controller': 'controllers/controller.ts',
    'dto': 'dtos/dto.ts',
    'model': 'models/model.ts',
};

// Folder paths relative to 'src'
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
};

// Initial files to be created on 'init'
const INITIAL_FILES = [
    { template: 'configs/db-config.ts', dest: 'src/configs/db-config.ts' },
    { template: 'configs/mail-config.ts', dest: 'src/configs/mail-config.ts' },
    { template: 'interfaces/request-interface.ts', dest: 'src/interfaces/request-interface.ts' },
    { template: 'app.ts', dest: 'app.ts' },
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

        // Replace placeholders in the template content
        content = content.replace(/Base/g, modelName);
        content = content.replace(/base/g, moduleNameLowerCase);
        // content = content.replace(/ModelName/g, modelName);
        // content = content.replace(/modelNameSchema/g, `${moduleName}Schema`);
        // content = content.replace(/modelNameModel/g, `model<${modelName}>('${modelName}', ${moduleName}Schema, '${pluralModuleName}');`);
        content = content.replace(/collectionName/g, `${pluralModuleName}`);

        // Ensure the folder exists
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
