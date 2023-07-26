"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertParamsObjectToString = exports.getDurationInMilliseconds = void 0;
const getDurationInMilliseconds = (startTime) => {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(startTime);
    const duration = (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
    return duration.toFixed(3);
};
exports.getDurationInMilliseconds = getDurationInMilliseconds;
const convertParamsObjectToString = (params) => {
    return new URLSearchParams(params).toString();
};
exports.convertParamsObjectToString = convertParamsObjectToString;
//# sourceMappingURL=utils.js.map