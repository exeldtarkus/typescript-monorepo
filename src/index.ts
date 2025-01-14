import {question} from './readline_helper';

let alreadyRunAgain = false;

const runningAgain = async () => {
  const runAgain = await question('\nRunning Again ? [y/N]: ');

  if (['Y', 'y', 'YES', 'Yes', 'yes'].includes(runAgain)) {
    alreadyRunAgain = true;
    return main();
  }

  if (['N', 'n', 'NO', 'No', 'no'].includes(runAgain)) {
    // return close('Bye...');
    return '';
  }

  await runningAgain();
  return '';
};

const main = async () => {
  // await runningAgain();

  await question('Migrate Consul - [Press Any Key to Continue] ...');

  const questionOptions = `
  What would you like to create?  
  1. Library
  2. Service
  Please select your choice: 
  `;

  const optionsKey = await question(questionOptions);

  if (isNaN(optionsKey)) {
    console.log('Key Not Interger');
    await runningAgain();
  }

  return false;
};

main().catch(err => console.error('Error: ', err));
