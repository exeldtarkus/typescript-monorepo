/* eslint-disable n/no-extraneous-import */
/* eslint-disable no-console */
import {Response, NextFunction} from 'express';

import {v4 as uuidv4} from 'uuid';
import {URL} from 'url';
import chalk from 'chalk';
import {IMainRequest} from '../../types/IMainRequestModels';

const loggerMiddleware = async (
  req: IMainRequest,
  res: Response,
  next: NextFunction,
) => {
  const method = req.method;
  const url = req.url;

  const host =
    (req.headers as unknown as Record<string, string>).host ?? 'localhost';
  const parsedUrl = new URL(url, `http://${host}`);
  const pathWithoutParams = parsedUrl.pathname;

  req.logTemplate = `[${method}:${pathWithoutParams}] - [${uuidv4()}]`;

  console.time(
    `${chalk.green('[INFO]    | ')} ${req.logTemplate} - ${chalk.red(
      '[execution time] ',
    )}`,
  );

  res.on('finish', () => {
    console.timeEnd(
      `${chalk.green('[INFO]    | ')} ${req.logTemplate} - ${chalk.red(
        '[execution time] ',
      )}`,
    );
  });
  return next();
};

export default loggerMiddleware;
