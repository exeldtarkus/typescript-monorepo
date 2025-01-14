import * as fs from 'fs';
import * as path from 'path';

/**
 * Copies a TypeScript file from the source to the destination.
 * @param srcPath - The path to the source TypeScript file.
 * @param destDir - The directory where the file will be copied.
 * @param destFileName - The name of the destination TypeScript file.
 */
const copyTsFile = (
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

  // Copy the file
  fs.copyFileSync(srcPath, destPath);
  console.log(`File copied from ${srcPath} to ${destPath}`);
};

/**
 * Recursively copies a folder and its contents to a new location and renames the folder.
 * @param srcFolder - The path to the source folder.
 * @param destFolder - The path to the destination folder (with the new name).
 */
const copyFolder = (srcFolder: string, destFolder: string): void => {
  if (!fs.existsSync(srcFolder)) {
    console.error(`Source folder not found: ${srcFolder}`);
    process.exit(1);
  }

  // Ensure the destination folder exists
  if (!fs.existsSync(destFolder)) {
    fs.mkdirSync(destFolder, { recursive: true });
    console.log(`Created destination folder: ${destFolder}`);
  }

  // Copy contents of the folder
  const items = fs.readdirSync(srcFolder);
  for (const item of items) {
    const srcPath = path.join(srcFolder, item);
    const destPath = path.join(destFolder, item);

    if (fs.statSync(srcPath).isDirectory()) {
      // Recursively copy subfolders
      copyFolder(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied file: ${srcPath} -> ${destPath}`);
    }
  }
};

export {copyTsFile, copyFolder};

// Example usage
// const srcFilePath = path.join(__dirname, 'src', 'example.ts'); // Source TypeScript file
// const destDir = path.join(__dirname, 'dest'); // Destination directory
// const destFileName = 'example-copy.ts'; // Name of the copied file

// copyTsFile(srcFilePath, destDir, destFileName);
