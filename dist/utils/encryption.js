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
exports.isEncryptedEqual = exports.encrypt = void 0;
const bcrypt_1 = require("bcrypt");
const SALT_ROUNDS = 10;
const encrypt = (plainText) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield (0, bcrypt_1.genSalt)(SALT_ROUNDS);
    return (0, bcrypt_1.hash)(plainText, salt);
});
exports.encrypt = encrypt;
const isEncryptedEqual = (plainText, encryptedText) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, bcrypt_1.compare)(plainText, encryptedText);
});
exports.isEncryptedEqual = isEncryptedEqual;
//# sourceMappingURL=encryption.js.map