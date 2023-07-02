import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { adminController } from "../controllers";

const router = express.Router();

router.get("/users", async (req: Request, res: Response) => {
  const customerId = req.query.customerId as string;

  try {
    const users = await adminController.getCustomerUsers(customerId);
    res.json({ users });
  } catch (e) {
    console.error(e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (e as Error).message });
  }
});

router.post("/create-user", async (req: Request, res: Response) => {
  // ToDo: validate that all relevant fields exist in req.body

  try {
    const userData = await adminController.createUser(req.body);
    res.json({ userData });
  } catch (e) {
    console.error(e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (e as Error).message });
  }
});

export default router;