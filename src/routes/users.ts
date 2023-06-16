import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getUser } from "../controllers/users.controller";

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
    const userData = getUser(userId);
    res.json({ userData });
  } catch (e) {
    console.error(e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (e as Error).message });
  }
});

type UpsertUserPayload = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  vehicleIds: string[];
};

router.post("/upsert", async (req: Request, res: Response) => {
  const { firstName, lastName, phoneNumber, email, password, vehicleIds } =
    req.body as UpsertUserPayload;

  // ToDo: validate that all fields exist
});

export default router;
