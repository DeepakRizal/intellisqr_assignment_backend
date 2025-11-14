import ErrorLog from "../models/errorLog";

export const logErrorToDb = async (errorInfo: Partial<any>) => {
  try {
    await ErrorLog.create(errorInfo);
  } catch (error) {
    console.log("Failed to write error log to Db");
  }
};
