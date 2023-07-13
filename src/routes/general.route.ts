import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { setAuthCookie } from "../utils";
import { InvalidLogin, UserDoesntExist, usersController } from "../controllers";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ status: "OK" });
});

router.post("/login", async (req: Request, res: Response) => {
  const { phoneNumber, password } = req.body;

  if (!(phoneNumber && password)) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: "Phone number or password parameters are missing",
    });
    return;
  }

  try {
    const userData = await usersController.validateLogin(phoneNumber, password);
    setAuthCookie(res, userData).json({ userData });
  } catch (e) {
    console.error(e);

    if (e instanceof UserDoesntExist || e instanceof InvalidLogin) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Phone number or password are incorrect" });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: (e as Error).message });
    }
  }
});

export default router;
