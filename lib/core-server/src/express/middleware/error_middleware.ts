/* eslint-disable @typescript-eslint/no-explicit-any */
import {Response, NextFunction} from 'express';
import {ErrorResponseModel} from '../../types/IErrorResponseModels';
import logger from '@lib/core-logger';
import {IMainRequest} from '../../types/IMainRequestModels';

const handleError: any = (
  err: TypeError | ErrorResponseModel,
  req: IMainRequest,
  res: Response,
  // eslint-disable-next-line
  next: NextFunction
) => {
  let customError = err;

  logger.error(
    req.logTemplate ? req.logTemplate : '',
    '[handle-error]',
    JSON.stringify(err),
  );

  if (!(err instanceof ErrorResponseModel)) {
    customError = new ErrorResponseModel('Internal server error!', 500);
  }

  return res
    .status((customError as ErrorResponseModel).status)
    .send(customError);
};

export default handleError;
