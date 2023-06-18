import { QueryBuilder } from "../../db";
import { Customer } from "../../models";

const CUSTOMER_EMAIL_DOMAIN: Record<string, string> = {
  "viz.ai": "Viz.ai",
};

const getEmailDomain = (email: string): string => {
  const atIndex = email.indexOf("@");
  return email.substring(atIndex + 1);
};

const getCustomerName = (emailDomain: string): string => {
  return CUSTOMER_EMAIL_DOMAIN[emailDomain];
};

export const getCustomerIdByEmail = async (
  email: string
): Promise<Customer["id"]> => {
  const emailDomain = getEmailDomain(email);
  const customerName = getCustomerName(emailDomain);

  if (!customerName) {
    throw new Error(`Email '${email}' is not associated to any customer`);
  }

  const rows: Array<Pick<Customer, "id">> = await new QueryBuilder()
    .select("id")
    .from("customers")
    .where({ name: customerName })
    .execute();

  return rows[0].id;
};
