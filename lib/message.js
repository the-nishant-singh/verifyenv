const chalk = require("chalk");
const log = console.log;

const missingMessage = (missingVariables, envPath) => {
  if (missingVariables.length > 0) {
    log(chalk.underline.yellow("MISSING:"), missingVariables);
    log(chalk.underline.yellow("FROM:"), envPath);
    log("");
  }
};

const missingMessageAsString = (missingVariables, envPath) => {
  return `

  MISSING: ${missingVariables.join(", ")}
  FROM: ${envPath}
  `;
};

const failMessage = () => {
  log(chalk.bgRed.bold("Env Check: Failed!"));
  log("");
};

const passMessage = () => {
  log(chalk.bgGreen.bold("Env Check: Passed!"));
  log("");
};

module.exports = {
  missingMessage,
  failMessage,
  passMessage,
  missingMessageAsString,
};
