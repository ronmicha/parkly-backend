export class UserDoesntExist extends Error {
  constructor(options: Record<string, string>) {
    super(`User with ${JSON.stringify(options)} doesn't exist`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InvalidLogin extends Error {
  constructor(options: Record<string, string>) {
    super(`User with ${JSON.stringify(options)} failed to login`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
