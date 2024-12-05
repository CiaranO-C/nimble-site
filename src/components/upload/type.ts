import { errorMap } from "./utils";

type ErrorCodes = keyof typeof errorMap;

type ErrorValues =
  | "Oops! Please upload CSV files only"
  | "Sign up for multi-file uploads!";

export type { ErrorCodes, ErrorValues };
