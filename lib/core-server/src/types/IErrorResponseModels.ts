/* eslint-disable @typescript-eslint/no-explicit-any */
export class ErrorResponseModel {
  message!: string;
  status!: number;
  error!: any;

  constructor(message: string, status = 500, error: any = {}) {
    this.message = message;
    this.status = status;
    this.error = error;
  }
}
