import {copyFolder, getFolderNames, modifyJson} from './fs_helper';
import {question, close} from './readline_helper';

let alreadyRunAgain = false;

const runningAgain = async () => {
  const runAgain = await question('\nRunning Again ? [y/N]: ');

  if (['Y', 'y', 'YES', 'Yes', 'yes'].includes(runAgain)) {
    alreadyRunAgain = true;
    return main();
  }

  if (['N', 'n', 'NO', 'No', 'no'].includes(runAgain)) {
    return close('Bye...');
  }

  await runningAgain();
};

const main = async () => {
  // await runningAgain();

  await question('Migrate Consul - [Press Any Key to Continue] ...');

  const questionOptions = `
  What would you like to create ?
  1. Library
  2. Service
  Please select your choice: `;

  const optionsKey = await question(questionOptions);

  if (isNaN(optionsKey)) {
    console.log('Key Not Interger');
    await runningAgain();
  }

  switch (Number(optionsKey)) {
    case 1: {
      const libName = await question('[Library] - Enter Name :');
      const folderPath = copyFolder('./src/example-file', `./lib/${libName}`);

      modifyJson(
        folderPath,
        {
          name: `@lib/${libName}`,
        },
        'package.json',
      );

      await runningAgain();
      break;
    }

    case 2: {
      const serviceName = await question('[Service] - Enter Name :');

      const folderPath = copyFolder(
        './src/example-file',
        `./services/${serviceName}`,
      );

      modifyJson(
        folderPath,
        {
          name: `@services/${serviceName}`,
        },
        'package.json',
      );

      const listLibrary = getFolderNames('./lib');

      const mapReferencesLib = listLibrary.map(item => {
        return {path: `../../${item}`};
      });

      modifyJson(
        folderPath,
        {
          references: mapReferencesLib,
        },
        'tsconfig.json',
      );

      await runningAgain();
      break;
    }

    default:
      console.log('Key Not Match');
      await runningAgain();
      break;
  }

  return false;
};

main().catch(err => console.error('Error: ', err));
