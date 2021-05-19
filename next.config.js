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
    prependData: '@import "@/styles/variables.scss";\n',
  },
};
