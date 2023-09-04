const { GuildMember, GuildAuditLogsEntry, WebhookClient, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const Discord  = require("discord.js");

const { getVoiceConnection, joinVoiceChannel } = require("@discordjs/voice");
const RoleModel = require("./src/Models/Role");
const SafeMember = require("./src/Models/Safe");

const CategoryChannels = require("./src/Models/CategoryChannels");
const TextChannels = require("./src/Models/TextChannels");
const VoiceChannels = require("./src/Models/VoiceChannels");

const QueryManager = require("./src/query");
const request = require("request");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const setup = require('../Rainha-Main/src/configs/sunucuayar.json');
const god = require('../../config.json');

const RoleGuard = new Discord.Client({ fetchAllMembers: true, intents: 32767 }); 
const ChannelGuard = new Discord.Client({ fetchAllMembers: true, intents: 32767 });
const OtherGuard = new Discord.Client({ fetchAllMembers: true, intents: 32767 });

/////
const { Client } = require('discord.js-selfbot-v13');
const tacuser = new Client({ checkUpdate: false });

if (god.Guard.TaçHesapToken.length > 0) {
    tacuser.on('ready', async () => {
      console.log(`${tacuser.user.username} isimli Taç Guard Aktif!`);
    });
    tacuser.login(god.Guard.TaçHesapToken)  
}
///////

RoleGuard.on("ready", async () => {
    setInterval(() => {
      const oynuyor = god.BotDurum;
      const index = Math.floor(Math.random() * (oynuyor.length));

      RoleGuard.user.setActivity(`${oynuyor[index]}`, {
        type: "STREAMING",
        url: "https://www.twitch.tv/mertxdll"});

    }, 10000);
    console.log("Rol koruma botu aktif.");
});
RoleGuard.login(god.Guard.RoleGuard);

ChannelGuard.on("ready", () => {
    setInterval(() => {
        const oynuyor = god.BotDurum;
        const index = Math.floor(Math.random() * (oynuyor.length));
  
        ChannelGuard.user.setActivity(`${oynuyor[index]}`, {
          type: "STREAMING",
          url: "https://www.twitch.tv/mertxdll"});
  
      }, 10000);
    console.log("Kanal koruma botu aktif.");
});
ChannelGuard.login(god.Guard.ChannelGuard);

OtherGuard.on("ready", () => {
    
    const guild = OtherGuard.guilds.cache.first();
    const connection = getVoiceConnection(guild.id);
    if (connection) return;

    joinVoiceChannel({
        channelId: god.BotSesKanal,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
        selfDeaf: true
    });
    setInterval(() => {
        const oynuyor = god.BotDurum;
        const index = Math.floor(Math.random() * (oynuyor.length));
  
        OtherGuard.user.setActivity(`${oynuyor[index]}`, {
          type: "STREAMING",
          url: "https://www.twitch.tv/mertxdll"});
  
      }, 10000);
      
    console.log("Harici koruma botu aktif.");
    rolbackup();
    kanalbackup();
    setInterval(async () => {
        await rolbackup();
        await kanalbackup();
    }, 1000 * 60 * 60 * 3)
});
OtherGuard.login(god.Guard.OtherGuard);

const Bots = global.Bots = [];

god.Guard.Guards.forEach(async token => {
const guardClient = global.client = new Discord.Client({ fetchAllMembers: true, intents: 32767 });

guardClient.on("ready", () => {
  console.log(`(${guardClient.user.username}) adlı destekçi hesapta [${guardClient.guilds.cache.get(god.GuildID).name}] adlı sunucuda giriş yapıldı.`);
  guardClient.user.setPresence({ status: "streaming" });
  guardClient.Busy = false;
  guardClient.Uj = 0;
  Bots.push(guardClient);

  guardClient.queryManager = new QueryManager();
  guardClient.queryManager.init(god.Guard.Guard.TaskDelay); 
});

await guardClient.login(token).then(e => {}).catch(e => {console.error(`${token.substring(Math.floor(token.length / 2))} adlı bota giriş yapılırken başarısız olundu!.`)})
});

RoleGuard.on("guildMemberUpdate", async (oldMember, newMember) => {
    if (oldMember.roles.cache.size != newMember.roles.cache.size) {
        let diffRoles = newMember.roles.cache.filter(o => !oldMember.roles.cache.has(o.id));
        let perms = god.Guard.StaffPerm
        if (!diffRoles.some(e => perms.some(perm => e.permissions.has(perm)))) {
            return;
        }
        let logs = await oldMember.guild.fetchAuditLogs({
            limit: 1,
            type: "MEMBER_ROLE_UPDATE"
        });
        let entry = logs.entries.first();
        if (!entry || entry.executor.bot || await checkPermission(RoleGuard, entry.executor.id, "full") || await checkPermission(RoleGuard, entry.executor.id, "role") || await checkPermission(RoleGuard, entry.executor.id, "roleandchannel")) return;
        let member = await oldMember.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
        if (member) {
         await cezaVer(RoleGuard, member.id, "jail")
        }
        newMember.roles.set(oldMember.roles.cache.map(r => r.id));

        const rainha = new MessageEmbed()
        .setColor("000001")
        .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
        .setDescription(`
${entry.executor} üyesi izinsiz yönetici rolü verdi ve üyeden rolü alıp, rolü veren kişiyi banladım.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Kullanıcı: ${newMember.user} - \`${newMember.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return sendLog({ embeds: [rainha] })
    }
});

let roleCreateLimit = {};
RoleGuard.on("roleCreate", async (role) => {
    let logs = await role.guild.fetchAuditLogs({
        type: "ROLE_CREATE"
    });
    let entry = logs.entries.first();
    if (!entry || entry.executor.bot || await checkPermission(RoleGuard, entry.executor.id, "full") || await checkPermission(RoleGuard, entry.executor.id, "role") || await checkPermission(RoleGuard, entry.executor.id, "roleandchannel")) return;
    if (!roleCreateLimit[entry.executor.id]) roleCreateLimit[entry.executor.id] = 0;
    if (roleCreateLimit[entry.executor.id] && roleCreateLimit[entry.executor.id] >= god.Guard.Limit.RoleCreate) {
        roleCreateLimit[entry.executor.id] = 0;
        cezaVer(RoleGuard, entry.executor.id, "jail");
        role.delete({
            reason: "Role Guard"
        })

        const rainha = new MessageEmbed()
        .setColor("000001")
        .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
        .setDescription(`
${entry.executor} üyesi **${god.Guard.Limit.RoleCreate}** limitinden fazla rol açmayı denediği için jaile attım.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return sendLog({ embeds: [rainha] });
    };
    roleCreateLimit[entry.executor.id] += 1;
    setTimeout(() => {
        roleCreateLimit[entry.executor.id] = 0;
    }, 1000 * 60 * 3);

    const rainha = new MessageEmbed()
    .setColor("000001")
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
    .setDescription(`
${entry.executor} üyesinin geriye kalan rol açma limiti: **${roleCreateLimit[entry.executor.id]}/${god.Guard.Limit.RoleCreate}**.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return sendLog({ embeds: [rainha] });
});


RoleGuard.on("roleUpdate", async (oldRole, newRole) => {
let entry = await newRole.guild.fetchAuditLogs({ type: 'ROLE_UPDATE' }).then(audit => audit.entries.first());

if (entry.executor.bot) return;
if (!entry || !entry.executor || await checkPermission(RoleGuard, entry.executor.id, "full") || await checkPermission(RoleGuard, entry.executor.id, "role") || await checkPermission(RoleGuard, entry.executor.id, "roleandchannel")) return;

newRole.edit(oldRole)
cezaVer(RoleGuard, entry.executor.id, "jail");

});

RoleGuard.on("roleDelete", async (role) => {
        let veri = await SafeMember.findOne({
        guildID: role.guild.id
    }) || {
        "Full": [],
        "RoleAndChannel": [],
        "Role": [],
        "Channel": [],
        "Bot": [],
        "BanAndKick": [],
        "ChatG": [],
        "Permissions": [],
        "SafeRole": []
    };
    let logs = await role.guild.fetchAuditLogs({
        limit: 1,
        type: "ROLE_DELETE"
    });
    let entry = logs.entries.first();

   if (entry.executor.bot) return;
    if ((!entry || await checkPermission(RoleGuard, entry.executor.id, "full") || await checkPermission(RoleGuard, entry.executor.id, "role") || await checkPermission(RoleGuard, entry.executor.id, "roleandchannel")) && !veri.SafeRole.includes(role.id)) {

        const rainha = new MessageEmbed()
        .setColor("000001")
        .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
        .setDescription(`
${entry.executor} üyesi rol sildi, güvenli listede bulunduğu için işlem yapmadım.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Silinen Rol: ${role.name} - \`${role.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return sendLog({ embeds: [rainha] });
    }

    let member = await role.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);

       cezaVer(RoleGuard, member.id, "ban")

let data = await RoleModel.findOne({ guildID: role.guild.id, roleID: role.id })

    const newRole = await role.guild.roles.create({
        name: data.name,
        color: data.color,
        hoist: data.hoist,
        permissions: data.permissions,
        position: data.position,
        mentionable: data.mentionable,
        reason: "Rol Silindiği İçin Tekrar Oluşturuldu!"
      });

      let kanalPermVeri = data.channelOverwrites.filter(e => RoleGuard.guilds.cache.get(god.GuildID).channels.cache.get(e.id))
      if (kanalPermVeri) kanalPermVeri.forEach((perm, index) => {
        let kanal = role.guild.channels.cache.get(perm.id);
        if (!kanal) return;
        setTimeout(() => {
          let yeniKanalPermVeri = {};
          perm.allow.forEach(p => {
            yeniKanalPermVeri[p] = true;
          });
          perm.deny.forEach(p => {
            yeniKanalPermVeri[p] = false;
          });
          kanal.permissionOverwrites.create(newRole, yeniKanalPermVeri).catch(console.error);
        }, index * 5000);
      });

     await RoleModel.updateOne({ guildID: role.guild.id, roleID: role.id }, { $set: { roleID: newRole.id }})

     let length = data.members.length;
     let clientsCount = Bots.length
     let clients = getClients(clientsCount);

     if (!data || length <= 0) {
        const rainha = new MessageEmbed()
        .setColor("000001")
        .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
        .setDescription(`
${entry.executor} üyesi rol sildi, sunucudan yasakladım ancak silinen rol için bir veri olmadığı için hiçbir şey yapamadım.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Silinen Rol: ${role.name} - \`${role.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return sendLog({ embeds: [rainha] });
    }
    

    let availableBots = global.Bots.filter(e => !e.Busy);
    if (availableBots.length <= 0) availableBots = global.Bots.sort((x, y) => y.Uj - x.Uj).slice(0, Math.round(length / global.Bots.length));
    let perAnyBotMembers = Math.floor(length / availableBots.length);
    if (perAnyBotMembers < 1) perAnyBotMembers = 1;
    for (let index = 0; index < availableBots.length; index++) {
        const bot = availableBots[index];
        let ids = data.members.slice(index * perAnyBotMembers, (index + 1) * perAnyBotMembers);
        if (ids.length <= 0) { processBot(bot, false, -perAnyBotMembers); break; }
        let guild = bot.guilds.cache.get(god.GuildID); 
        ids.every(async id => {
        let member = guild.members.cache.get(id);
        if(!member){
        console.log(`Oto Silinen Rol Kurulumundan sonra ${bot.user.username} - ${id} adlı üyeyi sunucuda bulamadım.`);
        return true;}
        await member.roles.add(newRole.id).then(e => {console.log(`Oto Silinen Rol kurulumundan sonra ${bot.user.tag} - ${member.user.username} adlı üye ${newRole.name} rolünü aldı.`);}).catch(e => {console.log(`[${newRole.id}] Olayından sonra ${bot.user.username} - ${member.user.username} adlı üyeye rol veremedim.`);});});
         processBot(bot, false, -perAnyBotMembers); }

            const rainha = new MessageEmbed()
            .setColor("000001")
            .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
            .setDescription(`
${entry.executor} üyesi rol sildi, sunucudan yasakladım.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Silinen Rol: ${role.name} - \`${role.id}\`
**Aktif İşlem;**
\`\`\`cs
Role sahip ${data.members.length} üye ${clients.length}'ı bot üye olmak üzere rolü destekçiler ile birlikte dağıtmaya başlıyorum
İşlemin biteceği tahmini süre: ${(length>1000 ? parseInt((length*(god.Guard.Guard.GiveRoleDelay/1000)) / 60)+" dakika" : parseInt(length*(god.Guard.Guard.GiveRoleDelay/1000))+" saniye")}
\`\`\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)
    
    sendLog({ embeds: [rainha] });
   
});

//#endrainhawjer
//#rainhawjer Kanal Koruma

ChannelGuard.on("channelDelete", async (channel) => {

    let logs = await channel.guild.fetchAuditLogs({
        limit: 1,
        type: "CHANNEL_DELETE"
    });
    let entry = logs.entries.first();

    if (!entry || entry.executor.bot || await checkPermission(ChannelGuard, entry.executor.id, "full") || await checkPermission(ChannelGuard, entry.executor.id, "channel") || await checkPermission(ChannelGuard, entry.executor.id, "roleandchannel")) {

if ((channel.type === 'GUILD_TEXT') || (channel.type === 'GUILD_NEWS') || (channel.type === 'GUILD_VOICE')) {

    const rainha = new MessageEmbed()
    .setColor("000001")
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
    .setDescription(`
${entry.executor} üyesi kanal sildi, güvenli listede olduğu için işlem yapmadım.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Silinen Kanal: ${channel.name} - \`${channel.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return sendLog({ embeds: [rainha] });
} else if (channel.type === 'GUILD_CATEGORY') {

    const rainha = new MessageEmbed()
    .setColor("000001")
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
    .setDescription(`
${entry.executor} üyesi kategori sildi, güvenli listede olduğu için işlem yapmadım.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Silinen Kategori: ${channel.name} - \`${channel.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return sendLog({ embeds: [rainha] });

}
    }

let member = await channel.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
await cezaVer(ChannelGuard, member.id, "ban");

if ((channel.type === 'GUILD_TEXT') || (channel.type === 'GUILD_NEWS')) {

        const rainha = new MessageEmbed()
        .setColor("000001")
        .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
        .setDescription(`
${entry.executor} üyesi kanal sildi, sunucudan yasaklayıp, silinen kanalı izinleriyle birlikte yeniden oluşturdum.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Silinen Kanal: ${channel.name} - \`${channel.id}\`
Kanal Türü: \` Yazı Kanalı \`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

sendLog({ embeds: [rainha] });
} else if (channel.type === 'GUILD_VOICE') {

    const rainha = new MessageEmbed()
    .setColor("000001")
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
    .setDescription(`
${entry.executor} üyesi kanal sildi, sunucudan yasaklayıp, silinen kanalı izinleriyle birlikte yeniden oluşturdum.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Silinen Kanal: ${channel.name} - \`${channel.id}\`
Kanal Türü: \` Ses Kanalı \`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

sendLog({ embeds: [rainha] });
} else if (channel.type === 'GUILD_CATEGORY') {

    const rainha = new MessageEmbed()
    .setColor("000001")
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
    .setDescription(`
${entry.executor} üyesi kategori sildi, sunucudan yasaklayıp, silinen kategoriyi izinleriyle birlikte yeniden oluşturup kanallarını içine taşıdım.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Silinen Kategori: ${channel.name} - \`${channel.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

sendLog({ embeds: [rainha] });
}

const tdata = await TextChannels.findOne({ channelID: channel.id });
const vdata = await VoiceChannels.findOne({ channelID: channel.id });
const cdata = await CategoryChannels.findOne({ channelID: channel.id });

let newChannel;
if ((channel.type === 'GUILD_TEXT') || (channel.type === 'GUILD_NEWS')) {
    newChannel = await channel.guild.channels.create(channel.name, {
    type: channel.type,
    topic: channel.topic,
    nsfw: channel.nsfw,
    parent: channel.parent,
    position: tdata.position + 1,
    rateLimitPerUser: channel.rateLimitPerUser
  });
  await TextChannels.updateMany({ channelID: channel.id }, { channelID: newChannel.id });
}
if (channel.type === 'GUILD_VOICE') {
  newChannel = await channel.guild.channels.create(channel.name, {
    type: channel.type,
    bitrate: channel.bitrate,
    userLimit: channel.userLimit,
    parent: channel.parent,
    position: vdata.position
  });
  await VoiceChannels.updateMany({ channelID: channel.id }, { channelID: newChannel.id });
}
if (channel.type === 'GUILD_CATEGORY') {
    if (!channel.id) return;
     if (!cdata) return;
        const newChannel2 = await channel.guild.channels.create(cdata.name, {
          type: 'GUILD_CATEGORY',
          position: cdata.position + 1,
        });
        const textChannels = await TextChannels.find({ parentID: channel.id });
        await TextChannels.updateMany({ parentID: channel.id }, { parentID: newChannel2.id });
        textChannels.forEach(c => {
          const textChannel = channel.guild.channels.cache.get(c.channelID);
          if (textChannel) textChannel.setParent(newChannel2, { lockPermissions: false });
        });
        const voiceChannels = await VoiceChannels.find({ parentID: channel.id });
        await VoiceChannels.updateMany({ parentID: channel.id }, { parentID: newChannel2.id });
        voiceChannels.forEach(c => {
          const voiceChannel = channel.guild.channels.cache.get(c.channelID);
          if (voiceChannel) voiceChannel.setParent(newChannel2, { lockPermissions: false });
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
        await newChannel2.permissionOverwrites.set(newOverwrite);
        await VoiceChannels.updateMany({ channelID: channel.id }, { channelID: newChannel.id });

    return };

channel.permissionOverwrites.cache.forEach(perm => {
    let thisPermOverwrites = {};
    perm.allow.toArray().forEach(p => {
      thisPermOverwrites[p] = true;
    });
    perm.deny.toArray().forEach(p => {
      thisPermOverwrites[p] = false;
    });
    newChannel.permissionOverwrites.create(perm.id, thisPermOverwrites);
  });

});


ChannelGuard.on("channelUpdate", async (oldChannel, newChannel) => {
let entry = await newChannel.guild.fetchAuditLogs({ type: 'CHANNEL_OVERWRITE_UPDATE' }).then(audit => audit.entries.first());
if (entry.executor.bot) return;

if (!entry || !entry.executor || !newChannel.guild.channels.cache.has(newChannel.id) || await checkPermission(ChannelGuard, entry.executor.id, "full") || await checkPermission(ChannelGuard, entry.executor.id, "channel") || await checkPermission(RoleGuard, entry.executor.id, "roleandchannel")) return;

await newChannel.permissionOverwrites.set([...oldChannel.permissionOverwrites.cache.values()]);
cezaVer(ChannelGuard, entry.executor.id, "jail");

});


let channelCreateLimit = {};
ChannelGuard.on("channelCreate", async (channel) => {
    let logs = await channel.guild.fetchAuditLogs({
        type: "CHANNEL_CREATE"
    });
    let entry = logs.entries.first();
    if (!entry || entry.executor.bot || await checkPermission(ChannelGuard, entry.executor.id, "full") || await checkPermission(ChannelGuard, entry.executor.id, "channel") || await checkPermission(ChannelGuard, entry.executor.id, "roleandchannel")) return;
    if (!channelCreateLimit[entry.executor.id]) channelCreateLimit[entry.executor.id] = 0;
    if (channelCreateLimit[entry.executor.id] >= god.Guard.Limit.ChannelCreate) {
        cezaVer(ChannelGuard, entry.executor.id, "jail");
        channelCreateLimit[entry.executor.id] = 0;

        const rainha = new MessageEmbed()
        .setColor("000001")
        .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
        .setDescription(`
${entry.executor} üyesi **${god.Guard.Limit.ChannelCreate}** limitinden fazla kanal açmayı denediği için jaile attım.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return sendLog({ embeds: [rainha] });

    }
    channelCreateLimit[entry.executor.id] += 1;
    setTimeout(() => {
        channelCreateLimit[entry.executor.id] = 0;
    }, 1000 * 60 * 3);

    const rainha = new MessageEmbed()
    .setColor("000001")
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
    .setDescription(`
${entry.executor} üyesinin geriye kalan kanal açma limiti: **${channelCreateLimit[entry.executor.id]}/${god.Guard.Limit.ChannelCreate}**.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return sendLog({ embeds: [rainha] });
});

//#endrainhawjer

//#rainhawjer Harici Koruma

let BanLimit = {};

OtherGuard.on("guildBanAdd", async (orospu) => {
    const logs = await orospu.guild.fetchAuditLogs({
        type: "MEMBER_BAN_ADD"
    });
    /**
     * @type {GuildAuditLogsEntry}
     */
    let entry = logs.entries.first();

    if (!logs || !entry || entry.executor.bot || await checkPermission(OtherGuard, entry.executor.id, "full") || await checkPermission(OtherGuard, entry.executor.id, "banandkick") || await checkPermission(OtherGuard, entry.executor.id, "roleandchannel")) return;
    if (entry.executor.id === orospu.user.id) return;

    let victimMember = await orospu.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
    if (BanLimit[entry.executor.id] && BanLimit[entry.executor.id].Now + 1 > god.Guard.Limit.Ban) {
        orospu.guild.members.unban(orospu.user.id);
        if (victimMember) {
            BanLimit[entry.executor.id] = {
                Now: 1,
                Last: Date.now()
            }
            await cezaVer(OtherGuard, victimMember.id, "ban")
        }
        BanLimit[entry.executor.id].Now += 1;

        const rainha = new MessageEmbed()
        .setColor("000001")
        .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
        .setDescription(`
${entry.executor} yetkilisi **${god.Guard.Limit.Ban}** Ban limitini geçtiği için kendisi banlandı ve banlanan üyenin banı kaldırıldı.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Kullanıcı: \`${orospu.user.tag}\` - \`${orospu.user.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return sendLog({ embeds: [rainha] });
    } else if (!BanLimit[entry.executor.id]) {
        BanLimit[entry.executor.id] = {
            Now: 1,
            Last: Date.now()
        };

        const rainha = new MessageEmbed()
        .setColor("000001")
        .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
        .setDescription(`
${entry.executor} yetkilisi kalan Ban Limit: **${1}/${god.Guard.Limit.Ban}**.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Kullanıcı: \`${orospu.user.tag}\` - \`${orospu.user.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return sendLog({ embeds: [rainha] });
    } else {
        BanLimit[entry.executor.id].Now += 1;
        setTimeout(() => {
            BanLimit[entry.executor.id] = {
                Now: 1,
                Last: Date.now()
            }
        }, 1000 * 60 * 3);

        const rainha = new MessageEmbed()
        .setColor("000001")
        .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
        .setDescription(`
${entry.executor} yetkilisi kalan Ban Limit: **${BanLimit[entry.executor.id].Now}/${god.Guard.Limit.Ban}**.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Kullanıcı: \`${orospu.user.tag}\` - \`${orospu.user.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return sendLog({ embeds: [rainha] });
    }
});

let KickLimit = {};

OtherGuard.on("guildMemberRemove", async (member) => {

    let entry = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first());
    if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || entry.executor.bot || await checkPermission(OtherGuard, entry.executor.id, "full") || await checkPermission(OtherGuard, entry.executor.id, "banandkick") || await checkPermission(OtherGuard, entry.executor.id, "roleandchannel")) return;
    if (entry.executor.id === member.id) return;

    let victimMember = await member.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
    if (KickLimit[entry.executor.id] && KickLimit[entry.executor.id].Now + 1 > god.Guard.Limit.Kick) {
        if (victimMember) {
            KickLimit[entry.executor.id] = {
                Now: 1,
                Last: Date.now()
            }
            await cezaVer(OtherGuard, victimMember.id, "ban")
        }
        KickLimit[entry.executor.id].Now += 1;
        const rainha = new MessageEmbed()
        .setColor("000001")
        .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
        .setDescription(`
${entry.executor} yetkilisi **${god.Guard.Limit.Kick}** Kick limitini geçtiği için sunucudan banlandı.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Kullanıcı: \`${member.user.tag}\` - \`${member.user.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return sendLog({ embeds: [rainha] });
    } else if (!KickLimit[entry.executor.id]) {
        KickLimit[entry.executor.id] = {
            Now: 1,
            Last: Date.now()
        };
        const rainha = new MessageEmbed()
        .setColor("000001")
        .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
        .setDescription(`
${entry.executor} yetkilisi kalan Kick Limit: **${1}/${god.Guard.Limit.Kick}**.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Kullanıcı: \`${member.user.tag}\` - \`${member.user.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return sendLog({ embeds: [rainha] });
    } else {
        KickLimit[entry.executor.id].Now += 1;
        setTimeout(() => {
            KickLimit[entry.executor.id] = {
                Now: 1,
                Last: Date.now()
            }
        }, 1000 * 60 * 3);
        const rainha = new MessageEmbed()
        .setColor("000001")
        .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
        .setDescription(`
${entry.executor} yetkilisi kalan Kick Limit: **${KickLimit[entry.executor.id].Now}/${god.Guard.Limit.Kick}**.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Kullanıcı: \`${member.user.tag}\` - \`${member.user.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)

return sendLog({ embeds: [rainha] });
    }
});


OtherGuard.on("guildMemberAdd", async (member) => {
    if (!member.user.bot) return;

    let logs = await member.guild.fetchAuditLogs({
        type: "BOT_ADD"
    });
    /**
     * @type {GuildAuditLogsEntry}
     */
    let entry = logs.entries.first();

    if (!entry || await checkPermission(OtherGuard, entry.executor.id, "bot")) return;
    
    await cezaVer(OtherGuard, member.id, "ban")

    let victimMember = await member.guild.members.fetch(entry.executor.id).then(m => m).catch(() => undefined);
    if (victimMember) {
        await cezaVer(OtherGuard, victimMember.id, "ban")
    }

    const rainha = new MessageEmbed()
    .setColor("000001")
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))   
    .setDescription(`
${entry.executor} üyesi izinsiz sunucuya bot ekledi ve yetkiliyi banlayıp, eklenen botu banladım.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Bot: ${member.user} - \`${member.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)
    
return sendLog({ embeds: [rainha] });
});

const logs = require('discord-logs');
logs(OtherGuard);

let baglantiKesmeLimit = {};
let susturmaLimit = {};

// OtherGuard.on("voiceStateUpdate", async (oldState, newState) => {
//     let logs = await oldState.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_DISCONNECT" });
//     let entry = logs.entries.first();
//     if (!logs || !entry || !newState.member || !entry.executor || await checkPermission(OtherGuard, entry.executor.id, "full") || await checkPermission(OtherGuard, entry.executor.id, "roleandchannel") || entry.executor.bot) return;
//     if (newState.member.id == entry.executor.id) return;

//     if (oldState.channel && !newState.channel) {
//     if (!baglantiKesmeLimit[entry.executor.id]) baglantiKesmeLimit[entry.executor.id] = 0;
//     if (baglantiKesmeLimit[entry.executor.id] && baglantiKesmeLimit[entry.executor.id] >= god.Guard.Limit.BaglantiKesme) {
//         baglantiKesmeLimit[entry.executor.id] = 0;
//         cezaVer(OtherGuard, entry.executor.id, "jail");

//         const rainha = new MessageEmbed()
//         .setColor("000001")
//         .setThumbnail(entry.executor.avatarURL({ dynamic: true }))   
//         .setDescription(`
// ${entry.executor} adlı yetkili bağlantı kesme sınırını aştığı için jail'e gönderildi.
// ─────────────────────
// Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
// ─────────────────────
// Tarih: \`${moment(Date.now()).format("LLL")}\``)
        
//     return sendLog({ embeds: [rainha] });
//     }};
//     baglantiKesmeLimit[entry.executor.id] += 1;
//     setTimeout(() => {
//         baglantiKesmeLimit[entry.executor.id] = 0;
//     }, 1000 * 60 * 3);
// });

OtherGuard.on("voiceStateUpdate", async (oldState, newState) => {
    let logs = await oldState.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_UPDATE" });
    let entry = logs.entries.first();
    if (!logs || !entry.executor || await checkPermission(OtherGuard, entry.executor.id, "full") || await checkPermission(OtherGuard, entry.executor.id, "roleandchannel") || entry.executor.bot) return;
    if (newState.member.id == entry.executor.id) return;

    if (!oldState.serverMute && newState.serverMute) {
    if (!susturmaLimit[entry.executor.id]) susturmaLimit[entry.executor.id] = 0;
    if (susturmaLimit[entry.executor.id] && susturmaLimit[entry.executor.id] >= god.Guard.Limit.Susturma) {
        susturmaLimit[entry.executor.id] = 0;
        cezaVer(OtherGuard, entry.executor.id, "jail");
        const rainha = new MessageEmbed()
        .setColor("000001")
        .setThumbnail(entry.executor.avatarURL({ dynamic: true }))   
        .setDescription(`
${entry.executor} adlı yetkili sağ-tık susturma sınırını aştığı için jail'e gönderildi.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)
        
    return sendLog({ embeds: [rainha] });
    }};
    susturmaLimit[entry.executor.id] += 1;
    setTimeout(() => {
        susturmaLimit[entry.executor.id] = 0;
    }, 1000 * 60 * 3);
});

OtherGuard.on("guildUpdate", async (oldGuild, newGuild) => {
    let entry = await newGuild.fetchAuditLogs({
        type: 'GUILD_UPDATE',
        limit: 1
    }).then(audit => audit.entries.first());
    if(oldGuild.vanityURLCode === newGuild.vanityURLCode) return;   

    let data = await oldGuild.fetchVanityData();

    if (data.code !== setup.serverUrl) {
        let random = god.Guard.Guards[Math.floor(Math.random() * god.Guard.Guards.length)];
        request({
            url: `https://discord.com/api/guilds/${god.GuildID}/vanity-url`,
            body: {
                code: setup.serverUrl
            },
            json: true,
            method: 'PATCH',
            headers: {
                "Authorization": `Bot ${random}`
            }
        });
        cezaVer(OtherGuard, entry.executor.id, "ban");
    }
    if (!entry || entry.executor.bot) return;
    const rainha = new MessageEmbed()
    .setColor("000001")
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))   
    .setDescription(`
${entry.executor} adlı yetkili URL'yi Elledi ve sunucudan banlayıp urlyi spamladım.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)
    
return sendLog({ content: `@here`, embeds: [rainha] });

});

OtherGuard.on("ready", () => {
const guild = OtherGuard.guilds.cache.get(god.GuildID)
let random = god.Guard.Guards[Math.floor(Math.random() * god.Guard.Guards.length)];

setInterval(async () => {
if(guild.vanityURLCode == setup.serverUrl) {
return } else {
rainhawjer(setup.serverUrl, god.GuildID, `${random}`)
}}, 1 * 500)})


OtherGuard.on("guildUpdate", async (oldGuild, newGuild) => {
    let entry = await newGuild.fetchAuditLogs({
        type: 'GUILD_UPDATE',
        limit: 1
    }).then(audit => audit.entries.first());

    if (!entry || entry.executor.bot || await checkPermission(OtherGuard, entry.executor.id, "full") || await checkPermission(OtherGuard, entry.executor.id, "roleandchannel")) return;
    cezaVer(OtherGuard, entry.executor.id, "jail");

    if (newGuild.name !== oldGuild.name) await newGuild.setName(oldGuild.name);
    if (newGuild.iconURL({dynamic: true, size: 2048}) !== oldGuild.iconURL({dynamic: true, size: 2048})) await newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));
    if (oldGuild.banner !== newGuild.banner) await newGuild.setBanner(oldGuild.bannerURL({ size: 4096 }));

    const rainha = new MessageEmbed()
    .setColor("000001")
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))   
    .setDescription(`
${entry.executor} adlı yetkili Sunucu Ayarlarını Elledi, sunucuyu eski haline getirdim ve kullanıcıyı jail attım.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)
    
return sendLog({ embeds: [rainha] });

});

OtherGuard.on("guildUnavailable", async (guild) => {

const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS_AND_STICKERS", "MANAGE_WEBHOOKS"]
OtherGuard.guilds.cache.get(god.GuildID).roles.cache.filter(rol => rol.editable).filter(rol => yetkiPermleri.some(yetki => rol.permissions.has(yetki))).forEach(async (rol) => rol.setPermissions(0n));

const rainha = new MessageEmbed()
.setColor("000001")
.setThumbnail(entry.executor.avatarURL({ dynamic: true }))   
.setDescription(`
Sunucu kullanılmaz hale getirildiği için otomatik olarak sunucu içerisindeki tüm yönetici, rol yönet, kanal yönet ve diğer izinleri tamamiyle kapattım.
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)
    
return sendLog({ embeds: [rainha] });

});

OtherGuard.on("webhookUpdate", async (channel) => {
    let logs = await channel.guild.fetchAuditLogs({
        limit: 1,
        type: "WEBHOOK_CREATE"
    });
    let entry = logs.entries.first();
    if (!entry || entry.executor.bot || await checkPermission(OtherGuard, entry.executor.id, "bot")) return;
    cezaVer(OtherGuard, entry.executor.id, "jail");

    const webhooks = await channel.fetchWebhooks();
    await webhooks.map(x => x.delete({reason: "Guard Webhook Silindi!"}))

    const rainha = new MessageEmbed()
    .setColor("000001")
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))   
    .setDescription(`
${entry.executor} üyesi tarafından sunucuda izinsiz webhook açıldı, webhook silindi ve yetkili jail atıldı.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)
    
 sendLog({ embeds: [rainha] });
});

OtherGuard.on("webhookUpdate", async (channel) => {
    let logs = await channel.guild.fetchAuditLogs({
        limit: 1,
        type: "WEBHOOK_DELETE"
    });
    let entry = logs.entries.first();
    if (!entry || entry.executor.bot || await checkPermission(OtherGuard, entry.executor.id, "bot")) return;
    cezaVer(OtherGuard, entry.executor.id, "jail");

    const rainha = new MessageEmbed()
    .setColor("000001")
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))   
    .setDescription(`
${entry.executor} üyesi tarafından sunucuda izinsiz webhook silindi, kullanıcı jail atıldı.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)
    
 sendLog({ embeds: [rainha] });
});

OtherGuard.on("emojiDelete", async (emoji) => {
    let logs = await emoji.guild.fetchAuditLogs({
        limit: 1,
        type: "EMOJI_DELETE"
    });
    let entry = logs.entries.first();
    if (!entry || await checkPermission(OtherGuard, entry.executor.id, "full") || await checkPermission(OtherGuard, entry.executor.id, "roleandchannel")) return;
    cezaVer(OtherGuard, entry.executor.id, "jail");
    emoji.guild.emojis.create(`${emoji.url}`, `${emoji.name}`).catch(console.error);

    const rainha = new MessageEmbed()
    .setColor("000001")
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))   
    .setDescription(`
${entry.executor} üyesi izinsiz emoji sildi ve kullanıcıyı karantina atıp, emojiyi yeniden yükledim.
─────────────────────
Yetkili: (${entry.executor} - \`${entry.executor.id}\`)
Emoji: \`${emoji.name}\` - \`${emoji.id}\`
─────────────────────
Tarih: \`${moment(Date.now()).format("LLL")}\``)
    
 sendLog({ embeds: [rainha] });
});
//#endrainhawjer

//#chat guard

let reklamLimit = {};
OtherGuard.on("messageCreate", async (message) => {
    if (message.author.bot || message.channel.type == "dm") return;
    if (await checkPermission(OtherGuard, message.author.id, "full") || await checkPermission(OtherGuard, message.author.id, "chatguard")) return;
    let messages = [...message.channel.messages.cache.values()];
    messages = messages.splice(messages.length - 10, messages.length);
    let ms = messages.filter(e => e.cleanContent == message.cleanContent && e.author.id == message.author.id);
    const kelime = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk", ".gg/", ".gg"];
    let links = message.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}?\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi);
    if (ms.length > 5 && !["game","owo","fun","kamp-ateşi-chat","konser-chat"].some(ver => message.channel.name.includes(ver))) {
        ms.forEach(m => m.delete().catch(() => {}));
        message.member.roles.add(setup.chatMute);
        message.reply({ content: `Sohbet kanallarını kirletme sebebiyle \`3 dakika\` süresince susturuldunuz, mesajlar temizlendi. Lütfen yavaşlayın. ${message.author}`});
        setTimeout(() => {
            if (!message.member.roles.cache.has(setup.chatMute)) return;
            message.member.roles.remove(setup.chatMute);
            message.reply({ ontent: `Sohbet kanallarını kirletme sebebiyle 3 dakika süresince susturmanız bitti. Lütfen tekrarlamayınız. ${message.author}`});
        }, 1000 * 60 * 3);
        return;
    }
    if ((message.mentions.members.size >= god.Guard.Limit.Etiket || message.mentions.roles.size >= god.Guard.Limit.Etiket || message.mentions.channels.size >= god.Guard.Limit.Etiket)) {
        message.delete().catch(() => {});
    message.member.roles.add(setup.chatMute);
    message.channel.send({ content: `Birden çok kişiyi etiketlediğin için \`15 dakika\` boyunca susturuldun. ${message.author}`});
    setTimeout(() => {
        if (!message.member.roles.cache.has(setup.chatMute)) return;
        message.member.roles.remove(setup.chatMute);
        message.channel.send({ content: `Birden çok kişiyi etiketleme sebebiyle olan, Muten açıldı lütfen tekrar insanları etiketleme. ${message.author}`});
    }, 1000 * 60 * 15);
}

    let args = message.content.split(" ");
    const kufurler = god.Guard.Küfürler;
    if (kufurler.some(word => args.some(c => word.toLowerCase() == c.toLowerCase())) && !["t-sustum"].some(ver => message.channel.name.includes(ver))) {
        
		message.delete();
        message.channel.send({ content: `Güzel kardeşim küfür senin o güzel diline hiç yakışıyormu ayıp. ${message.author}`}).then((e) => setTimeout(() => { e.delete(); }, 5000)).catch(err => {});
		
    }
    
    if (kelime.some(reklam => message.content.toLowerCase().includes(reklam)) && ![message.guild.vanityURLCode].some(reklam => message.content.toLocaleLowerCase().includes(reklam))) {
        if (!reklamLimit[message.author.id]) reklamLimit[message.author.id] = 0;
        if (reklamLimit[message.author.id] && reklamLimit[message.author.id] >= 5) {
            reklamLimit[message.author.id] = 0;
            message.member.ban({
                reason: "Reklam Link Koruması"
            });
            return;
        };
        reklamLimit[message.author.id]++;
        setTimeout(() => {
            reklamLimit[message.author.id]--
        }, 1000 * 60 * 5);
        if (message.deletable) message.delete().catch(err => {});
    } else {
        if (!links) return;
        if (!reklamLimit[message.author.id]) reklamLimit[message.author.id] = 0;
        if (reklamLimit[message.author.id] && reklamLimit[message.author.id] >= 5) {
            reklamLimit[message.author.id] = 0;
            message.member.ban({
                reason: "Reklam Link Koruması"
            });
            return;
        };
        reklamLimit[message.author.id]++;
        setTimeout(() => {
            reklamLimit[message.author.id]--
        }, 1000 * 60 * 5);
        if (message.deletable) message.delete().catch(err => {});
    }
});

