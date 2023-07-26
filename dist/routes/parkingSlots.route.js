"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const http_status_codes_1 = require("http-status-codes");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parkingAreaId = req.query.parkingAreaId;
    if (!parkingAreaId) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ error: "Parameter 'parkingAreaId' is missing" });
        return;
    }
    try {
        const parkingSlots = yield controllers_1.parkingSlotsController.getParkingSlots(parkingAreaId);
        res.json({ parkingSlots });
    }
    catch (e) {
        console.error(e);
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: e.message });
    }
}));
router.post("/update-status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slotId, vehicleId } = req.body;
    try {
        yield controllers_1.parkingSlotsController.updateSlotStatus(slotId, vehicleId);
        res.sendStatus(http_status_codes_1.StatusCodes.OK);
    }
    catch (e) {
        console.error(e);
        const error = e;
        const status = error.code === db_1.PgErrorCodes.UNIQUE_VIOLATION
            ? http_status_codes_1.StatusCodes.BAD_REQUEST
            : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(status).json({ error: error.message });
    }
}));
exports.default = router;
//# sourceMappingURL=parkingSlots.route.js.map