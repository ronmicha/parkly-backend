export const getEmailDomain = (email: string): string => {
  const atIndex = email.indexOf("@");
  return email.substring(atIndex + 1);
};
