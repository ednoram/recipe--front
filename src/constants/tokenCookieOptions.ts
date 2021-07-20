import { CookieAttributes } from "js-cookie";

const TOKEN_COOKIE_OPTIONS: CookieAttributes = {
  sameSite: "strict",
  secure: true,
  expires: 7,
};

export default TOKEN_COOKIE_OPTIONS;
