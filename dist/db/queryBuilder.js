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
exports.QueryBuilder = void 0;
const client_1 = require("./client");
class QueryBuilder {
    constructor(trx) {
        this.query = client_1.dbClient.queryBuilder();
        this.trx = trx;
    }
    static transaction(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.dbClient.transaction(callback);
        });
    }
    static raw(query) {
        return client_1.dbClient.raw(query);
    }
    select(...columnNames) {
        this.query.select(columnNames);
        return this;
    }
    insert({ tableName, data, returningColumns }) {
        this.query
            .table(tableName)
            .insert(data)
            .returning(returningColumns || ["*"]);
        return this;
    }
    update({ tableName, data, returningColumns }) {
        this.query
            .table(tableName)
            .update(data)
            .returning(returningColumns || ["*"]);
        return this;
    }
    upsert({ tableName, data, conflictingColumnNames, returningColumns, }) {
        this.query
            .table(tableName)
            .insert(data)
            .onConflict(conflictingColumnNames)
            .merge()
            .returning(returningColumns || ["*"]);
        return this;
    }
    delete() {
        this.query.del();
        return this;
    }
    from(tableName) {
        this.query.from(tableName);
        return this;
    }
    innerJoin(tableName, firstColumn, secondColumn) {
        this.query.innerJoin(tableName, firstColumn, secondColumn);
        return this;
    }
    leftJoin(tableName, firstColumn, secondColumn) {
        this.query.leftJoin(tableName, firstColumn, secondColumn);
        return this;
    }
    where(clause) {
        this.query.where(clause);
        return this;
    }
    whereIn(columnName, values) {
        this.query.whereIn(columnName, values);
        return this;
    }
    groupBy(...columnNames) {
        this.query.groupBy(columnNames);
        return this;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.trx) {
                return this.query.transacting(this.trx);
            }
            return this.query.then((rows) => rows);
        });
    }
}
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=queryBuilder.js.map