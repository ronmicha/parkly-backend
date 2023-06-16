import { dbClient } from "./client";

type OrderByClause = {
  column: string;
  order?: "asc" | "desc";
  nulls?: "first" | "last";
};

export class QueryBuilder {
  private query = dbClient.queryBuilder();

  select(...columnNames: string[]): this {
    this.query.select(columnNames);
    return this;
  }

  update(tableName: string, data: Record<string, unknown>): this {
    this.query.table(tableName).update(data);
    return this;
  }

  upsert(tableName: string, data: Record<string, unknown>): this {
    this.query.table(tableName).insert(data).onConflict().merge();
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

  orderBy(...clauses: OrderByClause[]): this {
    this.query.orderBy(clauses);
    return this;
  }

  async execute() {
    return this.query.then((rows) => rows);
  }
}
