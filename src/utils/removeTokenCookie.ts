import cookie from "js-cookie";

import { TOKEN_COOKIE_OPTIONS } from "@/constants";

const removeTokenCookie = (): void => {
  cookie.remove("token", TOKEN_COOKIE_OPTIONS);
};

export default removeTokenCookie;
