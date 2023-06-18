import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { usersController } from "../controllers";
import { setSessionCookie } from "../utils";

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

type CreateUserPayload = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  vehicleIds: string[];
  activeVehicleId: string;
};

router.post("/create", async (req: Request, res: Response) => {
  // ToDo: validate that all relevant fields exist in req.body

  try {
    const userData = await usersController.upsertUser(
      req.body as CreateUserPayload
    );
    setSessionCookie(res, userData).json({ userData });
  } catch (e) {
    console.error(e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (e as Error).message });
  }
});

export default router;
