import yargs from 'yargs';
import inquirer from 'inquirer';

const QUESTIONS = [
  {
    name: 'quipApiToken',
    type: 'input',
    message: 'What is your Quip API token?',
    when: () => !yargs.argv.quipApiToken,
    validate: (input) => {
      if (input.length === 0) {
        return 'Must provide a Quip API token';
      }

      return true;
    },
  },
  {
    name: 'quipDocId',
    type: 'input',
    message: 'What is the ID of the Quip doc you are storing your rota in?',
    when: () => !yargs.argv.quipDocId,
    validate: (input) => {
      if (input.length === 0) {
        return 'Must provide a Quip doc ID';
      }

      return true;
    },
  },
  {
    name: 'slackWebhookUrl',
    type: 'input',
    message: 'What is the URL for your Slack Webhook?',
    when: () => !yargs.argv.slackWebhookUrl,
    validate: (input) => {
      if (input.length === 0) {
        return 'Must provide a URL for your Slack Webhook';
      }

      return true;
    },
  },
  {
    name: 'rotaName',
    type: 'input',
    message: 'What is the name of the rota you are running this tool for?',
    when: () => !yargs.argv.rotaName,
    validate: (input) => {
      if (input.length === 0) {
        return 'Must provide a name for your rota';
      }

      return true;
    },
  },
];

/**
 * A method to merge the answers from inquirer, and the program args
 *
 * @param {object.<string, string>} answers The answers provided by the user
 * @returns {object.<string, string>} All program arguments
 */
function parseAnswers(answers) {
  return {
    ...answers,
    ...yargs.argv,
  };
}

/**
 * Method to fetch input from the user
 *
 * @returns {object.<string, string>} All program arguments
 */
async function getUserInput() {
  return parseAnswers(await inquirer.prompt(QUESTIONS));
}

export default getUserInput;