OtherGuard.on("messageUpdate", async (oldMessage, newMessage) => {
    if (oldMessage.author.bot || newMessage.channel.type == "dm") return;
    if (await checkPermission(OtherGuard, oldMessage.author.id, "full") || await checkPermission(OtherGuard, oldMessage.author.id, "chatguard")) return;
    const kelime = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk", ".gg/", ".gg"];
    let args = newMessage.content.split(" ");
    const kufurler = god.Guard.Küfürler
    if (kufurler.some(word => args.some(c => word.toLowerCase() == c.toLowerCase())) && !["sus"].some(ver => newMessage.channel.name.includes(ver))) {
      newMessage.delete().then(message => {
        newMessage.channel.send({ content: `Güzel kardeşim küfür senin o güzel diline hiç yakışıyormu ayıp. ${message.author}`}).then((e) => setTimeout(() => { e.delete(); }, 5000)).catch(err => {});
      });
    }

    if (kelime.some(reklam => newMessage.content.toLowerCase().includes(reklam)) && ![newMessage.guild.vanityURLCode].some(reklam => newMessage.content.toLocaleLowerCase().includes(reklam))) {
        if (!reklamLimit[oldMessage.author.id]) reklamLimit[oldMessage.author.id] = 0;
        if (reklamLimit[oldMessage.author.id] && reklamLimit[oldMessage.author.id] >= god.Guard.Limit.ReklamKick) {
            reklamLimit[oldMessage.author.id] = 0;
            newMessage.member.ban({
                reason: "Reklam Guard"
            });
            return;
        };
        reklamLimit[oldMessage.author.id]++;
        setTimeout(() => {
            reklamLimit[oldMessage.author.id]--
        }, 1000 * 60 * 5);
        if (newMessage.deletable) newMessage.delete().catch(err => {});
    } else {
        let links = newMessage.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}?\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi);
        if (!links) return;
        if (!reklamLimit[oldMessage.author.id]) reklamLimit[oldMessage.author.id] = 0;
        if (reklamLimit[oldMessage.author.id] && reklamLimit[oldMessage.author.id] >= god.Guard.Limit.ReklamKick) {
            reklamLimit[oldMessage.author.id] = 0;
            newMessage.member.ban({
                reason: "Reklam Guard"
            });
            return;
        };
        reklamLimit[oldMessage.author.id]++;
        setTimeout(() => {
            reklamLimit[oldMessage.author.id]--
        }, 1000 * 60 * 5);
        if (newMessage.deletable) newMessage.delete().catch(err => {});
    }
});

