import { dbClient } from "./client";
import { TQueryBuilder, Transaction } from "./types";

type TrxCallback = (trx: Transaction) => Promise<any>;

type WriteOptions = {
  tableName: string;
  data: Record<string, unknown> | Array<Record<string, unknown>>;
  returningColumns?: string[];
};

type UpsertOptions = WriteOptions & {
  conflictingColumnNames: string[];
};

export class QueryBuilder {
  private readonly query: TQueryBuilder;
  private readonly trx?: Transaction;

  constructor(trx?: Transaction) {
    this.query = dbClient.queryBuilder();
    this.trx = trx;
  }

  static async transaction<T>(callback: TrxCallback): Promise<T> {
    return await dbClient.transaction<T>(callback);
  }

  static raw(query: string) {
    return dbClient.raw(query);
  }

  select(...columnNames: (string | unknown)[]): this {
    this.query.select(columnNames);
    return this;
  }

  insert({ tableName, data, returningColumns }: WriteOptions): this {
    this.query
      .table(tableName)
      .insert(data)
      .returning(returningColumns || ["*"]);
    return this;
  }

  update({ tableName, data, returningColumns }: WriteOptions): this {
    this.query
      .table(tableName)
      .update(data)
      .returning(returningColumns || ["*"]);
    return this;
  }

  upsert({
    tableName,
    data,
    conflictingColumnNames,
    returningColumns,
  }: UpsertOptions): this {
    this.query
      .table(tableName)
      .insert(data)
      .onConflict(conflictingColumnNames)
      .merge()
      .returning(returningColumns || ["*"]);
    return this;
  }

  delete(): this {
    this.query.del();
    return this;
  }

  from(tableName: string): this {
    this.query.from(tableName);
    return this;
  }

  innerJoin(
    tableName: string,
    firstColumn: string,
    secondColumn: string
  ): this {
    this.query.innerJoin(tableName, firstColumn, secondColumn);
    return this;
  }

  leftJoin(tableName: string, firstColumn: string, secondColumn: string): this {
    this.query.leftJoin(tableName, firstColumn, secondColumn);
    return this;
  }

  where(clause: Record<string, unknown>): this {
    this.query.where(clause);
    return this;
  }

  groupBy(...columnNames: string[]) {
    this.query.groupBy(columnNames);
    return this;
  }

  async execute<T>() {
    if (this.trx) {
      return this.query.transacting(this.trx);
    }
    return this.query.then<T>((rows) => rows);
  }
}
