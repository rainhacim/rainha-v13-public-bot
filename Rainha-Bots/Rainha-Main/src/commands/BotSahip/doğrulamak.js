const { Discord, MessageButton, MessageActionRow } = require("discord.js");
const conf = require("../../configs/sunucuayar.json");
const god = require("../../../../../config.json");
const { green, red, Jail } = require("../../configs/emojis.json")
const moment = require("moment");
moment.locale("tr");
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["doğrulamak","doğrulama"],
    name: "hızlıgrş",
    owner: true,
  },

  run: async (client, message, args, embed) => {

    client.api.channels(message.channel.id).messages.post({
      data: {
        "content": `
**Merhaba Kullanıcı;**

Sunucumuza Şuan Çok Hızlı Giriş İşlemi Yapıldığı İçin Rol Dağıtımı Durduruldu.Aşşağıdaki Burona Tıklayarak Bot Hesap Olmadığını Doğrulayıp Sunucuda Gerekli Rollerini Alabilirsin.Eğer Yanlış Bir Durum Olduğunu Düşünüyorsan Sağ Taraftaki Yetkililere Yazmaktan Çekinme!

Eğer Bu Kanalı Anlık Olarak Gördüysen Kayıt İşlemine <#1116158126165610506> Bu Kanaldan Devam Edebilirsin

İyi Günler Dileriz.

**GOLD**
`, "components": [{
          "type": 1, "components": [

            { "type": 2, "style": 3, "custom_id": "Doğrula", "label": "Doğrula"},

          ]
        }]
      }
    })
  },
};

client.on('interactionCreate', async interaction => {

    const member = await client.guilds.cache.get(god.GuildID).members.fetch(interaction.member.user.id)
    if (!member) return;

  if (interaction.customId === "Doğrula") {
    await interaction.reply({ content: `Doğrulama Başarılı Teyit Kanallarına Yönlendiriliyorsunuz.`, ephemeral: true });
    await member.roles.set(conf.unregRoles)
}
})