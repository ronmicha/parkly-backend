import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InvalidLogin, UserDoesntExist, usersController } from "../controllers";
import { getUserId, setSessionCookie } from "../utils";
import { User } from "../models";
import { validateLogin } from "../controllers/users/users.controller";

const router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  // ToDo: validate that all relevant fields exist in req.body

  try {
    const userData = await usersController.upsertUser(req.body as User);
    res.json({ userData });
  } catch (e) {
    console.error(e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (e as Error).message });
  }
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
    const userData = await validateLogin(phoneNumber, password);
    setSessionCookie(res, userData).sendStatus(StatusCodes.OK);
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

router.get("/user", async (req: Request, res: Response) => {
  const userId = getUserId(req);

  try {
    const userData = await usersController.getUser({ id: userId });
    res.json({ userData });
  } catch (e) {
    console.error(e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (e as Error).message });
  }
});

export default router;