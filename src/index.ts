import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import generalRouter from "./routes/general";
import customerParkingAreasRouter from "./routes/customerParkingAreas";
import parkingSlotsRouter from "./routes/parkingSlots";
import usersRouter from "./routes/users";

dotenv.config();

const app: Express = express();
const { PORT } = process.env;

app.use(express.json());
app.use(cors());

app.use("/", generalRouter);
app.use("/customer-parking-areas", customerParkingAreasRouter);
app.use("/parking-slots", parkingSlotsRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`⚡️ Server is running at http://localhost:${PORT}`);
});
