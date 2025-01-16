import {Request} from 'express';
import moment from 'moment';

interface IMainRequest extends Request {
  userId?: number;
  credId?: number;
  email?: string;
  bengkelId?: number;
  token?: string;
  userName?: string;
  uuid?: string;
  datetime?: moment.Moment;
  datetimeUtc?: moment.Moment;
  logTemplate?: string;
  sub?: number;
}

export {IMainRequest};
