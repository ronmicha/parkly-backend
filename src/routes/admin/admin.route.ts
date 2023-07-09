import express from "express";
import adminUsersRouter from "./admin.users.route";
import adminParkingSlotsRouter from "./admin.parkingSlots.route";

const router = express.Router();

router.use("/users", adminUsersRouter);
router.use("/parking-slots", adminParkingSlotsRouter);

export default router;
