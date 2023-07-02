import { Request, Response } from "express";
import { CookieOptions } from "express-serve-static-core";
import { DB_User } from "../models";

type SessionCookieValue = Pick<DB_User, "id" | "role">;

const SESSION_COOKIE_NAME = "session";
const SESSION_COOKIE_AGE = 365 * 24 * 60 * 60; // 1 year in seconds
const SESSION_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: SESSION_COOKIE_AGE,
};

export const setSessionCookie = (res: Response, user: DB_User): Response => {
  const value: SessionCookieValue = {
    id: user.id,
    role: user.role,
  };
  return res.cookie(SESSION_COOKIE_NAME, value, SESSION_COOKIE_OPTIONS);
};

export const getUserDataFromCookie = (
  req: Request
): SessionCookieValue | undefined => {
  return req.cookies[SESSION_COOKIE_NAME];
};
