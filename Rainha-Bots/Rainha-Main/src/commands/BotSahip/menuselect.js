const { MessageEmbed, Client, Message, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { rainhanitro, rainhanetflix, rainhaspotify, rainhaexxen, rainhablutv, rainhayoutube, star } = require("../../configs/emojis.json")
const Discord = require('discord.js');
const conf = require("../../configs/sunucuayar.json");
const ayar = require("../../configs/ayarName.json");
const god = require("../../../../../config.json");
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["rolmenü"],
    name: "menü",
    help: "rolmenü",
    category: "sahip",
    owner: true,
  },
 
    run: async (client, message, args, durum, kanal) => {

let embed = new MessageEmbed()
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setTimestamp().setColor(message.author.displayHexColor).setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })}).setThumbnail(message.guild.iconURL({ dynamic: true }))
.addField(`ROL MENÜ KURULUM`,`
\` ❯ \` Kurmak istediğiniz rol menü kategorisini aşağıdaki butonlardan seçebilirsiniz.
`)
    

let rainhawjer = await message.channel.send({
    "embeds": [embed],
      "components":[{
        "type":1,
        "components":[
                {"type":2,"style":2,"custom_id":"hepsi","label":"Hepsi (Rol Seçimler)", "emoji": { "id": "901357196124774471" } },
                {"type":2,"style":2,"custom_id":"etkinlikmenü","label":"Etkinlik/Çekiliş", "emoji": { "id": "941993742934614047" } },
                {"type":2,"style":2,"custom_id":"ilişkimenü","label":"İlişki Durumu Seçim", "emoji": { "id": "956149326877438002" } },
            ]}, {  "type":1,"components":[
                {"type":2,"style":2,"custom_id":"burçmenü","label":"Burç Seçim", "emoji": { "id": "931658529314603008" } },
                {"type":2,"style":2,"custom_id":"oyunmenü","label":"Oyun Seçim", "emoji": { "id": "956149332313243668" } },
                {"type":2,"style":2,"custom_id":"renkmenü","label":"Renk Seçim", "emoji": { "id": "746992558927904891" } },
                {"type":2,"style":4,"custom_id":"iptal","label":"İşlem İptal", "emoji": { "id": "921703086823714858" } },
               ]}
        ]})


    var filter = (xd) => xd.user.id === message.author.id;
    let collector = await rainhawjer.createMessageComponentCollector({ filter,  time: 30000 })
    
    collector.on("collect", async (button) => {
    
        if (button.customId === "hepsi") {
        await rainhawjer.delete({ timeout: 1500 });

        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `
                :tada: Sunucuda sizleri rahatsız etmemek için \`@everyone\` veya \`@here\` atmayacağız. Sadece isteğiniz doğrultusunda aşağıda bulunan tepkilere tıklarsanız Çekilişler,Etkinlikler V/K ve D/C'den haberdar olacaksınız.

\` ⦁ \` Eğer \`@Social Clup Katılımcısı\` Rolünü alırsanız sunucumuzda düzenlenecek olan etkinlikler, konserler ve oyun etkinlikleri gibi etkinliklerden haberdar olabilirsiniz. 
                        
\` ⦁ \` Eğer \`@Çekiliş Katılımcısı\`Rolünü alırsanız sunucumuzda sıkça vereceğimiz ${rainhanitro}, ${rainhaspotify}, ${rainhayoutube}, ${rainhanetflix}, ${rainhaexxen} ve benzer ödüllerin olduğu çekilişlere katılabilirsiniz. 

**NOT:** \`Kayıtlı, kayıtsız olarak hepiniz bu kanalı görebilmektesiniz. Sunucumuz da everyone veya here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın.\``,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "etkinliks", "options": [
                            { "label": "Social Clup Katılımcısı", "description": "Etkinliklerden haberdar olmak için", "value": "etkinlik", "emoji": { "id": "941075067230625803" }, },
                            { "label": "Çekiliş Katılımcısı", "description": "Çekilişlerden haberdar olmak için", "value": "cekilis", "emoji": { "id": "941074179401338900" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "Etkinlik Rolleri", "min_values": 0, "max_values": 2
                    }],
                }
                ]
            }
        })
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `${star} Aşağıda ki menüden **Burç** rollerinden dilediğinizi alabilirsiniz.`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "burc", "options": [
                            { "label": "Koç", "value": "koç", "emoji": { "id": "1123983228697583668" }, },
                            { "label": "Boğa", "value": "boğa", "emoji": { "id": "1123983221525336126" }, },
                            { "label": "İkizler", "value": "ikizler", "emoji": { "id": "1123983225467973772" }, },
                            { "label": "Yengeç", "value": "yengeç", "emoji": { "id": "1123983224511680622" }, },
                            { "label": "Aslan", "value": "aslan", "emoji": { "id": "1123983218387992727" }, },
                            { "label": "Başak", "value": "başak", "emoji": { "id": "1123983226986299563" }, },
                            { "label": "Terazi", "value": "terazi", "emoji": { "id": "1123983219499470959" }, },
                            { "label": "Akrep", "value": "akrep", "emoji": { "id": "1123983227904852068" }, },
                            { "label": "Yay", "value": "yay", "emoji": { "id": "1123983223442133032" }, },
                            { "label": "Oğlak", "value": "oğlak", "emoji": { "id": "1123983222510993448" }, },
                            { "label": "Kova", "value": "kova", "emoji": { "id": "1123983220501913600" }, },
                            { "label": "Balık", "value": "balık", "emoji": { "id": "1123983217737875588" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "Burç Rolleri", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `${star} Aşağıda ki menüden **Oyun** rollerinden dilediğinizi alabilirsiniz.`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "games", "options": [
                            { "label": "CS:GO", "value": "csgo", "emoji": { "id": "1123983205847007353" }, },
                            { "label": "League of Legends", "value": "lol", "emoji": { "id": "1123983211794546690" }, },
                            { "label": "Valorant", "value": "valorant", "emoji": { "id": "1123983210083254375" }, },
                            { "label": "Gta V", "value": "gta5", "emoji": { "id": "1123983208673968221" }, },
                            { "label": "PUBG", "value": "pubg", "emoji": { "id": "1124862277573685288" }, },
                            { "label": "Fortnite", "value": "fortnite", "emoji": { "id": "1123983214990594148" }, },
                        ], "placeholder": "Oyun Rolleri", "min_values": 0, "max_values": 6
                    }],
                }
                ]
            }
        })
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `${star} Aşağıda ki menüden **Renk** rollerinden dilediğinizi alabilirsiniz.`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "renk", "options": [
                            { "label": "Kırmızı", "description": "Kırmızı rengine sahip olmak için tıkla!", "value": "kirmizi", "emoji": { "name": "❤️" }, },
                            { "label": "Turuncu", "description": "Turuncu rengine sahip olmak için tıkla!", "value": "turuncu", "emoji": { "name": "🧡" }, },
                            { "label": "Mor", "description": "Mor rengine sahip olmak için tıkla!", "value": "mor", "emoji": { "name": "💜" }, },
                            { "label": "Pembe", "description": "Pembe rengine sahip olmak için tıkla!", "value": "pembe", "emoji": { "name": "💗" }, },
                            { "label": "Yeşil", "description": "Yeşil rengine sahip olmak için tıkla!", "value": "yesil", "emoji": { "name": "💚" }, },,
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "Renk Rolleri", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `${star} Aşağıda ki menüden **İlişki** rollerinden dilediğinizi alabilirsiniz.`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "iliski", "options": [
                            { "label": "Sevgilim Var", "value": "couple", "emoji": { "id": "1123983198846717972" }, },
                            { "label": "Sevgilim Yok", "value": "alone", "emoji": { "id": "1124862552258642042" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "İlişki Rolleri", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })
        }

        if (button.customId === "etkinlikmenü") {
        await rainhawjer.delete({ timeout: 1500 });
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `
                :tada: Sunucuda sizleri rahatsız etmemek için \`@everyone\` veya \`@here\` atmayacağız. Sadece isteğiniz doğrultusunda aşağıda bulunan tepkilere tıklarsanız Çekilişler,Etkinlikler V/K ve D/C'den haberdar olacaksınız.

\` ⦁ \` Eğer \`@Social Clup Katılımcısı\` Rolünü alırsanız sunucumuzda düzenlenecek olan etkinlikler, konserler ve oyun etkinlikleri gibi etkinliklerden haberdar olabilirsiniz. 
                        
\` ⦁ \` Eğer \`@Çekiliş Katılımcısı\` Rolünü alırsanız sunucumuzda sıkça vereceğimiz ${rainhanitro}, ${rainhaspotify}, ${rainhayoutube}, ${rainhanetflix}, ${rainhaexxen} ve benzer ödüllerin olduğu çekilişlere katılabilirsiniz.

**NOT:** \`Kayıtlı, kayıtsız olarak hepiniz bu kanalı görebilmektesiniz. Sunucumuz da everyone veya here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın.\``,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "etkinliks", "options": [
                            { "label": "Social Clup Katılımcısı", "description": "Etkinliklerden haberdar olmak için!", "value": "etkinlik", "emoji": { "id": "941075067230625803" }, },
                            { "label": "Çekiliş Katılımcısı", "description": "Çekilişlerden haberdar olmak için!", "value": "cekilis", "emoji": { "id": "941074179401338900" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "Etkinlik Rolleri", "min_values": 0, "max_values": 2
                    }],
                }
                ]
            }
        })
        }
    
        if (button.customId === "ilişkimenü") {
        await rainhawjer.delete({ timeout: 1500 });
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `${star} Aşağıda ki menüden **İlişki** rollerinden dilediğinizi alabilirsiniz.`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "iliski", "options": [
                            { "label": "Sevgilim Var", "value": "couple", "emoji": { "id": "1123983198846717972" }, },
                            { "label": "Sevgilim Yok", "value": "alone", "emoji": { "id": "1124862552258642042" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "İlişki Rolleri", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })
        }
    

        
    
        if (button.customId === "renkmenü") {
        await rainhawjer.delete({ timeout: 1500 });
        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `${star} Aşağıda ki menüden **Renk** rollerinden dilediğinizi alabilirsiniz.`,
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "renk", "options": [
                            { "label": "Kırmızı", "description": "Kırmızı rengine sahip olmak için tıkla!", "value": "kirmizi", "emoji": { "name": "❤️" }, },
                            { "label": "Turuncu", "description": "Turuncu rengine sahip olmak için tıkla!", "value": "turuncu", "emoji": { "name": "🧡" }, },
                            { "label": "Mor", "description": "Mor rengine sahip olmak için tıkla!", "value": "mor", "emoji": { "name": "💜" }, },
                            { "label": "Pembe", "description": "Pembe rengine sahip olmak için tıkla!", "value": "pembe", "emoji": { "name": "💗" }, },
                            { "label": "Yeşil", "description": "Yeşil rengine sahip olmak için tıkla!", "value": "yesil", "emoji": { "name": "💚" }, },
                            { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" }, }
                        ], "placeholder": "Renk Rolleri", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })
        }
    
        if (button.customId == "iptal") {
        await rainhawjer.delete({ timeout: 1500 });
        }
    
    }
    )}
    
}



