const { SlashCommandBuilder, hyperlink  } = require("@discordjs/builders");
const { MessageEmbed, IntegrationApplication, MessageButton, MessageActionRow,  MessageSelectMenu, WebhookClient, Permissions } = require("discord.js");
const CategoryChannels = require("../Models/CategoryChannels");
const TextChannels = require("../Models/TextChannels");
const VoiceChannels = require("../Models/VoiceChannels");
const RoleModel = require("../Models/Role");
const god = require("../../../../config.json")
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("denetim")
    .setDescription("Son 1 saat de silinmiş 25 Rol/Kanal.")
    .addStringOption((option) => {
        return option
        .setName('kategori')
        .setDescription('Silinen son 25 Rol/Kanal')
          .addChoices([
            ['Rol', 'roles'],
            ['Kanal', 'channels'],
          ])
          .setRequired(true);
      }),

  async execute(interaction, bot) {
   if(!god.owners.includes(interaction.user.id)) {
      return interaction.reply({ content: "<a:warnn:1117866163565772854> **Bot developerı olmadığın için kullanamazsınız.**", ephemeral: true })
    }
       const god = interaction.options.getString("kategori");

        if (god === "roles") {
            const audit = await interaction.guild.fetchAuditLogs({ type: 'ROLE_DELETE' }).then(a => a.entries)
            let denetim = []
            const denetim2 = audit.filter(e => Date.now() - e.createdTimestamp < 1000 * 60 * 60).map(e => 
            denetim.push({
                label: `Rol İsim: ${e.changes.filter(e => e.key === 'name').map(e => e.old)}`,
                description: `${e.executor.tag}`,
                value: `${e.target.id}`
            })
            )
            
            let row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId("Silinen Son 25 Rol Listesi")
                .setPlaceholder("Aşağıdan kurmak istediğiniz rolü seçiniz.")
                .addOptions(denetim.reverse().slice(0, 25)),
            )
            if (!denetim2.length) return interaction.reply({ content: `Son 1 saat de silinmiş herhangi bir rol bulunamadı!`, ephemeral: true })
            let arr = '';
            denetim.forEach(element => {
                arr += element + "\n"
            });
            interaction.reply({ content: `Son 1 saat içinde **${denetim.length || 0}** adet rol silinmiş.`, components: [row], ephemeral: true })        

            var filter = (menu) => menu.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 1, time: 20000 });
            
            collector.on("collect", async (menu) => {
            const kurulacakRole = menu.values[0]

            if(kurulacakRole) {
            const RoleData = await RoleModel.findOne({ guildID: god.GuildID, roleID: kurulacakRole });
            if (!RoleData) return menu.reply({ content:"Belirtilen Rol ID'si ile ilgili veri tabanında veri bulunamadı!", ephemeral: true });

            setTimeout(async function(){
                const yeniRol = await interaction.guild.roles.create({
                  name: RoleData.name,
                  color: RoleData.color,
                  hoist: RoleData.hoist,
                  permissions: RoleData.permissions,
                  position: RoleData.position,
                  mentionable: RoleData.mentionable,
                  reason: "Databaseden Yeniden rol açıldı."
                });
                
                setTimeout(() => {
                  let kanalPermVeri = RoleData.channelOverwrites;
                  if (kanalPermVeri) kanalPermVeri.forEach((perm, index) => {
                    let kanal = interaction.guild.channels.cache.get(perm.id);
                    if (!kanal) return;
                    setTimeout(() => {
                      let yeniKanalPermVeri = {};
                      perm.allow.forEach(p => {
                        yeniKanalPermVeri[p] = true;
                      });
                      perm.deny.forEach(p => {
                        yeniKanalPermVeri[p] = false;
                      });
                      kanal.permissionOverwrites.create(yeniRol, yeniKanalPermVeri).catch(console.error);
                    }, index*5000);
                  });
                }, 5000); 
         
                let clientsCount = Bots.length
                let clients = getClients(clientsCount);
                let length = RoleData.members.length;
                     if (length <= 0) return console.log(`[${yeniRol.id}] Rol kurulumunda kayıtlı üye olmadığından dolayı rol dağıtımı gerçekleştirmedim.`);
menu.reply({ content:`
Başarılı bir şekilde kurulum başladı roller dağıtılıyor kanallara izinleri ekleniyor.
**Aktif İşlem;**
\`\`\`cs
Role sahip ${RoleData.members.length} üye ${clients.length} bot üye olmak üzere rolü destekçiler ile birlikte dağıtmaya başlıyorum
İşlemin biteceği tahmini süre: ${(length>1000 ? parseInt((length*(god.Guard.Guard.GiveRoleDelay/1000)) / 60)+" dakika" : parseInt(length*(god.Guard.Guard.GiveRoleDelay/1000))+" saniye")}
\`\`\``, ephemeral: true })
         
                     let availableBots = global.Bots.filter(e => !e.Busy);
                     if (availableBots.length <= 0) availableBots = global.Bots.sort((x, y) => y.Uj - x.Uj).slice(0, Math.round(length / global.Bots.length));
                     let perAnyBotMembers = Math.floor(length / availableBots.length);
                     if (perAnyBotMembers < 1) perAnyBotMembers = 1;
                     for (let index = 0; index < availableBots.length; index++) {
                         const bot = availableBots[index];
                         let ids = RoleData.members.slice(index * perAnyBotMembers, (index + 1) * perAnyBotMembers);
                         if (ids.length <= 0) { processBot(bot, false, -perAnyBotMembers); break; }
                         let guild = bot.guilds.cache.get(god.GuildID); 
                         ids.every(async id => {
                        let member = guild.members.cache.get(id);
                        if(!member){
                         console.log(`[${kurulacakRole}] Rol Kurulumundan sonra ${bot.user.username} - ${id} adlı üyeyi sunucuda bulamadım.`);
                         return true;}
                         await member.roles.add(yeniRol.id).then(e => {console.log(`[${kurulacakRole}] Rol kurulumundan sonra ${bot.user.tag} - ${member.user.username} adlı üye ${yeniRol.name} rolünü aldı.`);}).catch(e => {console.log(`[${yeniRol.id}] Olayından sonra ${bot.user.username} - ${member.user.username} adlı üyeye rol veremedim.`);});});
                          processBot(bot, false, -perAnyBotMembers); }
          
                    sendLog({ content:`${interaction.user} (\`${interaction.user.id}\`) kullanıcısı\n<#${interaction.channel.id}> (\`${interaction.channel.id}\`) kanalında \`/rol-kur\` komutu kullandı.\nKomut İçeriği: **${RoleData.name}** - (\`${RoleData.roleID}\`) rolün yedeğini kurmaya başladı.\n──────────────────────────`})
                   }, 450)      
            }
        })
        } else if (god === "channels") {
            
            const audit = await interaction.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' }).then(a => a.entries)
            let denetim = []
            const denetim2 = audit.filter(e => Date.now() - e.createdTimestamp < 1000 * 60 * 60).map(e => 
            denetim.push({
                label: `Kanal İsim: ${e.changes.filter(e => e.key === 'name').map(e => e.old)}`,
                description: `${e.executor.tag}`,
                value: `${e.target.id}`
            })
            )
            
            let row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId("Silinen Son 25 Kanal Listesi")
                .setPlaceholder("Aşağıdan kurmak istediğiniz kanalı seçiniz.")
                .addOptions(denetim.reverse().slice(0, 25)),
            )
            if (!denetim2.length) return interaction.reply({ content: `Son 1 saat de silinmiş herhangi bir kanal bulunamadı!`, ephemeral: true })
            let arr = '';
            denetim.forEach(element => {
                arr += element + "\n"
            });
            interaction.reply({ content: `Son 1 saat içinde **${denetim.length || 0}** adet kanal silinmiş.`, components: [row], ephemeral: true })    
            var filter = (menu) => menu.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 1, time: 20000 });
            
            collector.on("collect", async (menu) => {
            const kurulacakChannel = menu.values[0]

            if(kurulacakChannel) {
                const tdata = await TextChannels.findOne({ channelID: kurulacakChannel });
                const vdata = await VoiceChannels.findOne({ channelID: kurulacakChannel });
                const cdata = await CategoryChannels.findOne({ channelID: kurulacakChannel });
          
                if (tdata) {
                  newChannel = await interaction.guild.channels.create(tdata.name, {
                      type: 'GUILD_TEXT',
                      nsfw: tdata.nsfw,
                      parent: tdata.parentID,
                      position: tdata.position + 1,
                      rateLimitPerUser: tdata.rateLimit
                    })
                    await menu.reply({ content: `**${newChannel.name}** isimli Yazı Kanalının yedeği kuruluyor ve rol izinleri entegre ediliyor`, ephemeral: true })
                    const newOverwrite = [];
                    for (let index = 0; index < tdata.overwrites.length; index++) {
                      const veri = tdata.overwrites[index];
                      newOverwrite.push({
                        id: veri.id,
                        allow: new Permissions(veri.allow).toArray(),
                        deny: new Permissions(veri.deny).toArray()
                      });
                    }
                    await newChannel.permissionOverwrites.set(newOverwrite);
                    tdata.channelID = newChannel.id
                    tdata.save()
                return } else if (vdata) {
                  newChannel = await interaction.guild.channels.create(vdata.name, {
                    type: 'GUILD_VOICE',
                    bitrate: vdata.bitrate,
                    userLimit: vdata.userLimit,
                    parent: vdata.parentID,
                    position: vdata.position
                  })
                  await menu.reply({ content: `**${newChannel.name}** isimli Ses Kanalının yedeği kuruluyor ve rol izinleri entegre ediliyor`, ephemeral: true })
                  const newOverwrite = [];
                  for (let index = 0; index < vdata.overwrites.length; index++) {
                    const veri = vdata.overwrites[index];
                    newOverwrite.push({
                      id: veri.id,
                      allow: new Permissions(veri.allow).toArray(),
                      deny: new Permissions(veri.deny).toArray()
                    });
                  }
                  await newChannel.permissionOverwrites.set(newOverwrite);
                  vdata.channelID = newChannel.id
                  vdata.save()
              return } else if (cdata) {
                  const newChannel = await interaction.guild.channels.create(cdata.name, {
                    type: 'GUILD_CATEGORY',
                    position: cdata.position + 1,
                  });
                  await menu.reply({ content: `**${newChannel.name}** isimli kategori yedeği kuruluyor ve kanallar içine aktarılıyor`, ephemeral: true })
                  const textChannels = await TextChannels.find({ parentID: kurulacakChannel });
                  await TextChannels.updateMany({ parentID: kurulacakChannel }, { parentID: newChannel.id });
                  textChannels.forEach(c => {
                    const textChannel = interaction.guild.channels.cache.get(c.channelID);
                    if (textChannel) textChannel.setParent(newChannel, { lockPermissions: false });
                  });
                  const voiceChannels = await VoiceChannels.find({ parentID: kurulacakChannel });
                  await VoiceChannels.updateMany({ parentID: kurulacakChannel }, { parentID: newChannel.id });
                  voiceChannels.forEach(c => {
                    const voiceChannel = interaction.guild.channels.cache.get(c.channelID);
                    if (voiceChannel) voiceChannel.setParent(newChannel, { lockPermissions: false });
                  });
                  const newOverwrite = [];
                  for (let index = 0; index < cdata.overwrites.length; index++) {
                    const veri = cdata.overwrites[index];
                    newOverwrite.push({
                      id: veri.id,
                      allow: new Permissions(veri.allow).toArray(),
                      deny: new Permissions(veri.deny).toArray()
                    });
                  }
                  await newChannel.permissionOverwrites.set(newOverwrite);
                  cdata.channelID = newChannel.id
                  cdata.save()
              return }
              if (!tdata || !vdata || !cdata) return menu.reply({ content: "Belirtilen kanal ID'sine ait veri bulunamadı!", ephemeral: true }) 
            }
        })       
    }
}
};

const webHook = new WebhookClient({ id: god.Guard.Logs.WebHookID, token: god.Guard.Logs.WebHookToken });
async function sendLog(message) {
    webHook.send(message)
}

function giveBot(length) {
  if (length > global.Bots.length) length = global.Bots.length;
  let availableBots = global.Bots.filter(e => !e.Busy);
  if (availableBots.length <= 0) availableBots = global.Bots.sort((x, y) => x.Uj - y.Uj).slice(0, length);

  return availableBots;
}

function processBot(bot, busy, job, equal = false) {
  bot.Busy = busy;
  if (equal) bot.Uj = job;
  else bot.Uj += job;

  let index = global.Bots.findIndex(e => e.user.id == bot.user.id);
  global.Bots[index] = bot;
}

function getClients(count) {
  return Bots.slice(0, count);
}