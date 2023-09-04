const conf = require("../../configs/sunucuayar.json")
const moment = require("moment");
moment.locale("tr");
const { red } = require("../../configs/emojis.json")
let table = require("string-table");
const god = require("../../../../../config.json");
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["","",""],
    name: "",
    help: "",
    category: "",
  },

  run: async (client, message, args, embed, durum) => {

  if (!message.guild) return;
  if (!message.member.permissions.has(8n)) return message.react(red)

    const sec = args[0]

    if (sec) {
      if(!client.guilds.cache.get(god.GuildID).roles.cache.get(sec)) {
        return message.reply({ content: ":x: Sunucuda belirttiğiniz rol bulunmamaktadır. Lütfen Kontrol Ediniz.", ephemeral: true })
      }

      var ToplamYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(sec)).size
      var SesteOlanYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(sec)).filter(yetkilises => yetkilises.voice.channel).size
      var AktifYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(sec) && yetkili.presence && yetkili.presence.status !== "offline").size
      let SesteOlmayanYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(sec)).filter(yetkilises => !yetkilises.voice.channel && yetkilises.presence && yetkilises.presence.status != "offline").size

      let rainha = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(sec)).filter(yetkilises => !yetkilises.voice.channel  && yetkilises.presence && yetkilises.presence.status != "offline")

      let tablo = [{
        "TOPLAM": ToplamYetkili + " kişi",
        "AKTİF": AktifYetkili + " kişi",
        "SESTE": SesteOlanYetkili + " kişi",
        "SESTE OLMAYAN": SesteOlmayanYetkili + " kişi"
      }]

      message.channel.send({ content: `\`\`\`js\n${table.create(tablo)}\`\`\`\n\`\`\`\n${rainha.map(yetkili => `${yetkili}`).join(', ')}\n\`\`\``})

    } else if (!sec) {

      var ToplamYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.staffs[0])).size
      var SesteOlanYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.staffs[0])).filter(yetkilises => yetkilises.voice.channel).size
      var AktifYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.staffs[0]) && yetkili.presence && yetkili.presence.status !== "offline").size
      let SesteOlmayanYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.staffs[0])).filter(yetkilises => !yetkilises.voice.channel && yetkilises.presence && yetkilises.presence.status != "offline").size

      let rainha = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.staffs[0])).filter(yetkilises => !yetkilises.voice.channel  && yetkilises.presence && yetkilises.presence.status != "offline")

      let tablo = [{
        "TOPLAM": ToplamYetkili + " kişi",
        "AKTİF": AktifYetkili + " kişi",
        "SESTE": SesteOlanYetkili + " kişi",
        "SESTE OLMAYAN": SesteOlmayanYetkili + " kişi"
      }]

      message.channel.send({ content: `\`\`\`js\n${table.create(tablo)}\`\`\`\n\`\`\`\n${rainha.map(yetkili => `${yetkili}`).join(', ')}\n\`\`\``})
    }

    
}}