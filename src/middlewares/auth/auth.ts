import { RequestHandler } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";
import { getUserDataFromCookie } from "../../utils";

const basicAuthHandler: RequestHandler = (req, res, next) => {
  const userData = getUserDataFromCookie(req);

  if (!userData) {
    console.error("Auth cookie doesn't exist");
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Unauthorized to perform this action. Please login first",
    });
    return;
  }

  next();
};

const adminAuthHandler: RequestHandler = (req, res, next) => {
  const userData = getUserDataFromCookie(req);
  const userRole = userData?.role;

  if (userRole !== "admin") {
    console.error("User has no admin role", { userId: userData?.id, userRole });
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized to perform admin actions" });
    return;
  }

  next();
};

export const basicAuth = () => basicAuthHandler;
export const adminAuth = () => adminAuthHandler;
