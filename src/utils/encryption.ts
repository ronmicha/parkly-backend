import { compare, genSalt, hash } from "bcrypt";

const SALT_ROUNDS = 10;

export const encrypt = async (plainText: string): Promise<string> => {
  const salt = await genSalt(SALT_ROUNDS);
  return hash(plainText, salt);
};

export const isEncryptedEqual = async (
  plainText: string,
  encryptedText: string
): Promise<boolean> => {
  return compare(plainText, encryptedText);
};
