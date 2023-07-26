"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgErrorCodes = exports.DatabaseError = void 0;
var pg_1 = require("pg");
Object.defineProperty(exports, "DatabaseError", { enumerable: true, get: function () { return pg_1.DatabaseError; } });
var PgErrorCodes;
(function (PgErrorCodes) {
    PgErrorCodes["UNIQUE_VIOLATION"] = "23505";
})(PgErrorCodes || (exports.PgErrorCodes = PgErrorCodes = {}));
//# sourceMappingURL=errors.js.map