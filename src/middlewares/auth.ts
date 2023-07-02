import { RequestHandler } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";
import { getUserDataFromCookie } from "../utils";

const NON_AUTH_URLS = ["/users/login"];

export const basicAuth: RequestHandler = (req, res, next) => {
  if (NON_AUTH_URLS.includes(req.url)) {
    next();
    return;
  }

  const userData = getUserDataFromCookie(req);
  const userId = userData?.id;

  if (!userId) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    return;
  }

  next();
};

export const adminAuth: RequestHandler = (req, res, next) => {
  const userData = getUserDataFromCookie(req);
  const userRole = userData?.role;

  if (userRole !== "admin") {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized to perform admin actions" });
    return;
  }

  next();
};
