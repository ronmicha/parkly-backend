import { RequestHandler } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";
import { getUserId } from "../utils";

const NON_AUTH_URLS = ["/users/signup", "/users/login"];

export const reqAuth: RequestHandler = (req, res, next) => {
  if (NON_AUTH_URLS.includes(req.url)) {
    next();
    return;
  }

  const userId = getUserId(req);
  if (!userId) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    return;
  }

  next();
};
