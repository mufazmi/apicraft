import fs from 'fs';
import path from 'path';

export function createFile(template: string, dest: string, replacements: Record<string, string> = {}): void {
    const content = fs.readFileSync(path.join(__dirname, '..', 'templates', template), 'utf8');

    const replacedContent = Object.entries(replacements).reduce(
        (acc, [key, value]) => acc.replace(new RegExp(`{{${key}}}`, 'g'), value),
        content
    );

    fs.writeFileSync(dest, replacedContent);
}

export function ensureDirExists(dir: string): void {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}
