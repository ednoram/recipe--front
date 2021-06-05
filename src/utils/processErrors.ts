import { AxiosError } from "axios";

const processErrors = (err: AxiosError): Array<string> =>
  err?.response?.data.errors?.map((error: { message: string }) =>
    Object.values(error).map((msg) => String(msg))
  ) || [];

export default processErrors;
