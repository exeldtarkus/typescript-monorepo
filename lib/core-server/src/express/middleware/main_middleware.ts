import {Response, NextFunction} from 'express';

import {IMainRequest} from '../../types/IMainRequestModels';
import {v4 as uuidv4} from 'uuid';
import {time_utils} from '@lib/core-config';

const mainMiddleware = async (
  req: IMainRequest,
  res: Response,
  next: NextFunction,
) => {
  req.uuid = uuidv4();
  req.datetime = time_utils.now().add(7, 'hours');
  req.datetimeUtc = time_utils.now();
  return next();
};

export default mainMiddleware;
