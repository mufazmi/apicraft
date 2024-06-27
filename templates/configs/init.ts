import * as fs from 'fs';
import * as path from 'path';
import Constants from '../utils/constants';

const foldersToCreate = Object.values(Constants.FOLDER);

function createFoldersIfNotExist(folders: string[]) {
  const projectRoot = process.cwd();

  folders.forEach((folder) => {
    const folderPath = path.join(projectRoot, folder);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Created folder: ${folderPath}`);
    }
  });
}

createFoldersIfNotExist(foldersToCreate);
