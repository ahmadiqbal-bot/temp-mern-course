
import { StatusCodes } from 'http-status-codes';

export class NotFounderror extends Error {
    constructor(message){

    super(message)
        this.name= "NotFounderror",
        this.StatusCodes= StatusCodes.NOT_FOUND;
    }
}
export class UnauthenticatedError extends Error {
    constructor(message) {
      super(message);
      this.name = 'UnauthenticatedError';
      this.statusCode = StatusCodes.UNAUTHORIZED;
    }
  }
  export class UnauthorizedError extends Error {
    constructor(message) {
      super(message);
      this.name = 'UnauthorizedError';
      this.statusCode = StatusCodes.FORBIDDEN;
    }
  }
  export class Badrequest extends Error {
    constructor(message) {
      super(message);
      this.name = 'Badrequest';
      this.statusCode = StatusCodes.BAD_REQUEST;
    }
  }
