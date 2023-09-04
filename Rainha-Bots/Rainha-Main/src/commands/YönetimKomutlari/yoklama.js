const {
    green,
    red
} = require("../../configs/emojis.json");
const {
    Permissions
} = require("discord.js");
module.exports = {
    conf: {
      aliases: ["yoklama"],
      name: "yoklama",
      help: "yoklama",
      category: "yönetim",
    },
  

    run: async (client, message, args, embed) => {
    if(!message.member.permissions.has('ADMINISTRATOR')) 
    {
      message.react(red)
      return
    }
        let botcomendsrol = "1118113134067068990";
        let kanal = "1117698827630153748";
        let katildirol = "1115734708358221945";
        let katilmadirol = "1117697937343004683";

        message.reply(message.guild.roles.cache.get(botcomendsrol).members.map(m => m.id).join(","))

        for (const id of message.guild.roles.cache.get(botcomendsrol).members.map(m => m.id)) {
            let m = message.guild.members.cache.get(id);
            await m.roles.remove(katildirol);
            await m.roles.remove(katilmadirol);
            if (!m.voice.channelId) await m.roles.add(katilmadirol);
            else if (m.voice.channelId != kanal) await m.roles.add(katilmadirol);
            else await m.roles.add(katildirol);
        };

        message.reply("Verildi");
    },
};