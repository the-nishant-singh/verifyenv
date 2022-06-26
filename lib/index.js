const _ = require("lodash");
const Checker = require("./checker");
const Message = require("./message");

const check = ({
  example = ".env.example",
  reverseCheck = false,
  env = ".env",
} = {}) => {
  const missingVariablesFromEnv = Checker.hasMissingVariables(example);
  let missingVariablesFromExample = false;
  if (reverseCheck) {
    missingVariablesFromExample = Checker.hasExampleMissingVariables(
      example,
      env
    );
  }

  if (missingVariablesFromEnv || missingVariablesFromExample) {
    Message.failMessage();
    if (missingVariablesFromEnv)
      Message.missingMessage(missingVariablesFromEnv, env);
    if (missingVariablesFromExample)
      Message.missingMessage(missingVariablesFromExample, example);
    throw new Error("Check env files!");
  } else {
    Message.passMessage();
  }
};

module.exports = { check };
