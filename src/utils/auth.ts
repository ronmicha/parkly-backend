import { Request, Response } from "express";
import { CookieOptions } from "express-serve-static-core";
import { DB_User } from "../models";

const SESSION_COOKIE_NAME = "session";
const SESSION_COOKIE_AGE = 7 * 24 * 60 * 60; // a week in seconds
const SESSION_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: SESSION_COOKIE_AGE,
};

export const setSessionCookie = (res: Response, user: DB_User): Response => {
  const value = { id: user.id, role: "" }; // ToDo
  res.cookie(SESSION_COOKIE_NAME, value, SESSION_COOKIE_OPTIONS);
  return res;
};

export const getUserId = (req: Request): DB_User["id"] => {
  return req.cookies[SESSION_COOKIE_NAME];
};
