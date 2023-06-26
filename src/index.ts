import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import generalRouter from "./routes/general";
import parkingAreasRouter from "./routes/parkingAreas";
import parkingSlotsRouter from "./routes/parkingSlots";
import usersRouter from "./routes/users";
import { reqAuth } from "./middlewares";

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
