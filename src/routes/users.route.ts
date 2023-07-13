import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { usersController } from "../controllers";
import { getUserDataFromCookie } from "../utils";

const router = express.Router();

router.get("/me", async (req: Request, res: Response) => {
  const { id } = getUserDataFromCookie(req)!;

  try {
    const userData = await usersController.getUser({ id });
    res.json({ userData });
  } catch (e) {
    console.error(e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (e as Error).message });
  }
});

export default router;
