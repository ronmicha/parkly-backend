import express, { Express } from "express";
import * as crypto from "crypto";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import { adminAuth, basicAuth, logging } from "./middlewares";
import generalRouter from "./routes/general.route";
import parkingAreasRouter from "./routes/parkingAreas.route";
import parkingSlotsRouter from "./routes/parkingSlots.route";
import usersRouter from "./routes/users.route";
import adminRouter from "./routes/admin";

const app: Express = express();
const { PORT } = process.env;
const secret = crypto.randomBytes(20).toString("hex");

app.use(compression());
app.use(logging());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser(secret));

app.use("/", generalRouter);

app.use(basicAuth());
app.use("/parking-areas", parkingAreasRouter);
app.use("/parking-slots", parkingSlotsRouter);
app.use("/users", usersRouter);

app.use(adminAuth());
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`⚡️ Server is running at http://localhost:${PORT}`);
});
