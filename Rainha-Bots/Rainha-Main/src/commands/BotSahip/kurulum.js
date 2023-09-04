const { Database } = require("ark.db");
const db = new Database("/src/configs/emojis.json");
const { MessageActionRow, MessageButton } = require("discord.js");
const god = require("../../../../../config.json");

module.exports = {
  conf: {
    aliases: [],
    name: "kurulum",
    help: "kurulum",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {

    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
    } else if (!god.owners.includes(message.author.id)) {
      return message.reply({ content: "<a:warnn:1117866163565772854> **Bot developerı olmadığın için kurulumu yapamazsınız.**", ephemeral: true })
    } else {

  const row = new MessageActionRow()
  .addComponents(
  new MessageButton()
  .setCustomId("rol")
  .setLabel("Menü Rol Kurulum")
  .setStyle("PRIMARY"),

  new MessageButton()
  .setCustomId("kanal")
  .setLabel("Kanal Kurulum")
  .setStyle("SUCCESS"),

  new MessageButton()
  .setCustomId("emoji")
  .setLabel("Emoji Kurulum")
  .setStyle("DANGER"),
  );

      let msg = await message.channel.send({ content: `Lütfen **60 saniye** içerisinde hangi kurulum yapacağınızı aşağıdaki butonlara tıklayarak cevaplayınız.`, components: [row]})

      var filter = (button) => button.user.id === message.author.id;
      const collector = msg.createMessageComponentCollector({ filter, componentType: 'BUTTON', max: 3, time: 60000 })


      collector.on("collect", async interaction => {

        if (interaction.customId === "rol") {
          await interaction.deferUpdate();

         await interaction.guild.roles.create({
            name: "🤍",
            color: "#ffffff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });
  
          await interaction.guild.roles.create({
            name: "❤️",
            color: "#ff0000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🧡",
            color: "#ff8b00",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "💜",
            color: "#4f00ff",
            permissions: "1117877309928636520",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "💟",
            color: "#ff00d1",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "💚",
            color: "#56ff00",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "Alone 💔",
            color: "#b0d0f7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "Couple 💍",
            color: "#e73084",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "Çekiliş Katılımcısı 🎉",
            color: "#f89292",
            permissions: "1112801203059949748",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "Etkinlik Duyuru 🎉",
            color: "#e8ff00",
            permissions: "1112801203038998547",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♏ Akrep",
            color: "#ffffff",
            permissions: "1117877322821939320",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♉ Boğa",
            color: "#ffffff",
            permissions: "1117877323669184565",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♍ Başak",
            color: "#ffffff",
            permissions: "1117877324973621369",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♊ İkizler",
            color: "#ffffff",
            permissions: "1117877326227710083",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♒ Kova",
            color: "#ffffff",
            permissions: "1117877327595057152",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♈ Koç",
            color: "#ffffff",
            permissions: "1117877328966586368",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♋ Yengeç",
            color: "#ffffff",
            permissions: "1117877330245865502",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♑ Oğlak",
            color: "#ffffff",
            permissions: "1117877331759988746",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♎ Terazi",
            color: "#ffffff",
            permissions: "1117877333001519205",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♌ Aslan",
            color: "#ffffff",
            permissions: "1117877334284980237",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♓ Balık",
            color: "#ffffff",
            permissions: "1117877335551643658",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♐ Yay",
            color: "#ffffff",
            permissions: "1117877336348557393",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "------------------------",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          msg.reply({ content: `Menü için gerekli Rollerin kurulumu başarıyla tamamlanmıştır.\n**Not:** Renk rollerini booster ve taglı rollerinin üstüne taşıyınız.`, ephemeral: true })

        }

        if (interaction.customId === "kanal") {
          await interaction.deferUpdate();

          const parent = await interaction.guild.channels.create('VİA LOGLAR', {
            type: 'GUILD_CATEGORY',
            permissionOverwrites: [{
              id: interaction.guild.id,
              deny: ['VIEW_CHANNEL'],
            }]
          });
          await interaction.guild.channels.create('guard_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('sekme_guard_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('message_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('voice_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('taglı_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('name_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('rank_log', {
            type: 'GUILD_TEXT',
            parent: parent.id

          });
          await interaction.guild.channels.create('market_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('rol_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('yetki_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('komut_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('invite_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('jail_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('mute_bilgi', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('ses_mute_bilgi', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('uyarı_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('ceza_puan_bilgi', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('register_log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          msg.reply({ content: `Log Kanallarının kurulumu başarıyla tamamlanmıştır.`, ephemeral: true })

        }

        if (interaction.customId === "emoji") {
          await interaction.deferUpdate();

          const emojis = [
              { name: "star", url: "https://cdn.discordapp.com/emojis/899680497427431424.gif?size=44" },
              { name: "rewards", url: "https://cdn.discordapp.com/emojis/899680521951514734.gif?size=44" },
              { name: "revusome", url: "https://cdn.discordapp.com/emojis/901441419363889172.png?size=96" },
              { name: "miniicon", url: "https://cdn.discordapp.com/emojis/899339236724068372.png?size=44" },
              { name: "red", url: "https://cdn.discordapp.com/emojis/1066488715221942272.png?size=32" },
              { name: "green", url: "https://cdn.discordapp.com/emojis/1066488716681564212.png?size=32" },
              { name: "staff", url: "https://cdn.discordapp.com/emojis/899680505119780895.gif?size=44" },
              { name: "Muhabbet", url: "https://cdn.discordapp.com/emojis/899339317896429641.gif?size=44" },
              { name: "galp", url: "https://cdn.discordapp.com/emojis/899680513806184570.gif?size=44" },
              { name: "kirmiziok", url: "https://cdn.discordapp.com/emojis/901441275381817426.gif?size=44" },
              { name: "Revuu", url: "https://cdn.discordapp.com/emojis/901441322152493066.gif?size=44" },
              { name: "Mute", url: "https://cdn.discordapp.com/emojis/901441287469809706.png?size=44" },
              { name: "Cezaa", url: "https://cdn.discordapp.com/emojis/901441311050178591.png?size=44" },
              { name: "Jail", url: "https://cdn.discordapp.com/emojis/903566151727087686.png?size=96" },
              { name: "Book", url: "https://cdn.discordapp.com/emojis/903564842978402304.png?size=96" },
              { name: "Kilit", url: "https://cdn.discordapp.com/emojis/903564832387760128.png?size=96" },
              { name: "Mute2", url: "https://cdn.discordapp.com/emojis/899339342986739802.png?size=96" },
              { name: "Unmute", url: "https://cdn.discordapp.com/emojis/899339351283105812.png?size=96" },
              { name: "fill", url: "https://cdn.discordapp.com/emojis/899339288636956752.gif?size=44" },
              { name: "empty", url: "https://cdn.discordapp.com/emojis/899340041229307966.png?size=44" },
              { name: "fillStart", url: "https://cdn.discordapp.com/emojis/899339278000222249.gif?size=44" },
              { name: "emptyEnd", url: "https://cdn.discordapp.com/emojis/899340050226118737.png?size=44" },
              { name: "fillEnd", url: "https://cdn.discordapp.com/emojis/862062197776580618.gif?size=96" },
              { name: "xp", url: "https://cdn.discordapp.com/emojis/838468875825446922.gif?v=1" },
              { name: "gulucuk", url: "https://cdn.discordapp.com/emojis/838469248602865735.png?v=1" },
              { name: "mesaj2", url: "https://cdn.discordapp.com/emojis/838468915814334464.gif?v=1" },
              { name: "altin", url: "https://cdn.discordapp.com/emojis/836694825243508756.gif?v=1" },
              { name: "altin2", url: "https://cdn.discordapp.com/emojis/836694821128372224.gif?v=1" },
              { name: "voice", url: "https://cdn.discordapp.com/emojis/841076020399308831.png?v=1" },
              { name: "channel", url: "https://cdn.discordapp.com/emojis/841076020399308831.png?v=1" },
              { name: "rainhaspotify", url: "https://cdn.discordapp.com/emojis/899337292840312912.png?size=44" },
              { name: "rainhanetflix", url: "https://cdn.discordapp.com/emojis/941993358518284298.webp?size=96&quality=lossless" },
              { name: "rainhaexxen", url: "https://cdn.discordapp.com/emojis/900396713116835900.png?size=44" },
              { name: "rainhablutv", url: "https://cdn.discordapp.com/emojis/900396707362246666.png?size=44" },
              { name: "rainhanitro", url: "https://cdn.discordapp.com/emojis/941993742934614047.webp?size=96&quality=lossless" },
              { name: "rainhayoutube", url: "https://cdn.discordapp.com/emojis/941993963013935115.gif?size=96&quality=lossless" },
              { name: "slotgif", url: "https://cdn.discordapp.com/emojis/931686726567612426.gif?v=1" },
              { name: "slotpatlican", url: "https://cdn.discordapp.com/emojis/931686717902192660.png?size=44" },
              { name: "slotkiraz", url: "https://cdn.discordapp.com/emojis/931686708037185546.png?size=44" },
              { name: "slotkalp", url: "https://cdn.discordapp.com/emojis/931686698138603610.png?size=44" },
              { name: "partner", url: "https://cdn.discordapp.com/emojis/923691826374934618.webp?size=96&quality=lossless" },
              { name: "online", url: "https://cdn.discordapp.com/emojis/901829756603998269.webp?size=96&quality=lossless" },
              { name: "duyuru", url: "https://cdn.discordapp.com/emojis/935136070377553930.webp?size=96&quality=lossless" },
              { name: "cizgi", url: "https://cdn.discordapp.com/emojis/916013869816745994.gif?size=96" },
              { name: "start", url: "https://cdn.discordapp.com/emojis/1049421057842483313.png?size=32" },
              { name: "link", url: "https://cdn.discordapp.com/emojis/1049421063555129474.png?size=32" },
              { name: "info", url: "https://cdn.discordapp.com/emojis/1049421056567418930.png?size=32" },
              { name: "yes", url: "https://cdn.discordapp.com/emojis/1049421059234988042.png?size=32" },
          ]
          const SayıEmojis = [
              { name: "sifir", url: "https://images-ext-1.discordapp.net/external/JEqmvtfS0Sj1aX84QXwB-f-Su_jH8hNPO097mEafZVg/%3Fsize%3D32/https/cdn.discordapp.com/emojis/1049421062036791458.gif" },
              { name: "bir", url: "https://images-ext-1.discordapp.net/external/asubRLTjoJhZxVRLMhAR1mqi89S3ahEWBTs5pRuiVN0/%3Fsize%3D32/https/cdn.discordapp.com/emojis/1049421071289425982.gif" },
              { name: "iki", url: "https://images-ext-2.discordapp.net/external/vfKkBXTcY2WJkeHBBKXQP8G2pYfPeipZBTgQXF0I-z8/%3Fsize%3D32/https/cdn.discordapp.com/emojis/1049421065312542751.gif" },
              { name: "uc", url: "https://images-ext-2.discordapp.net/external/xhdC0TUqgYlYYTRdtHUnkd8JSytS8cNOQ0Ew9WFKdW8/%3Fv%3D1%26size%3D48%26quality%3Dlossless/https/cdn.discordapp.com/emojis/1049436097568059393.gif" },
              { name: "dort", url: "https://images-ext-2.discordapp.net/external/g4osotIjItYiRXFxtPrPAyOqcFzxV5Lx3BVGm-7oZcU/%3Fsize%3D32/https/cdn.discordapp.com/emojis/1049421076213542982.gif" },
              { name: "bes", url: "https://images-ext-1.discordapp.net/external/gRMCxr0nN9_LfH18B6RDvG8BCAr5eKGcoUK9nTFdbQ8/%3Fsize%3D32/https/cdn.discordapp.com/emojis/1049421074238013500.gif" },
              { name: "alti", url: "https://images-ext-2.discordapp.net/external/f0W1zBwkF3FUPrAf-FiFReAxIP4_wuZ_8fez8jxp0nA/%3Fsize%3D32/https/cdn.discordapp.com/emojis/1049421069162917928.gif" },
              { name: "yedi", url: "https://images-ext-2.discordapp.net/external/t9dBncxfgCWx6E8Xr4gTfOInqR4OPl4Cnw9c1BUi058/%3Fsize%3D32/https/cdn.discordapp.com/emojis/1049436095479296000.gif" },
              { name: "sekiz", url: "https://images-ext-2.discordapp.net/external/UJg4UW9twhmk5fNoNXkmRReJt8uT5ZQNKB51sgjVSpU/%3Fsize%3D32/https/cdn.discordapp.com/emojis/1049436099749097482.gif" },
              { name: "dokuz", url: "https://images-ext-2.discordapp.net/external/h014d96qQWBKgObM1eWT7dNqnxCYrdiYtC2stcogoCo/%3Fsize%3D32/https/cdn.discordapp.com/emojis/1049436101712019586.gif" }
            ]
          emojis.forEach(async (x) => {
              if (interaction.guild.emojis.cache.find((e) => x.name === e.name)) return db.set(x.name, interaction.guild.emojis.cache.find((e) => x.name === e.name).toString());
              const emoji = await interaction.guild.emojis.create(x.url, x.name);
              await db.set(x.name, emoji.toString()); 
              message.channel.send({ content: `\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`, ephemeral: true })

            })

            SayıEmojis.forEach(async (x) => {
              if (interaction.guild.emojis.cache.find((e) => x.name === e.name)) return db.set(x.name, interaction.guild.emojis.cache.find((e) => x.name === e.name).toString());
              const emoji = await interaction.guild.emojis.create(x.url, x.name);
              await db.set(x.name, emoji.toString()); 
              message.channel.send({ content: `\`${x.name}\` isimli sayı emojisi oluşturuldu! (${emoji.toString()})`, ephemeral: true })

            })
        }
  
      })

    }
  },
};