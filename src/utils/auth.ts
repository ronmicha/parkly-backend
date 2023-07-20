import { Request, Response } from "express";
import { CookieOptions } from "express-serve-static-core";
import { DB_User } from "../models";

type AuthCookieValue = Pick<DB_User, "id" | "role">;

const AUTH_COOKIE_NAME = "auth";
const AUTH_COOKIE_AGE = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds
const AUTH_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: true,
  signed: true,
  sameSite: "none",
  maxAge: AUTH_COOKIE_AGE,
};

export const setAuthCookie = (res: Response, user: DB_User): Response => {
  const value: AuthCookieValue = {
    id: user.id,
    role: user.role,
  };
  return res.cookie(AUTH_COOKIE_NAME, value, AUTH_COOKIE_OPTIONS);
};

export const getUserDataFromCookie = (
  req: Request
): AuthCookieValue | undefined => {
  return req.signedCookies[AUTH_COOKIE_NAME];
};
