import { Customer } from "./customer.model";

export type CustomerEmailDomain = {
  email_domain: string;
  customer_id: Customer["id"];
};
