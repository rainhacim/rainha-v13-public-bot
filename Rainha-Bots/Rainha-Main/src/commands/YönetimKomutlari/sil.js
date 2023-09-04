const { green, red } = require("../../configs/emojis.json")
module.exports = {
    conf: {
      aliases: ["sil","temizle"],
      name: "sil",
      help: "sil"
    },
  
    run: async (client, message, args, embed) => {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return;
        if (!args[0]) return message.channel.send({ content:`${red} Bir miktar belirtmelisiniz!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
        if (isNaN(args[0])) return message.channel.send({ content:`${red} Belirttiğin miktar bir sayıdır!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
        await message.delete();
        await message.channel.bulkDelete(args[0]);
        message.channel.send({ content:`**${args[0]} adet mesaj başarıyla silindi!** ${green}`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
      },
    };