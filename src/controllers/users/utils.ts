import { QueryBuilder } from "../../db";
import { Customer, CustomerEmailDomain } from "../../models";

const getEmailDomain = (email: string): string => {
  const atIndex = email.indexOf("@");
  return email.substring(atIndex + 1);
};

export const getCustomerIdByEmail = async (
  email: string
): Promise<Customer["id"]> => {
  const emailDomain = getEmailDomain(email);

  const rows: Array<Pick<CustomerEmailDomain, "customer_id">> =
    await new QueryBuilder()
      .select("customer_id")
      .from("customer_email_domain")
      .where({ email_domain: emailDomain })
      .execute();

  return rows[0].customer_id;
};
