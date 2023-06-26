import { RequestHandler } from "express-serve-static-core";
import { SESSION_COOKIE_NAME } from "../utils";

const NON_AUTH_URLS = ["/users/signup", "/users/login"];

export const reqAuth: RequestHandler = (req, res, next) => {
  if (NON_AUTH_URLS.includes(req.url)) {
    next();
  }
  const { cookies } = req;
  const sessionCookie = cookies[SESSION_COOKIE_NAME];
  next();
};
