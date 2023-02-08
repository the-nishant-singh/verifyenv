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

  let errorMessage = "Check env files!";

  if (missingVariablesFromEnv || missingVariablesFromExample) {
    Message.failMessage();
    if (missingVariablesFromEnv.length) {
      Message.missingMessage(missingVariablesFromEnv, env);
      errorMessage = errorMessage.concat(
        Message.missingMessageAsString(missingVariablesFromEnv, env)
      );
    }
    if (missingVariablesFromExample.length) {
      Message.missingMessage(missingVariablesFromExample, example);
      errorMessage = errorMessage.concat(
        Message.missingMessageAsString(missingVariablesFromExample, example)
      );
    }

    throw new Error(errorMessage);
  } else {
    Message.passMessage(errorMessage);
  }
};

module.exports = { check };
