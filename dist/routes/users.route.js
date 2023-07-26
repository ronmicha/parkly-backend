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
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get("/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = (0, utils_1.getUserDataFromCookie)(req);
    try {
        const userData = yield controllers_1.usersController.getUser({ id });
        res.json({ userData });
    }
    catch (e) {
        console.error(e);
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: e.message });
    }
}));
exports.default = router;
//# sourceMappingURL=users.route.js.map