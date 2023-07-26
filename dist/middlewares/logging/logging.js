"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logging = void 0;
const utils_1 = require("./utils");
const logMessage = (messageTokens, delimiter = " ") => {
    console.log(messageTokens.join(delimiter));
};
const loggingHandler = (req, res, next) => {
    const date = new Date().toISOString();
    const reqStartTime = process.hrtime();
    const { method, url, params } = req;
    const { statusCode } = res;
    const queryParams = (0, utils_1.convertParamsObjectToString)(params);
    const messageTokens = [
        date,
        method,
        queryParams ? `${url}?${queryParams}` : url,
        statusCode,
        "[STARTED]",
    ];
    logMessage(messageTokens);
    res.on("finish", () => {
        const totalDuration = (0, utils_1.getDurationInMilliseconds)(reqStartTime);
        const updatedMessageTokens = [...messageTokens];
        updatedMessageTokens.pop();
        updatedMessageTokens.push("[FINISHED]");
        updatedMessageTokens.push(`${totalDuration}ms`);
        logMessage(updatedMessageTokens);
    });
    next();
};
const logging = () => loggingHandler;
exports.logging = logging;
//# sourceMappingURL=logging.js.map