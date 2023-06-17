import { Response } from "express";
import { User } from "../models";

const SESSION_COOKIE_NAME = "session";
const SESSION_COOKIE_AGE = 7 * 24 * 60 * 60; // a week in seconds

export const setSessionCookie = (res: Response, userData: User): Response => {
  res.cookie(SESSION_COOKIE_NAME, userData, {
    httpOnly: true,
    secure: true,
    maxAge: SESSION_COOKIE_AGE,
  });
  return res;
};
