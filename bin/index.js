#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const process = require('process');

// Templates for each file type
const TEMPLATES = {
    'service': 'service.ts',
    'validation': 'validation.ts',
    'route': 'route.ts',
    'controller': 'controller.ts',
    'dto': 'dto.ts',
    'model': 'model.ts',
};

// Folder paths
const FOLDERS = {
    'service': 'services',
    'validation': 'validations',
    'route': 'routes',
    'controller': 'controllers',
    'dto': 'dtos',
    'model': 'models',
};

function createFile(fileName, content) {
    fs.writeFileSync(fileName, content);
    console.log(`Created ${fileName}`);
}

function generateFiles(moduleName) {
    const modelName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

    Object.entries(TEMPLATES).forEach(([fileType, templateFile]) => {
        const folder = FOLDERS[fileType];
        const fileName = path.join(folder, `${moduleName}-${fileType}.ts`);
        const templatePath = path.join(__dirname, '..', 'templates', templateFile);
        let content = fs.readFileSync(templatePath, 'utf8');
        content = content.replace(/ModelName/g, modelName).replace(/model-name/g, moduleName);

        // Ensure the folder exists
        fs.mkdirSync(folder, { recursive: true });

        createFile(fileName, content);
    });
}

function initProject() {
    Object.values(FOLDERS).forEach(folder => {
        fs.mkdirSync(folder, { recursive: true });
        console.log(`Created folder ${folder}`);
    });
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

