import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { reqAuth } from "./middlewares";
import generalRouter from "./routes/general.route";
import parkingAreasRouter from "./routes/parkingAreas.route";
import parkingSlotsRouter from "./routes/parkingSlots.route";
import usersRouter from "./routes/users.route";

dotenv.config();

const app: Express = express();
const { PORT } = process.env;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use(reqAuth);

app.use("/", generalRouter);
app.use("/parking-areas", parkingAreasRouter);
app.use("/parking-slots", parkingSlotsRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`⚡️ Server is running at http://localhost:${PORT}`);
});
