const { Client, Collection } = require("discord.js");
const god = require("../../config.json");

const client = (global.bot = new Client({
  fetchAllMembers: true,
  intents: 32767,
}));
const mongoose = require("mongoose");

client.commands = new Collection();

mongoose
.connect(god.Guard.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
client.login(god.Guard.OtherGuard);
require("./src/Handlers/CommandHandler");
require("./src/Handlers/EventHandler");
require("./bot.js");
console.log("Database bağlantısı tamamlandı!")
})