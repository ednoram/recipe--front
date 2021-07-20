import cookie from "js-cookie";

import { TOKEN_COOKIE_OPTIONS } from "@/constants";

const setTokenCookie = (value: string): void => {
  cookie.set("token", value, TOKEN_COOKIE_OPTIONS);
};

export default setTokenCookie;
