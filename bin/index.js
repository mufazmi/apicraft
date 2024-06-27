#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const pluralize = require('pluralize');
const changeCase = require('case');

// Load templates, dependencies, and environment configuration
const templates = require('./templates.json');
const dependencies = require('./dependencies.json');
const envConfig = require('./env.json');

// Utility function to create a file
const createFile = (fileName, content) => {
    fs.writeFileSync(fileName, content);
    console.log(`Created file: ${fileName}`);
};

// Generate content based on a template
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

// Check if a module already exists and generate necessary files
const generateFiles = (moduleName) => {
    const moduleNameLowerCase = moduleName.toLowerCase();
    const pluralModuleName = pluralize.plural(moduleNameLowerCase);

    const existingFiles = ['controller', 'service', 'route'].filter(fileType => {
        const fileName = `${moduleNameLowerCase}-${fileType}.ts`;
        const filePath = path.join(process.cwd(), 'src', templates.folders[fileType], fileName);
        return fs.existsSync(filePath);
    });

    if (existingFiles.length > 0) {
        console.error(`Module "${moduleName}" already exists with files: ${existingFiles.join(', ')}`);
        process.exit(1);
    }

    Object.entries(templates.createTemplates).forEach(([fileType, templateFile]) => {
        const folder = templates.folders[fileType];
        const fileName = `${moduleNameLowerCase}-${fileType}.ts`;
        const filePath = path.join(process.cwd(), 'src', folder, fileName);
        const templatePath = path.join(__dirname, '..', 'templates', templateFile);

        const content = generateContent(templatePath, moduleName, moduleNameLowerCase, pluralModuleName);
        fs.mkdirSync(path.join(process.cwd(), 'src', folder), { recursive: true });
        createFile(filePath, content);
    });

    updateRoutesFile(moduleNameLowerCase);
};

// Update the routes/index.ts file with new route
const updateRoutesFile = (moduleName) => {
    const routesFilePath = path.join(process.cwd(), 'src', 'routes', 'index.ts');
    const moduleNameCamelCase = moduleName.replace(/-([a-z])/g, (g) => g[1].toUpperCase()); // Convert hyphenated name to camelCase
    const routeImport = `import ${moduleNameCamelCase}Route from './${moduleName}-route';`;
    const routeUse = `router.use('/${moduleName}', ${moduleNameCamelCase}Route);`;

    try {
        let routesFileContent = fs.readFileSync(routesFilePath, 'utf8');

        if (!routesFileContent.includes(routeImport)) {
            const importIndex = routesFileContent.indexOf("// Import routes") + "// Import routes".length;
            routesFileContent = [routesFileContent.slice(0, importIndex), `\n${routeImport}`, routesFileContent.slice(importIndex)].join('');
        }

        if (!routesFileContent.includes(routeUse)) {
            const useIndex = routesFileContent.indexOf("// AUTH") + "// AUTH".length;
            routesFileContent = [routesFileContent.slice(0, useIndex), `\n${routeUse}`, routesFileContent.slice(useIndex)].join('');
        }

        fs.writeFileSync(routesFilePath, routesFileContent);
        console.log(`Updated routes/index.ts with new route: ${moduleNameCamelCase}`);
    } catch (error) {
        console.error('Error updating routes file:', error);
    }
};

// Initialize the project with necessary folders, files, package.json updates, and dependencies installation
const initProject = () => {
    const srcFolderPath = path.join(process.cwd(), 'src');
    
    if (fs.existsSync(srcFolderPath)) {
        console.error('Project already initialized. "src" folder already exists.');
        process.exit(1);
    }

    Object.values(templates.folders).forEach(folder => {
        const folderPath = path.join(process.cwd(), 'src', folder);
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Created folder: ${folderPath}`);
    });

    templates.initialFiles.concat(templates.initialAuthFiles).forEach(template => {
        const dest = path.join('src', template);
        const templatePath = path.join(__dirname, '..', 'templates', template);
        const destPath = path.join(process.cwd(), dest);
        const content = fs.readFileSync(templatePath, 'utf8');
        
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        createFile(destPath, content);
    });

    createEnvFiles();
    updatePackageJson();
    installDependencies();
};

// Main function to handle commands
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
