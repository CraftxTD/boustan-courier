require('dotenv').config();

const fs = require('node:fs');
const utils = require("./utils")

// @ts-check

function greet() {
  let str;
  let sentiment = utils.getRandomInt(1, 10);
  let num;
  switch (sentiment) {
    case 1:
      console.log("Negative");
      num = utils.getRandomInt(0, 1);
      switch (num) {
        case 0:
          str = 'go fuck yourself';
          break;
        case 1:
          str = 'no';
          break;
      }
      break;

    default:
      console.log("Positive");
      num = utils.getRandomInt(0, 10);
      switch (num) {
        case 0:
          str = 'wassup';
          break;
        case 1:
          str = 'yo';
          break;
        case 2:
          str = 'how ya doin';
          break;
        case 3:
          str = 'hello';
          break;
        case 4:
          str = 'yeah';
          break;
        case 5:
          str = 'lol';
          break;
        case 6:
          str = 'nice weather today huh';
          break;
        case 7:
          str = 'hi';
          break;
        case 8:
          str = 'good day';
          break;
        case 9:
          str = 'what';
          break;
        case 10:
          str = ':3';
          break;
      }
      break;

  }
  return str;
}


/**
  * Use copycat webhook to clone message and modify it.
  * @param {OmitPartialGroupDMChannel<Message<boolean>>} message 
  * @param {any} messageContent
  * @returns {webhook}
  */
async function copycatMessage(message, messageContent) {
  let webhook;

  try {
    webhook = await message.client.fetchWebhook(
      process.env.COPYCAT_ID,
      process.env.COPYCAT_TOKEN,
    );

    console.log('Got CopyCat Webhook');
  } catch (error) {
    console.error(error);
    console.log('COPYCAT WEBHOOK DOES NOT EXIST');
    return;
  }

  await webhook.edit({
    name: message.author.displayName,
    avatar: message.author.displayAvatarURL(),
    channel: message.channelId
  })
    .then(console.log(`Copied user's avatar and name`))
    .catch(console.error);


  await webhook.send(messageContent);

  await webhook.edit({
    name: "CopyCat",
    avatar: fs.readFileSync(process.env.COPYCAT_PICTURE)
  })
    .then((webhook) => console.log(`Edited to user webhook ${webhook}`))
    .catch(console.error);

  return webhook;
}



module.exports = {
  greet,
  copycatMessage
};
