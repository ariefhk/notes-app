import { ZodIssue } from "zod";

export class APIError extends Error {
  constructor(
    public code: number,
    message: string,
    public errorData?: ZodIssue[]
  ) {
    super(message);
    this.code = code;
    this.errorData = errorData;
  }
}
