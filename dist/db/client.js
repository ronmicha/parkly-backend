"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbClient = void 0;
const knex_1 = __importDefault(require("knex"));
const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;
exports.dbClient = (0, knex_1.default)({
    client: "pg",
    connection: {
        user: PGUSER,
        password: PGPASSWORD,
        host: PGHOST,
        database: PGDATABASE,
    },
});
//# sourceMappingURL=client.js.map