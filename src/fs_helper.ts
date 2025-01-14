/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable n/no-process-exit */
import * as fs from 'fs';
import * as path from 'path';

/**
 * Get a list of folder names in a directory.
 * @param dirPath - The path to the directory.
 * @returns - An array of folder names.
 */
const getFolderNames = (dirPath: string): string[] => {
  if (!fs.existsSync(dirPath)) {
    console.error(`Directory not found: ${dirPath}`);
    return [];
  }

  // Read the contents of the directory
  const items = fs.readdirSync(dirPath);

  // Filter and return only directories
  const folders = items.filter(item => {
    const itemPath = path.join(dirPath, item);
    return fs.statSync(itemPath).isDirectory();
  });

  return folders;
};

/**
 * Copies a TypeScript file from the source to the destination.
 * @param srcPath - The path to the source TypeScript file.
 * @param destDir - The directory where the file will be copied.
 * @param destFileName - The name of the destination TypeScript file.
 */
const copyFile = (
  srcPath: string,
  destDir: string,
  destFileName: string,
): void => {
  if (!fs.existsSync(srcPath)) {
    console.error(`Source file not found: ${srcPath}`);
    process.exit(1);
  }

  // Ensure the destination directory exists
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, {recursive: true});
    console.log(`Created directory: ${destDir}`);
  }

  const destPath = path.join(destDir, destFileName);

  // Read the file and write it to the destination
  const data = fs.readFileSync(srcPath);
  fs.writeFileSync(destPath, data);
  console.log(`File copied from ${srcPath} to ${destPath}`);
};

/**
 * Recursively copies a folder and its contents to a new location and renames the folder.
 * @param srcFolder - The path to the source folder.
 * @param destFolder - The path to the destination folder (with the new name).
 */
const copyFolder = (srcFolder: string, destFolder: string): string => {
  const logTemplate = '[Copy Folder]';

  if (!fs.existsSync(srcFolder)) {
    console.error(`${logTemplate} - Source folder not found: ${srcFolder}`);
    process.exit(1);
  }

  // Ensure the destination folder exists
  if (!fs.existsSync(destFolder)) {
    fs.mkdirSync(destFolder, {recursive: true});
    console.log(`${logTemplate} - Created destination folder: ${destFolder}`);
  }

  // Copy contents of the folder
  const items = fs.readdirSync(srcFolder);

  console.log(`${logTemplate} - Copy data to ${destFolder}...`);

  for (const item of items) {
    const srcPath = path.join(srcFolder, item);
    const destPath = path.join(destFolder, item);

    if (fs.statSync(srcPath).isDirectory()) {
      // Recursively copy subfolders
      copyFolder(srcPath, destPath);
    } else {
      // Read and write file manually for compatibility
      const data = fs.readFileSync(srcPath);
      fs.writeFileSync(destPath, data);
      console.log(`${logTemplate} - Copied file: ${srcPath} -> ${destPath}`);
    }
  }
  return destFolder;
};

const modifyJson = (
  pathJson: string,
  changes: Record<string, any>,
  jsonName: string,
) => {
  const logTemplate = '[Modify Json]';

  const jsonPath = path.join(pathJson, jsonName);

  console.log(`${logTemplate} - file change json ${changes}`);

  // Check if package.json exists
  if (!fs.existsSync(jsonPath)) {
    console.error(
      `${logTemplate} - Error: package.json not found in the current directory.`,
    );
    process.exit(1);
  }

  // Read the existing package.json
  const jsonContent = fs.readFileSync(jsonPath, 'utf8');
  const dataJson = JSON.parse(jsonContent);

  // Apply changes to the package.json object
  Object.assign(dataJson, changes);

  console.log(`${logTemplate} - result json ${dataJson}`);

  // Write the updated package.json back to the file
  fs.writeFileSync(jsonPath, JSON.stringify(dataJson, null, 2), 'utf8');
  console.log(`${logTemplate} - package.json updated successfully!`);
};

export {copyFile, copyFolder, modifyJson, getFolderNames};
