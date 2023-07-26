"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidLogin = exports.UserDoesntExist = void 0;
class UserDoesntExist extends Error {
    constructor(options) {
        super(`User with ${JSON.stringify(options)} doesn't exist`);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.UserDoesntExist = UserDoesntExist;
class InvalidLogin extends Error {
    constructor(options) {
        super(`User with ${JSON.stringify(options)} failed to login`);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.InvalidLogin = InvalidLogin;
//# sourceMappingURL=errors.js.map