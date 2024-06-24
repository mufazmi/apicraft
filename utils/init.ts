import { FILES, FOLDERS } from './constants';
import { createFile, ensureDirExists } from './file';
import path from 'path';
import fs from 'fs';

export function initStructure(): void {
    const srcDir = path.join(process.cwd(), 'src');
    ensureDirExists(srcDir);

    FOLDERS.forEach(folder => ensureDirExists(path.join(srcDir, folder)));

    Object.entries(FILES).forEach(([template, dest]) => createFile(template, path.join(process.cwd(), dest)));

    const appPath = path.join(srcDir, 'app.ts');
    if (!fs.existsSync(appPath)) fs.writeFileSync(appPath, '');
}
