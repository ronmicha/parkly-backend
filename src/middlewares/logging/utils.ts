export const getDurationInMilliseconds = (
  startTime: [number, number]
): string => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(startTime);
  const duration = (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;

  return duration.toFixed(3);
};

export const convertParamsObjectToString = (
  params: Record<string, string>
): string => {
  return new URLSearchParams(params).toString();
};
