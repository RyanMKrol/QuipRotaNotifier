# quip-rota-notifier

## Usage

### Run the update once
`npm run run-once -- --quipApiToken "a_token" --quipDocId "a_doc_id" --slackWebhookUrl "a_slack_channel"`

### Setup a schedule to run the update every day
`npm run run-schedule -- --quipApiToken "a_token" --quipDocId "a_doc_id" --slackWebhookUrl "a_slack_channel"`

## Notes
* This only works if your spreadsheet has a single table. **There is zero guarantee of this working if you have multiple tabs.**
* You will need an instance of this running per rota you'd like to be notified of.
* The spreadsheet format has to be very specific. This tool assumes the following:
  * The date of the rotation is in column 1.
  * The assignee for that data is in column 2.

## FAQ
* Q. Where do I get a Quip API token?
* A. https://quip-amazon.com/dev/token
---
* Q. How do I find out the ID for a Quip spreadsheet?
* A. This will form part of the URL, i.e. https://quip-amazon.com/kX2FASe4bxrq/Untitled, will have an ID of kX2FASe4bxrq
---
* Q. How do I find the Slack webhook URL?
* A. You can find the Workflow Editor by clicking on your org in the top left of slack (Media & Ads for example), then it will be under Tools. From here you just need to find your workflow, and copy the webhook URL.
---
