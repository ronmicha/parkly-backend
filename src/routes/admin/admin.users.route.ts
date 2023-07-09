import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { adminController } from "../../controllers";
import { User } from "../../models";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const customerId = req.query.customerId as string;

  if (!customerId) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Parameter 'customerId' is missing" });
    return;
  }

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

router.post("/create", async (req: Request, res: Response) => {
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

router.post("/update", async (req: Request, res: Response) => {
  // ToDo: validate that all relevant fields exist in req.body

  try {
    const userData = await adminController.updateUser(req.body);
    res.json({ userData });
  } catch (e) {
    console.error(e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (e as Error).message });
  }
});

router.post("/delete", async (req: Request, res: Response) => {
  const userIds = req.body.userIds as Array<User["id"]>;

  if (!userIds) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Parameter 'userIds' is missing" });
    return;
  }

  try {
    await adminController.deleteUsers(userIds);
    res.sendStatus(StatusCodes.OK);
  } catch (e) {
    console.error(e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (e as Error).message });
  }
});

export default router;
