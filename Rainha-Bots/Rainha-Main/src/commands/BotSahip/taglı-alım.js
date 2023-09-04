const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { red , green } = require("../../configs/emojis.json")
const registerData  = require("../../schemas/registerStats");

module.exports = {
    conf: {
      aliases: ["taglıalım","taglı-alım"],
      name: "taglı-alım",
      help: "taglı-alım",
      category: "sahip",
      owner: true,
    },

  run: async (client, message, args) => {  

    let data = await registerData.findOne({ guildID: message.guild.id })
    if(!data) new registerData({guildID: message.guild.id, tagMode: false}).save();

    let ac = new MessageButton()
    .setCustomId("ac")
    .setLabel("Aktif")
    .setStyle("SECONDARY")
    .setEmoji("1066488716681564212");

    let kapa = new MessageButton()
    .setCustomId("kapa")
    .setLabel("Deaktif")
    .setStyle("SECONDARY")
    .setEmoji("1066488715221942272");

    if (data && data.tagMode === true) {
      ac.setStyle('SUCCESS').setDisabled(true);
    } else {
      ac.setStyle('SUCCESS');
    }

    if (data && data.tagMode === false) {
      kapa.setStyle('DANGER').setDisabled(true);
    } else {
      kapa.setStyle('DANGER');
    }

    const row = new MessageActionRow()
    .addComponents([ ac, kapa ]);
  
  
    let rainha = new MessageEmbed()  
    .setDescription(`${message.author} Taglı Modunu Aktifleştirmek ve Deaktifleştirmek için butonları kullanınız.`)
    .setFooter({ text: `Kapalı olan buton şuanki taglı modunu gösterir tekrar kullanılamaz.`})
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

  let msg = await message.channel.send({ embeds: [rainha], components: [row] })

  var filter = button => button.user.id === message.author.id;

  let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

  collector.on("collect", async (button) => {

    if (button.customId === "ac") {
      await button.deferUpdate();
      let data = await registerData.findOne({ guildID: message.guild.id })
      data.tagMode = true;
      data.save();
      msg.edit({ content: `${green} Taglı Alım modu başarıyla **Aktif** edildi!`, embeds: [], components: [] });
    }
    if (button.customId === "kapa") {
      await button.deferUpdate();
      let data = await registerData.findOne({ guildID: message.guild.id })
      data.tagMode = false;
      data.save();
      msg.edit({ content: `${green} Taglı Alım modu başarıyla **Deaktif** edildi!`, embeds: [], components: [] });
    }

  })
}
}
