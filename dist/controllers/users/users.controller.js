"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.getUser = void 0;
const db_1 = require("../../db");
const utils_1 = require("../../utils");
const errors_1 = require("./errors");
const tableName = "users";
const getUser = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const rows = yield new db_1.QueryBuilder()
        .select("*")
        .from(tableName)
        .where(options)
        .execute();
    return rows[0];
});
exports.getUser = getUser;
const validateLogin = (phoneNumber, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield (0, exports.getUser)({
        phone_number: phoneNumber,
    });
    if (!userData) {
        throw new errors_1.UserDoesntExist({ phoneNumber });
    }
    const isCorrectPassword = yield (0, utils_1.isEncryptedEqual)(password, userData.password);
    if (!isCorrectPassword) {
        throw new errors_1.InvalidLogin({ phoneNumber });
    }
    return userData;
});
exports.validateLogin = validateLogin;
//# sourceMappingURL=users.controller.js.map