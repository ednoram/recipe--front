import { AxiosError } from "axios";

const processErrors = (err: AxiosError): string[] =>
  err.response?.data.errors?.map((error: { message: string }) =>
    Object.values(error).map((msg) => String(msg))
  ) || [];

export default processErrors;
