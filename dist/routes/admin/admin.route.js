"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_users_route_1 = __importDefault(require("./admin.users.route"));
const admin_parkingSlots_route_1 = __importDefault(require("./admin.parkingSlots.route"));
const router = express_1.default.Router();
router.use("/users", admin_users_route_1.default);
router.use("/parking-slots", admin_parkingSlots_route_1.default);
exports.default = router;
//# sourceMappingURL=admin.route.js.map