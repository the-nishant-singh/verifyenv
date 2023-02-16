const _ = require("lodash");
const Dotenv = require("dotenv");
const Fs = require("fs");
const Path = require("path");

const read = (filename) => {
  const filePath = `${process.cwd()}${Path.sep}${filename}`;
  return Fs.readFileSync(filePath);
};

const hasMissingVariables = (example) => {
  const parsed = Dotenv.parse(read(example));
  const diff = _.difference(Object.keys(parsed), Object.keys(process.env));
  return _.size(diff) > 0 ? diff : false;
};

const hasExampleMissingVariables = (example, env) => {
  const parsedExample = Dotenv.parse(read(example));
  const parsedEnv = Dotenv.parse(read(env));
  const diff = _.difference(Object.keys(parsedEnv), Object.keys(parsedExample));
  return _.size(diff) > 0 ? diff : false;
};

const hasExampleMissingVariablesComparedToSecrets = (example, secrets) => {
  const parsedExample = Dotenv.parse(read(example));
  const diff = _.difference(Object.keys(secrets), Object.keys(parsedExample));
  return _.size(diff) > 0 ? diff : false;
};

module.exports = {
  hasMissingVariables,
  hasExampleMissingVariables,
  hasExampleMissingVariablesComparedToSecrets,
};
