/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["./src/__test__/setup.js"],
};

module.exports = config;
