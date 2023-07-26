"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDataFromCookie = exports.setAuthCookie = void 0;
const AUTH_COOKIE_NAME = "auth";
const AUTH_COOKIE_AGE = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds
const AUTH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    signed: true,
    sameSite: "none",
    maxAge: AUTH_COOKIE_AGE,
};
const setAuthCookie = (res, user) => {
    const value = {
        id: user.id,
        role: user.role,
    };
    return res.cookie(AUTH_COOKIE_NAME, value, AUTH_COOKIE_OPTIONS);
};
exports.setAuthCookie = setAuthCookie;
const getUserDataFromCookie = (req) => {
    return req.signedCookies[AUTH_COOKIE_NAME];
};
exports.getUserDataFromCookie = getUserDataFromCookie;
//# sourceMappingURL=auth.js.map