//#end chat guard

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const userRoles = require('./src/Models/SekmeKoruma');

OtherGuard.on("presenceUpdate", async (user) => {

if (!user) return;
let perms = god.Guard.StaffPerm;
const member = OtherGuard.guilds.cache.get(god.GuildID).members.cache.get(user.userId)
const rainhacik = `${Object.keys(member.presence.clientStatus)[0]}`;

const roller = member.roles.cache.filter((e) => e.editable && e.name !== "@everyone" && perms.some(perm => e.permissions.has(perm)));
if (!member.user.bot && member.guild.id === god.GuildID && perms.some(perm => user.member.permissions.has(perm))) {
if (await checkPermission(OtherGuard, user.userId, "full") || await checkPermission(OtherGuard, user.userId, "sekmeguard")) return;

if (rainhacik.includes("web")) {

await userRoles.updateOne({ guildID: god.GuildID, userID: user.userId }, { $set: { roles: roller.map((e) => e.id) } }, { upsert: true });
await member.roles.remove(roller.map((e) => e.id), "Tarayıcıdan Giriş Yapıldığı İçin Rolleri Alındı.");

let rainha = new MessageEmbed()
.setDescription(`Şüpheli Kullanıcı Web Tarayıcısından Discorda Giriş Yaptı!
**Şüpheli:** <@${user.userId}> - \`(${user.userId})\`
**Sonuç:** Şüphelinin Yetki İçeren Rolleri Alındı.
\n**Rollerin Listesi:** \n\`\`\`cs\n${roller.map((e) => `${e.name} - ${e.id}`).join("\n")}\n\`\`\``)
.setThumbnail(member.displayAvatarURL({ dynamic: true, size: 2048 }))
.setAuthor({ name: member.displayName, iconURL: member.avatarURL({ dynamic: true })})
.setFooter({ text: `Sekme Koruması`, iconURL: OtherGuard.guilds.cache.get(god.GuildID).iconURL({ dynamic: true })})
.setTimestamp().setColor(member.displayHexColor)
OtherGuard.channels.cache.find(x => x.name == "sekme_guard_log").send({ embeds: [rainha] });
}}

if (rainhacik.includes("mobile")) {
const veri = await userRoles.findOne({ guildID: god.GuildID, userID: user.userId });
if (!veri) return;
if (veri.roles || veri.roles.length) {
await veri.roles.map(e => member.roles.add(e, "Platformunu Değiştirdiği İçin Rolleri Geri Verildi.").then(async () => {
await userRoles.findOneAndDelete({ guildID: god.GuildID, userID: user.userId });
    
let rainha = new MessageEmbed()
.setDescription(`Şüpheli Kullanıcı Web Tarayıcısından Çıkış Yaptı ve Platform Değişti!
**Şüpheli:** <@${user.userId}> - \`(${user.userId})\`
**Sonuç:** Şüphelinin Yetki İçeren Rolleri Geri Verildi.
\n**Rollerin Listesi:** \n\`\`\`cs\n${veri.roles.map((e) => `${OtherGuard.guilds.cache.get(god.GuildID).roles.cache.get(e).name} - ${e}`).join("\n")}\n\`\`\``)
.setThumbnail(member.displayAvatarURL({ dynamic: true, size: 2048 }))
.setAuthor({ name: member.displayName, iconURL: member.avatarURL({ dynamic: true })})
.setFooter({ text: `Sekme Koruması`, iconURL: OtherGuard.guilds.cache.get(god.GuildID).iconURL({ dynamic: true })})
.setTimestamp().setColor(member.displayHexColor)
OtherGuard.channels.cache.find(x => x.name == "sekme_guard_log").send({ embeds: [rainha] });
    
}).catch(() => {}));
}
}

if (rainhacik.includes("desktop")) {
const veri = await userRoles.findOne({ guildID: god.GuildID, userID: user.userId });
if (!veri) return;
if (veri.roles || veri.roles.length) {
await veri.roles.map(e => member.roles.add(e, "Platformunu Değiştirdiği İçin Rolleri Geri Verildi.").then(async () => {
await userRoles.findOneAndDelete({ guildID: god.GuildID, userID: user.userId });
        
let rainha = new MessageEmbed()
.setDescription(`Şüpheli Kullanıcı Web Tarayıcısından Çıkış Yaptı ve Platform Değişti!
**Şüpheli:** <@${user.userId}> - \`(${user.userId})\`
**Sonuç:** Şüphelinin Yetki İçeren Rolleri Geri Verildi.
\n**Rollerin Listesi:** \n\`\`\`cs\n${veri.roles.map((e) => `${OtherGuard.guilds.cache.get(god.GuildID).roles.cache.get(e).name} - ${e}`).join("\n")}\n\`\`\``)
.setThumbnail(member.displayAvatarURL({ dynamic: true, size: 2048 }))
.setAuthor({ name: member.displayName, iconURL: member.avatarURL({ dynamic: true })})
.setFooter({ text: `Sekme Koruması`, iconURL: OtherGuard.guilds.cache.get(god.GuildID).iconURL({ dynamic: true })})
.setTimestamp().setColor(member.displayHexColor)
OtherGuard.channels.cache.find(x => x.name == "sekme_guard_log").send({ embeds: [rainha] });
        
}).catch(() => {}));
}
} else if (member?.presence?.status === "offline") {
const veri = await userRoles.findOne({ guildID: god.GuildID, userID: user.userId });
if (!veri) return;
        
let rainha = new MessageEmbed()
.setDescription(`Şüpheli Kullanıcı Web Tarayıcısından Offline Moduna Geçti!
**Şüpheli:** <@${user.userId}> - \`(${user.userId})\`
**Sonuç:** Şüphelinin Yetki İçeren Rolleri Risk Nedeniyle Geri Verilmedi.`)
.setThumbnail(member.displayAvatarURL({ dynamic: true, size: 2048 }))
.setAuthor({ name: member.displayName, iconURL: member.avatarURL({ dynamic: true })})
.setFooter({ text: `Sekme Koruması`, iconURL: OtherGuard.guilds.cache.get(god.GuildID).iconURL({ dynamic: true })})
.setTimestamp().setColor(member.displayHexColor)
OtherGuard.channels.cache.find(x => x.name == "sekme_guard_log").send({ embeds: [rainha] });
}
});

