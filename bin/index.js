#!/usr/bin/env node

const { initStructure } = require('../utils/init');

function main() {
    const [command] = process.argv.slice(2);
    if (command === 'init') {
        initStructure();
    } else {
        console.error('Unknown command');
        process.exit(1);
    }
}

main();
