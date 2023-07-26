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
const http_status_codes_1 = require("http-status-codes");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = req.query.customerId;
    if (!customerId) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ error: "Parameter 'customerId' is missing" });
        return;
    }
    try {
        const parkingAreas = yield controllers_1.parkingAreasController.getCustomerParkingAreas(customerId);
        res.json({ parkingAreas });
    }
    catch (e) {
        console.error(e);
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: e.message });
    }
}));
exports.default = router;
//# sourceMappingURL=parkingAreas.route.js.map