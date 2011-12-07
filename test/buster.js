var config = module.exports;

config["Server tests"] = {
  env: "node",
  sources: [
    "../lib/**/*.js"
  ],
  tests: [
    "*-test.js"
  ]
};