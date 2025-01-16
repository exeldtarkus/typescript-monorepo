// import {Response, NextFunction} from 'express';
// import {ErrorResourceModel} from '../../models/resource_models/ErrorResourceModel';
// import {logger} from '../../utils/log_util';
// import {IMainRequest} from '../requests/main_request';

// function handleError(
//   err: TypeError | ErrorResourceModel,
//   req: IMainRequest,
//   res: Response,
//   // eslint-disable-next-line
//   next: NextFunction
// ) {
//   let customError = err;

//   logger.error(
//     req.logTemplate ? req.logTemplate : '',
//     '[handle-error]',
//     JSON.stringify(err)
//   );

//   if (!(err instanceof ErrorResourceModel)) {
//     customError = new ErrorResourceModel('Internal server error!', 500);
//   }

//   return res
//     .status((customError as ErrorResourceModel).status)
//     .send(customError);
// }

// export default handleError;
