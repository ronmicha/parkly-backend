import { DB_Customer } from "./customer.model";

export type DB_CustomerEmailDomain = {
  email_domain: string;
  customer_id: DB_Customer["id"];
};
