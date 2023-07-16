import { RequestHandler } from "express-serve-static-core";
import {
  convertParamsObjectToString,
  getDurationInMilliseconds,
} from "./utils";

const logMessage = (
  messageTokens: Array<string | number>,
  delimiter = " "
): void => {
  console.log(messageTokens.join(delimiter));
};

const loggingHandler: RequestHandler = (req, res, next) => {
  const date = new Date().toISOString();
  const reqStartTime = process.hrtime();

  const { method, url, params } = req;
  const { statusCode } = res;
  const queryParams = convertParamsObjectToString(params);

  const messageTokens = [
    date,
    method,
    queryParams ? `${url}?${queryParams}` : url,
    statusCode,
    "[STARTED]",
  ];

  logMessage(messageTokens);

  res.on("finish", () => {
    const totalDuration = getDurationInMilliseconds(reqStartTime);
    const updatedMessageTokens = [...messageTokens];

    updatedMessageTokens.pop();
    updatedMessageTokens.push("[FINISHED]");
    updatedMessageTokens.push(`${totalDuration}ms`);

    logMessage(updatedMessageTokens);
  });

  next();
};

export const logging = () => loggingHandler;
