const { MessageEmbed } = require("discord.js");
const conf = require("../../configs/sunucuayar.json")
const snipe = require("../../schemas/snipe");
const moment = require("moment");
require("moment-duration-format");
const { miniicon, mesaj2, green, red } = require("../../configs/emojis.json");
module.exports = {
  conf: {
    aliases: ["snipe","sn"],
    name: "snipe",
    help: "snipe",
    category: "yetkili",
  },

  run: async (client, message, args) => {
    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has()) 
    {
      message.react(red)
      return
    }
    let hembed = new MessageEmbed().setAuthor({name: message.member.displayName, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor('#330066')
    message.react(green)

    const data = await snipe.findOne({ guildID: message.guild.id, channelID: message.channel.id });
    if (!data) 
    {
    message.react(red)
    message.channel.send({ content:"Bu kanalda silinmiş bir mesaj bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

const author = await client.user.fetch(data.author);
hembed.setDescription(`
${data.messageContent ? `\n${mesaj2} **Mesaj İçeriği :** **${data.messageContent}**` : ""}
${miniicon} Mesaj Sahibi: <@${data.userID}> - (\`${data.userID}\`)
${miniicon} Mesajın Yazılma Tarihi: <t:${Math.floor(data.createdDate / 1000)}:R>
${miniicon} Mesajın Silinme Tarihi: <t:${Math.floor(data.deletedDate / 1000)}:R>
`);
 message.channel.send({ embeds: [hembed] });
  
},
};
