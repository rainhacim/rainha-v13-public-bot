const Discord = require("discord.js");
const conf = require("../../configs/ayarName.json");
const god = require("../../../../../config.json");

const { rainhanitro, rainhanetflix, rainhaspotify, rainhaexxen, rainhablutv} = require("../../configs/emojis.json")
const client = global.bot;

module.exports = {
  conf: {
    aliases: [],
    name: "ecrolalma",
    help: "ecrolalma",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {
    client.api.channels(message.channel.id).messages.post({ data: {"content":`Merhaba **${message.guild.name}** üyeleri,\nÇekiliş katılımcısı alarak ${rainhanitro} , ${rainhaspotify} , ${rainhanetflix} , ${rainhaexxen} , ${rainhablutv} gibi çeşitli ödüllerin sahibi olabilirsiniz.\nEtkinlik katılımcısı alarak çeşitli etkinliklerin yapıldığı anlarda herkesten önce haberdar olabilirsiniz ve çekilişlere önceden katılma hakkı kazanabilirsiniz.\n\n__Aşağıda ki butonlara basarak siz de bu ödülleri kazanmaya hemen başlayabilirsiniz!__`,"components":[{"type":1,"components":[

        {"type":2,"style":2,"custom_id":"buttoncekilis","label":" Çekiliş Katılımcısı"},
        {"type":2,"style":2,"custom_id":"buttonetkinlik","label":" Etkinlik Katılımcısı"}
        
        ]}]} })
  },
};

client.on('interactionCreate', async interaction => {
  const member = interaction.user;

const etkinlik = await client.guilds.cache.get(god.GuildID).roles.cache.find(x => x.name.includes(conf.etkinlik)).id
const cekilis = await client.guilds.cache.get(god.GuildID).roles.cache.find(x => x.name.includes(conf.cekilis)).id

    if(interaction.customId === "buttoncekilis")
    {

      if(interaction.guild.members.cache.get(member.id).roles.cache.has(cekilis)){
          await interaction.guild.members.cache.get(member.id).roles.remove(cekilis)
          await interaction.reply({ content: `${member.toString()}, başarıyla <@&${cekilis}> rolünü çıkardınız.`, ephemeral: true });
      } else {
          await interaction.guild.members.cache.get(member.id).roles.add(cekilis)
          await interaction.reply({ content: `${member.toString()}, başarıyla <@&${cekilis}> rolü aldınız.`, ephemeral: true });
      }
    }
        
    if(interaction.customId === "buttonetkinlik")
    {

      if(interaction.guild.members.cache.get(member.id).roles.cache.has(etkinlik)){
          await interaction.guild.members.cache.get(member.id).roles.remove(etkinlik)
          await interaction.reply({ content: `${member.toString()}, başarıyla <@&${etkinlik}> rolünü çıkardınız.`, ephemeral: true });
      } else {
          await interaction.guild.members.cache.get(member.id).roles.add(etkinlik)
          await interaction.reply({ content: `${member.toString()}, başarıyla <@&${etkinlik}> rolü aldınız.`, ephemeral: true });
      }
    }
})