///////////////////////////////////////////////////////////////////////////////////////////////
OtherGuard.on("guildMemberOffline", async (member, oldStatus) => {

let perms = god.Guard.StaffPerm;
    
const roller = member.roles.cache.filter((e) => e.editable && e.name !== "@everyone" && perms.some(perm => e.permissions.has(perm)));
if (!member.user.bot && member.guild.id === god.GuildID && perms.some(perm => member.permissions.has(perm))) {
if (await checkPermission(OtherGuard, member.user.id, "full") || await checkPermission(OtherGuard, member.user.id, "sekmeguard")) return;
       
await userRoles.updateOne({ guildID: god.GuildID, userID: member.user.id }, { $set: { roles: roller.map((e) => e.id) } }, { upsert: true });
await member.roles.remove(roller.map((e) => e.id), "Offline Moduna Geçildiği İçin Rolleri Alındı.");

if (roller || roller.length) {
let rainha = new MessageEmbed()
.setDescription(`Şüpheli Kullanıcı Offline Moduna Geçti!
**Şüpheli:** <@${member.user.id}> - \`(${member.user.id})\`
**Sonuç:** Şüphelinin Yetki İçeren Rolleri Alındı.
\n**Rollerin Listesi:** \n\`\`\`cs\n${roller.map((e) => `${e.name} - ${e.id}`).join("\n")}\n\`\`\``)
.setThumbnail(member.displayAvatarURL({ dynamic: true, size: 2048 }))
.setAuthor({ name: member.displayName, iconURL: member.avatarURL({ dynamic: true })})
.setFooter({ text: `Sekme Koruması`, iconURL: OtherGuard.guilds.cache.get(god.GuildID).iconURL({ dynamic: true })})
.setTimestamp().setColor(member.displayHexColor)
OtherGuard.channels.cache.find(x => x.name == "sekme_guard_log").send({ embeds: [rainha] });
}}
});
///////////////////////////////////////////////////////////////////////////////////////////////