client.on('interactionCreate', async interaction => {
const member = await client.guilds.cache.get(god.GuildID).members.fetch(interaction.member.user.id)
if (!member) return;

const etkinlik = await client.guilds.cache.get(god.GuildID).roles.cache.find(x => x.name.includes(ayar.etkinlik)).id
const cekilis = await client.guilds.cache.get(god.GuildID).roles.cache.find(x => x.name.includes(ayar.cekilis)).id
 
 if (interaction.customId === "etkinliks") {
        let eventsMap = new Map([
          ["etkinlik", etkinlik],
          ["cekilis", cekilis],
        ])
        let roles = [etkinlik, cekilis]
        var role = []
        for (let index = 0; index < interaction.values.length; index++) {
          let ids = interaction.values[index]
          let den = eventsMap.get(ids)
          var role = []
          role.push(den);
        }
        if (interaction.values[0] === "rolsil") {
            await member.roles.remove(roles)
          } else {
            if (!interaction.values.length) {
                await member.roles.remove(roles).catch(err => {})
              } else if (interaction.values.length > 1) {
                await member.roles.add(roles).catch(err => {})
              } else {
                await member.roles.remove(roles).catch(err => {})
                await member.roles.add(role).catch(err => {})
              }
          }
        interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
      } 



const kirmizi = await client.guilds.cache.get(god.GuildID).roles.cache.find(x => x.name.includes(ayar.Renkler.kirmizi)).id
const turuncu = await client.guilds.cache.get(god.GuildID).roles.cache.find(x => x.name.includes(ayar.Renkler.turuncu)).id
const mor = await client.guilds.cache.get(god.GuildID).roles.cache.find(x => x.name.includes(ayar.Renkler.mor)).id
const pembe = await client.guilds.cache.get(god.GuildID).roles.cache.find(x => x.name.includes(ayar.Renkler.pembe)).id
const yesil = await client.guilds.cache.get(god.GuildID).roles.cache.find(x => x.name.includes(ayar.Renkler.yesil)).id

if (interaction.customId === "renk") {
        let color = new Map([
          ["kirmizi", kirmizi],
          ["turuncu", turuncu],
          ["mor", mor],
          ["pembe", pembe],
          ["yesil", yesil],
  
        ])
        let role = color.get(interaction.values[0])
        let renkroller = [kirmizi, turuncu, mor, pembe, yesil]
        if (!member.roles.cache.has(conf.ekipRolu) && !member.roles.cache.has(conf.boosterRolu) && !member.permissions.has("ADMINISTRATOR")) {
            interaction.reply({ content: "Rollerin güncellenirken bir sorun meydana geldi **(İsminde Sunucu Tag'ı Yoktur veya Boost basmamışsın)**" , ephemeral: true })
        } else {
          if (interaction.values[0] === "rolsil") {
            await member.roles.remove(renkroller)
          } else if (role) {
            if (renkroller.some(m => member.roles.cache.has(m))) {
              await member.roles.remove(renkroller)
            }
            await member.roles.add(role)
          }
          interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
        }
      }

const sevgili = await client.guilds.cache.get(god.GuildID).roles.cache.find(x => x.name.includes(ayar.İlişkiler.couple)).id
const yalnız = await client.guilds.cache.get(god.GuildID).roles.cache.find(x => x.name.includes(ayar.İlişkiler.alone)).id

      if (interaction.customId === "iliski") {
        let ilişki = new Map([
            ["couple", sevgili],
            ["alone", yalnız],
          ])
          let role = ilişki.get(interaction.values[0])
          let iliskiroller = [sevgili, yalnız]

            if (interaction.values[0] === "rolsil") {
              await member.roles.remove(iliskiroller)
            } else if (role) {
              if (iliskiroller.some(m => member.roles.cache.has(m))) {
                await member.roles.remove(iliskiroller)
              }
              await member.roles.add(role)
            }
            interaction.reply({ content: "Rolleriniz düzenlendi.", ephemeral: true })
    }
})