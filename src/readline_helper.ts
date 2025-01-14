/* eslint-disable no-process-exit */
import rl from './readline_config';

const close = (message?: string) => {
  rl.on('close', () => {
    console.log(
      message ? message + '\nExiting Process...' : '\nExiting Process...',
    );
    process.exit();
  });
  return rl.close();
};

const question = (q: string): Promise<any> => {
  return new Promise(resolve => {
    rl.question(q, userInput => {
      resolve(userInput);
    });
  });
};

const createBlinkingText = (text: string): string => {
  const blinkOn = '\x1b[5m';
  const blinkOff = '\x1b[25m';

  return `${blinkOn}${text}${blinkOff}`;
};

export {question, close, createBlinkingText};
