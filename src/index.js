import publishRotaUpdate from './modules/publishRotaUpdate';
import getUserInput from './modules/input';

/**
 * The main function to run our update
 */
export default async function main() {
  const answers = await getUserInput();

  const { quipApiToken } = answers;
  const { quipDocId } = answers;
  const { slackWebhookUrl } = answers;
  const { rotaName } = answers;

  publishRotaUpdate(quipApiToken, quipDocId, slackWebhookUrl, rotaName);
}
