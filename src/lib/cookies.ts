import cookie from "js-cookie";

export const getTokenCookie = (): string | undefined => cookie.get("token");
