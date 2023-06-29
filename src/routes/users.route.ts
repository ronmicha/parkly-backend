import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { usersController } from "../controllers";
import { getUserId, setSessionCookie } from "../utils";
import { User } from "../models";

const router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
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

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: "email or password parameters are missing",
    });
    return;
  }
});

router.get("/user", async (req: Request, res: Response) => {
  const userId = getUserId(req);

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

export default router;
