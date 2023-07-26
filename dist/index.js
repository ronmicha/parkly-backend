"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto = __importStar(require("crypto"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middlewares_1 = require("./middlewares");
const general_route_1 = __importDefault(require("./routes/general.route"));
const parkingAreas_route_1 = __importDefault(require("./routes/parkingAreas.route"));
const parkingSlots_route_1 = __importDefault(require("./routes/parkingSlots.route"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const admin_1 = __importDefault(require("./routes/admin"));
const app = (0, express_1.default)();
const { PORT } = process.env;
const secret = crypto.randomBytes(20).toString("hex");
app.use((0, compression_1.default)());
app.use((0, middlewares_1.logging)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use((0, cookie_parser_1.default)(secret));
app.use("/", general_route_1.default);
app.use((0, middlewares_1.basicAuth)());
app.use("/parking-areas", parkingAreas_route_1.default);
app.use("/parking-slots", parkingSlots_route_1.default);
app.use("/users", users_route_1.default);
app.use((0, middlewares_1.adminAuth)());
app.use("/admin", admin_1.default);
app.listen(PORT, () => {
    console.log(`⚡️ Server is running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map