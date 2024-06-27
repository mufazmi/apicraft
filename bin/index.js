#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const process = require('process');
const { execSync } = require('child_process');
const pluralize = require('pluralize');
const changeCase = require('case');

const templates = JSON.parse(fs.readFileSync(path.join(__dirname, 'templates.json')));
const dependencies = JSON.parse(fs.readFileSync(path.join(__dirname, 'dependencies.json')));
const envConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'env.json')));

const createFile = (fileName, content) => {
    fs.writeFileSync(fileName, content);
    console.log(`Created ${fileName}`);
};

const generateContent = (templatePath, moduleName, moduleNameLowerCase, pluralModuleName) => {
    const modelName = changeCase.camel(moduleName);
    const className = changeCase.pascal(moduleName);
    const kebab = changeCase.kebab(moduleName);
    let content = fs.readFileSync(templatePath, 'utf8');
    content = content.replace(/Base/g, className)
                     .replace(/base-kebab/g, kebab)
                     .replace(/base/g, modelName)
                     .replace(/collectionName/g, pluralModuleName)
                     .replace(/baseValidation/g, `${moduleNameLowerCase}Validation`);
    return content;
};

const generateFiles = (moduleName) => {
    const moduleNameLowerCase = moduleName.toLowerCase();
    const pluralModuleName = pluralize.plural(moduleNameLowerCase);
    
    Object.entries(templates.createTemplates).forEach(([fileType, templateFile]) => {
        const folder = templates.folders[fileType];
        const fileName = `${moduleNameLowerCase}-${fileType}.ts`;
        const filePath = path.join('src', folder, fileName);
        const templatePath = path.join(__dirname, '..', 'templates', templateFile);

        const content = generateContent(templatePath, moduleName, moduleNameLowerCase, pluralModuleName);
        fs.mkdirSync(path.join('src', folder), { recursive: true });
        createFile(filePath, content);
    });
};

const createInitialFiles = () => {
    templates.initialFiles.concat(templates.initialAuthFiles).forEach((template) => {
        const dest = template === 'app.ts' ? template : path.join('src', template);
        const templatePath = path.join(__dirname, '..', 'templates', template);
        const destPath = path.join(__dirname, '..', dest);
        const content = fs.readFileSync(templatePath, 'utf8');
        
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        createFile(destPath, content);
    });
};

const createEnvFiles = () => {
    const envContent = Object.entries(envConfig.env)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');
    
    createFile(path.join(process.cwd(), '.env'), envContent);
    createFile(path.join(process.cwd(), '.env.prod'), envContent);
};

const updatePackageJson = () => {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    packageJson.scripts = {
        ...packageJson.scripts,
        ...dependencies.scripts
    };

    packageJson.devDependencies = {
        ...packageJson.devDependencies,
        ...dependencies.devDependencies
    };

    packageJson.dependencies = {
        ...packageJson.dependencies,
        ...dependencies.dependencies
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('Updated package.json with required scripts and dependencies.');
};

const installDependencies = () => {
    execSync('npm install', { stdio: 'inherit' });
    console.log('Installed dependencies.');
};

const initProject = () => {
    Object.values(templates.folders).forEach(folder => {
        const folderPath = path.join('src', folder);
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Created folder ${folderPath}`);
    });

    createInitialFiles();
    createEnvFiles();
    updatePackageJson();
    installDependencies();
};

const main = () => {
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
};

main();
