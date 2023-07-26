"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = exports.basicAuth = void 0;
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../utils");
const basicAuthHandler = (req, res, next) => {
    const userData = (0, utils_1.getUserDataFromCookie)(req);
    if (!userData) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            message: "Unauthorized to perform this action. Please login first",
        });
        return;
    }
    next();
};
const adminAuthHandler = (req, res, next) => {
    const userData = (0, utils_1.getUserDataFromCookie)(req);
    const userRole = userData === null || userData === void 0 ? void 0 : userData.role;
    if (userRole !== "admin") {
        res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ message: "Unauthorized to perform admin actions" });
        return;
    }
    next();
};
const basicAuth = () => basicAuthHandler;
exports.basicAuth = basicAuth;
const adminAuth = () => adminAuthHandler;
exports.adminAuth = adminAuth;
//# sourceMappingURL=auth.js.map