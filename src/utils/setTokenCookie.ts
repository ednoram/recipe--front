import cookie from "js-cookie";

const setTokenCookie = (value: string): void => {
  cookie.set("token", value, {
    sameSite: "strict",
    secure: true,
    expires: 7,
  });
};

export default setTokenCookie;
