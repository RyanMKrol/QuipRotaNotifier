import fetch from 'node-fetch';
import cheerio from 'cheerio';

/**
 * Method to read rota, and publish update in Slack
 *
 * @param {string} quipApiToken The API token to call the Quip API
 * @param {string} quipSpreadsheetId The ID of the doc to read
 * @param {string} slackWebhookUrl The URL of the Slack webhook to push to
 * @param {string} rotaName The name of the rota we're running against
 *
 * @returns {void} Nothing
 */
export default async function publishRotaUpdate(
  quipApiToken,
  quipSpreadsheetId,
  slackWebhookUrl,
  rotaName,
) {
  fetch(`https://platform.quip-amazon.com/1/threads/${quipSpreadsheetId}`, {
    method: 'get',
    headers: {
      authorization: `Bearer ${quipApiToken}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      const $ = cheerio.load(json.html);

      const rotaData = $('table tr').map((i, elem) => {
        const date = $(elem).find('span').eq(0).text();
        const assignee = $(elem).find('span').eq(1).text();

        return validateDate(date) ? {
          date: new Date(date),
          assignee,
        } : undefined;
      }).get();

      const todayRotaData = rotaData.filter((x) => isDateToday(x.date));

      if (todayRotaData.length !== 1) {
        postSlack(slackWebhookUrl, {
          content: `\nRota - ${rotaName}\nMessage - Could not parse rota today, please check manually.`,
        });
      } else {
        postSlack(slackWebhookUrl, {
          content: `\nRota - ${rotaName}\nMessage - ${todayRotaData[0].assignee}, You are today's rota person!`,
        });
      }
    });
}

/**
 * Method to publish update to Slack
 *
 * @param {string} webhookUrl The URL of the webhook we're calling
 * @param {string} body The body to post to Slack
 *
 * @returns {void} Nothing
 */
async function postSlack(webhookUrl, body) {
  return fetch(webhookUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Method to validate if the data we're reading is a date
 *
 * @param {string} val A string representing the date in the rota
 *
 * @returns {boolean} Whether the date is valid or not
 */
function validateDate(val) {
  const parsedDate = Date.parse(val);
  return !Number.isNaN(parsedDate);
}

/**
 * Method to check if the date we've read is today or not
 *
 * @param {Date} comparingDate The date we're comparing to
 *
 * @returns {boolean} Whether today is the date we're comparing or not
 */
function isDateToday(comparingDate) {
  const todayDate = new Date();

  return todayDate.getFullYear() === comparingDate.getFullYear()
    && todayDate.getMonth() === comparingDate.getMonth()
    && todayDate.getDate() === comparingDate.getDate();
}
