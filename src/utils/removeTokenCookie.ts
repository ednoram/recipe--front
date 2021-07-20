import cookie from "js-cookie";

const removeTokenCookie = (): void => {
  cookie.remove("token", {
    sameSite: "strict",
    secure: true,
    expires: 7,
  });
};

export default removeTokenCookie;
