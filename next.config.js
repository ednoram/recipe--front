/* eslint-disable no-undef */
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  sassOptions: {
    prependData:
      ["variables", "typography"]
        .map((x) => `@import "@/styles/${x}.scss";`)
        .join("\n") + "\n\n",
  },
  env: {
    API_URL: process.env.API_URL,
  },
};
