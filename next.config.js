/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  sassOptions: {
    prependData:
      ["variables", "typography", "breakpoints"]
        .map((x) => `@import "@/styles/${x}.scss";`)
        .join("\n") + "\n\n",
  },
  env: {
    API_URL: process.env.API_URL,
  },
});
