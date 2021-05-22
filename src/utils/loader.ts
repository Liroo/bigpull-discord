import { readdirSync } from 'fs';

export const getFilesSync = (path: string): string[] => {
  const entries = readdirSync(path, { withFileTypes: true });

  const files = entries
    .filter(file => !file.isDirectory())
    .map(file => (path + file.name));

  const folders = entries.filter(folder => folder.isDirectory());

  for (const folder of folders)
    files.push(...getFilesSync(`${path}${folder.name}/`));

  return files;
};