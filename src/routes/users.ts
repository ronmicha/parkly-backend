import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { usersController } from "../controllers";
import { setSessionCookie } from "../utils";
import { User } from "../models";

const router = express.Router();

router.get("/user", async (req: Request, res: Response) => {
  const userId = req.header("User-Id") as string;

  if (!userId) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "'User-Id' header is missing" });
    return;
  }

  try {
    const userData = await usersController.getUser(userId);
    res.json({ userData });
  } catch (e) {
    console.error(e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (e as Error).message });
  }
});

router.post("/signup", async (req: Request, res: Response) => {
  // ToDo: validate that all relevant fields exist in req.body

  try {
    const userData = await usersController.upsertUser(req.body as User);
    setSessionCookie(res, userData).json({ userData });
  } catch (e) {
    console.error(e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (e as Error).message });
  }
});

export default router;
