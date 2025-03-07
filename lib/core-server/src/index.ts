import app from './express/app';
import {Express, Request, Response, NextFunction} from 'express';
import {ErrorResponseModel} from './types/IErrorResponseModels';
import {IMainRequest} from './types/IMainRequestModels';

export default app;
export {
  ErrorResponseModel,
  IMainRequest,
  Request,
  Response,
  NextFunction,
  Express,
};
