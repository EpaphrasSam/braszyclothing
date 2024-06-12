export class CustomError extends Error {
  public statusCode: number;
  public clientMessage: string;

  constructor(clientMessage: string, statusCode: number = 500) {
    super(clientMessage);
    this.statusCode = statusCode;
    this.clientMessage = clientMessage;
  }
}
