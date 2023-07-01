import { dbClient } from "./client";

type WriteOptions = {
  tableName: string;
  data: Record<string, unknown> | Array<Record<string, unknown>>;
  returningColumns?: string[];
};

type UpsertOptions = WriteOptions & {
  conflictingColumnNames: string[];
};

// ToDo - add support to transactions
export class QueryBuilder {
  private query = dbClient.queryBuilder();

  select(...columnNames: string[]): this {
    this.query.select(columnNames);
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

  where(clause: Record<string, unknown>): this {
    this.query.where(clause);
    return this;
  }

  async execute() {
    return this.query.then((rows) => rows);
  }
}