process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
    process.exit(1);
  });
  
  process.on("unhandledRejection", err => {
    console.error("Promise Hatası: ", err);
  });
//#rainhawjer Fonksiyonlar

/**
 * 
 * @param {Client} client 
 * @param {String} channelName 
 * @param {String} message 
 */

const webHook = new WebhookClient({ id: god.Guard.Logs.WebHookID, token: god.Guard.Logs.WebHookToken });
async function sendLog(message) {
    webHook.send(message)
}
/**
 * @param {string} id 
 * @param {("role"|"channel"|"banandkick"|"bot"|"chatguard"|"roleandchannel"|"full")} type 
 * @returns {boolean}
 */
async function checkPermission(bots, id, type) {
    let member = bots.guilds.cache.first().members.cache.get(id);
    let res = await SafeMember.findOne({
        guildID: god.GuildID
    });

    if (!res) {
        res = {
            "Full": [],
            "RoleAndChannel": [],
            "Role": [],
            "Channel": [],
            "Bot": [],
            "BanAndKick": [],
            "ChatG": [],
            "SekmeG": []
        }
        await SafeMember.updateOne({
            guildID: god.GuildID
        }, {}, {
            upsert: true,
            setDefaultsOnInsert: true
        }).exec()
    } else {

        if (god.owners.some(uye => uye == member?member.id:false) || res.Full.some(uye => uye == member?member.id:false  || member ? member.roles.cache.has(uye) : false) || Bots.some(guard => guard.user.id == member?member.id:false ) || RoleGuard.user.id == member?member.id:false  || ChannelGuard.user.id == member?member.id:false  || OtherGuard.user.id == member?member.id:false ) {
            return true;
        }
        if (type == "full") {
            if (res.Full.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "role") {
            if (res.Role.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "roleandchannel") {
            if (res.RoleAndChannel.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "channel") {
            if (res.Channel.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false || member ? member.voice ? member.voice.channel.id == uye : false : false)) return true;
        } else if (type == "banandkick") {
            if (res.BanAndKick.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false) || res.RoleAndChannel.some(uye => uye == member?member.id:false  || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "bot") {
            if (res.Bot.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "chatguard") {
            if (res.ChatG.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false)) return true;
        } else if (type == "sekmeguard") {
            if (res.SekmeG.some(uye => uye == member?member.id:false || member ? member.roles.cache.has(uye) : false)) return true;
        } return false;
    }
}

/**
 * 
 * @param {Number} count 
 * @returns {Client[]}
 */
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function cezaVer(test, kisiID, tur) {
let MEMBER = test.guilds.cache.get(god.GuildID).members.cache.get(kisiID)
if (!MEMBER) return;
if (tur == "jail") return MEMBER.roles.cache.has(setup.boosterRolu) ? MEMBER.roles.set([setup.boosterRolu, setup.jailRole[0]]) : MEMBER.roles.set(setup.jailRole).catch(() => {if (god.Guard.TaçHesapToken.length > 0) {taccezaVer(MEMBER.user.id, "tjail")}})
if (tur == "ban") return MEMBER.ban({ reason: "Guard Sistem Koruma" }).catch(() => {if (god.Guard.TaçHesapToken.length > 0) {taccezaVer(MEMBER.user.id, "tban")}})
if (tur == "kick") return MEMBER.kick().catch(() => {if (god.Guard.TaçHesapToken.length > 0) {taccezaVer(MEMBER.user.id, "tkick")}})
};

async function taccezaVer(kisiID, tur) {
tacuser.guilds.cache.get(god.GuildID).members.fetch().then(async (x) => {
let MEMBER = tacuser.guilds.cache.get(god.GuildID).members.cache.get(kisiID)
if (!MEMBER) return;
if (tur == "tjail") return MEMBER.roles.cache.has(setup.boosterRolu) ? MEMBER.roles.set([setup.boosterRolu, setup.jailRole[0]]) : MEMBER.roles.set(setup.jailRole);
if (tur == "tban") return MEMBER.ban({ reason: "Taç Guard Sistem Koruma" });
if (tur == "tkick") return MEMBER.kick();
})
};

async function rolbackup() {    
    const guild = OtherGuard.guilds.cache.get(god.GuildID);
      let members = await guild.members.fetch();
      guild.roles.cache.forEach(async role => {
          let roleChannelOverwrites = [];
          await guild.channels.cache.filter(c => c.permissionOverwrites.cache.has(role.id)).forEach(c => {
              let channelPerm = c.permissionOverwrites.cache.get(role.id);
              let pushlanacak = {
                  id: c.id,
                  allow: channelPerm.allow.toArray(),
                  deny: channelPerm.deny.toArray()
              };
              roleChannelOverwrites.push(pushlanacak);
          });
    
          await RoleModel.updateOne({
              roleID: role.id
          }, {
              $set: {
                  guildID: guild.id,
                  roleID: role.id,
                  name: role.name,
                  color: role.hexColor,
                  hoist: role.hoist,
                  position: role.position,
                  permissions: role.permissions.bitfield,
                  mentionable: role.mentionable,
                  time: Date.now(),
                  members: role.members.map(m => m.id),
                  channelOverwrites: roleChannelOverwrites
              }
          }, {
              upsert: true
          });
      });
    
    console.log("Bütün Rol verileri başarı ile kayıt edildi.")
    };


async function kanalbackup() {
    const guild = OtherGuard.guilds.cache.get(god.GuildID);
      if (guild) {
          const channels = [...guild.channels.cache.values()];
          for (let index = 0; index < channels.length; index++) {
              const channel = channels[index];
              let ChannelPermissions = []
              channel.permissionOverwrites.cache.forEach(perm => {
                  ChannelPermissions.push({ id: perm.id, type: perm.type, allow: "" + perm.allow, deny: "" + perm.deny })
              });
            
              if ((channel.type === 'GUILD_TEXT') || (channel.type === 'GUILD_NEWS')) {
                await TextChannels.updateOne({
                    channelID: channel.id,
                }, {
                    $set: {
                        channelID: channel.id,
                        name: channel.name,
                        nsfw: channel.nsfw,
                        parentID: channel.parentId,
                        position: channel.position,
                        rateLimit: channel.rateLimitPerUser,
                        overwrites: ChannelPermissions,
                    }
                }, {
                    upsert: true
                });
              }
              if (channel.type === 'GUILD_VOICE') {
                await VoiceChannels.updateOne({
                    channelID: channel.id,
                }, {
                    $set: {
                        channelID: channel.id,
                        name: channel.name,
                        bitrate: channel.bitrate,
                        userLimit: channel.userLimit,
                        parentID: channel.parentId,
                        position: channel.position,
                        overwrites: ChannelPermissions,
                    }
                }, {
                    upsert: true
                });
              }
              if (channel.type === 'GUILD_CATEGORY') {
                await CategoryChannels.updateOne({
                    channelID: channel.id,
                }, {
                    $set: {
                        channelID: channel.id,
                        name: channel.name,
                        position: channel.position,
                        overwrites: ChannelPermissions,
                    }
                }, {
                    upsert: true
                });
              }
          }
          console.log("Bütün Kanal verileri başarı ile kayıt edildi.")
      }}

async function rainhawjer(vanity, token) {
let random = god.Guard.Guards.forEach(async x => { x })
        
const spammer = {
  url: `https://discord.com/api/v8/guilds/${god.GuildID}/vanity-url`,
  body: {
    code: `${vanity}`},
    json: true,
    method: 'PATCH',
    headers: {
    "Authorization": `Bot ${random}`
    }};
        
request(spammer, (err, res, body) => {if (err) {return console.log(err)}})}

//#endrainhawjer