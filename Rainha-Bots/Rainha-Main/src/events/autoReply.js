const conf = require("../configs/sunucuayar.json")
const { green } = require("../configs/emojis.json");

module.exports = async (message) => {
  if (message.content.toLowerCase() === "tag" || message.content.toLowerCase() === "!tag" || message.content.toLowerCase() === ".tag") {
    message.react(green);
    message.reply({ content: `${conf.tag}`});
  }
  if (message.content.toLowerCase() === ".patlat") {
    message.react(green);
    message.reply({ content: "https://tenor.com/view/spider-man-tabi-efendim-tabii-efendim-spiderman-tabi-efendim-gif-25159622"});
  }
  if (message.content.toLowerCase() === "<@1061346820632096778>") {
    message.react(green);
    message.reply({ content: "L İ X A N T R A"});
  }
};
module.exports.conf = {
  name: "messageCreate"
};