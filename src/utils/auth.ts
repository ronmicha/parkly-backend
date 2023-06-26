import { Response } from "express";
import { DB_User } from "../models";

export const SESSION_COOKIE_NAME = "session";
const SESSION_COOKIE_AGE = 7 * 24 * 60 * 60; // a week in seconds

export const setSessionCookie = (res: Response, user: DB_User): Response => {
  res.cookie(SESSION_COOKIE_NAME, user, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: SESSION_COOKIE_AGE,
  });
  return res;
};
