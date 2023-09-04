const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const coin = require("../../schemas/coin");
const ceza = require("../../schemas/ceza");
const cezapuan = require("../../schemas/cezapuan")
const muteLimit = new Map();
const moment = require("moment");
moment.locale("tr");
const ms = require("ms");
const conf = require("../../configs/sunucuayar.json")
const { red, green, Mute, revusome, kirmiziok } = require("../../configs/emojis.json")
const god = require("../../../../../config.json");

module.exports = {
  conf: {
    aliases: ["mute","cmute"],
    name: "mute",
    help: "mute <@isim/ID> <Süre> <Sebep>",
    category: "cezalandırma",
  },

  run: async (client,message, args, embed) => {
    if (!message.member.permissions.has(8n) && !conf.cmuteHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return } 
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) { message.channel.send({ content:"Bir üye belirtmelisin!"}) 
    message.react(red)
    return }
    if (conf.chatMute.some(x => member.roles.cache.has(x))) { message.channel.send({ content:"Bu üye zaten susturulmuş!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react(red)
    return }
    if (message.member.roles.highest.position <= member.roles.highest.position) 
    {
    message.react(red)
    message.channel.send({ content:"Kendinle aynı yetkide ya da daha yetkili olan birini susturamazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return
    }
    if (!member.manageable) 
    {
    message.react(red)
    message.channel.send({ content:"Bu üyeyi susturamıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return
    }
    if (god.Main.chatmutelimit > 0 && muteLimit.has(message.author.id) && muteLimit.get(message.author.id) == god.Main.chatmutelimit) 
    {
    message.react(red)
    message.channel.send({ content:"Saatlik susturma sınırına ulaştın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return
    }

    const yazı = [] 
    if(member.user.username.length > 15) {
    let yarrak = member.user.username.slice(0, 15)
      yazı.push(`${yarrak}...`)  
    } else {
      yazı.push(`${member.user.tag}`)
    }

    const row = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('mute')
            .setPlaceholder(`${yazı}'n Mute Atılma Sebebi?`)
            .addOptions([
                { label: 'Kışkırtma, Trol ve Dalgacı Davranış (5 Dakika)', value: 'mute1', emoji: {id: "997835429447479296"}},
                { label: 'Flood,Spam ve Capslock Kullanımı (5 Dakika)', value: 'mute2', emoji: {id: "997820375389962260"}},
                { label: 'Metin Kanallarını Amacı Dışında Kullanmak (10 Dakika)', value: 'mute3', emoji: {id: "997820377076076564"}},
                { label: 'Küfür, Argo, Hakaret ve Rahatsız Edici Davranış (5 Dakika)', value: 'mute4', emoji: {id: "997820379898843147"}},
                { label: 'Abartı, Küfür ve Taciz Kullanımı (30 Dakika)', value: 'mute5', emoji: {id: "997820365915037776"}},
                { label: 'Dini, Irki ve Siyasi değerlere Hakaret (2 Hafta)', value: 'mute6', emoji: {id: "997835425051848705"}},
                { label: 'Sunucu Kötüleme ve Kişisel Hakaret (1 Saat)', value: 'mute7', emoji: {id: "997820370709127188"}},
                { label: `İşlem İptal`, value: 'mute8', emoji: {id: "909485171240218634"}},
             ]),
    );

    const duration = args[1] ? ms(args[1]) : undefined;
 
    if (duration) {
      const reason = args.slice(2).join(" ") || "Belirtilmedi!";
    
      await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
      await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
      await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { MuteAmount: 1 } }, {upsert: true});
      await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
      await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
      const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
      if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`chat mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
      message.react(green)
      member.roles.add(conf.chatMute);
      const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + duration);
      if(msg) msg.delete();
      await message.channel.send({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
       message.react(green)
      if (god.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar susturuldunuz.`}).catch(() => {});
    
      const log = embed
        .setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
        .setColor("#2f3136")
        .setDescription(`
    ${member.toString()} Adlı Kişiye Chat Mutesi Atıldı
    
    ${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
    ${revusome} Ceza Bitiş: <t:${Math.floor((Date.now() + duration) / 1000)}:R>
    ${kirmiziok} Ceza Sebebi: \`${reason}\`
        `)
        .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
      message.guild.channels.cache.get(conf.cmuteLogChannel).wsend({ embeds : [log]});
    
      if (god.Main.chatmutelimit > 0) {
        if (!muteLimit.has(message.author.id)) muteLimit.set(message.author.id, 1);
        else muteLimit.set(message.author.id, muteLimit.get(message.author.id) + 1);
        setTimeout(() => {
          if (muteLimit.has(message.author.id)) muteLimit.delete(message.author.id);
        }, 1000 * 60 * 60);
      }

    } else if (!duration) {
      var msg = await message.channel.send({ content: `${member.toString()} isimli kullanıcıyı susturma sebebinizi menüden seçiniz.`, components: [row]})
    }
    
    if (msg) {
    var filter = (xd) => xd.user.id === message.author.id;
    let collector =  msg.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', time: 30000 })
        
    collector.on("collect", async (interaction) => {
    
    if(interaction.values[0] === "mute1") {
    await interaction.deferUpdate();
    const duration = "5m" ? ms("5m") : undefined;
    const reason = "Kışkırtma, Trol ve Dalgacı Davranış";

    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { MuteAmount: 1 } }, {upsert: true});
    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 8 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`chat mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    message.react(green)
    member.roles.add(conf.chatMute);
    const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    if(msg) msg.delete();
    interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
    if (god.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar susturuldunuz.`}).catch(() => {});
    
    const log = embed
      .setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
      .setColor("#2f3136")
      .setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
${revusome} Ceza Bitiş: <t:${Math.floor((Date.now() + duration) / 1000)}:R>
${kirmiziok} Ceza Sebebi: \`${reason}\`
      `)
      .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.cmuteLogChannel).wsend({ embeds : [log]});

          if (god.Main.chatmutelimit > 0) {
        if (!muteLimit.has(message.author.id)) muteLimit.set(message.author.id, 1);
        else muteLimit.set(message.author.id, muteLimit.get(message.author.id) + 1);
        setTimeout(() => {
          if (muteLimit.has(message.author.id)) muteLimit.delete(message.author.id);
        }, 1000 * 60 * 60);
      }
    }
    
    if(interaction.values[0] === "mute2") {
    await interaction.deferUpdate();
    const duration = "5m" ? ms("5m") : undefined;
    const reason = "Flood,Spam ve Capslock Kullanımı";
    
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { MuteAmount: 1 } }, {upsert: true});
    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 8 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`chat mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    message.react(green)
    member.roles.add(conf.chatMute);
    const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    if(msg) msg.delete();
    interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
    if (god.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar susturuldunuz.`}).catch(() => {});
    
    const log = embed
      .setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
      .setColor("#2f3136")
      .setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
${revusome} Ceza Bitiş: <t:${Math.floor((Date.now() + duration) / 1000)}:R>
${kirmiziok} Ceza Sebebi: \`${reason}\`
      `)
      .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.cmuteLogChannel).wsend({ embeds : [log]});

    if (god.Main.chatmutelimit > 0) {
      if (!muteLimit.has(message.author.id)) muteLimit.set(message.author.id, 1);
      else muteLimit.set(message.author.id, muteLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (muteLimit.has(message.author.id)) muteLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }
  }
    
    if(interaction.values[0] === "mute3") {
    await interaction.deferUpdate();
    const duration = "10m" ? ms("10m") : undefined;
    const reason = "Metin Kanallarını Amacı Dışında Kullanmak";
    
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { MuteAmount: 1 } }, {upsert: true});
    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 8 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`chat mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    message.react(green)
    member.roles.add(conf.chatMute);
    const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    if(msg) msg.delete();
    interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
    if (god.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar susturuldunuz.`}).catch(() => {});
    
    const log = embed
      .setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
      .setColor("#2f3136")
      .setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
${revusome} Ceza Bitiş: <t:${Math.floor((Date.now() + duration) / 1000)}:R>
${kirmiziok} Ceza Sebebi: \`${reason}\`
      `)
      .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.cmuteLogChannel).wsend({ embeds : [log]});
    
    if (god.Main.chatmutelimit > 0) {
      if (!muteLimit.has(message.author.id)) muteLimit.set(message.author.id, 1);
      else muteLimit.set(message.author.id, muteLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (muteLimit.has(message.author.id)) muteLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }
  }

    if(interaction.values[0] === "mute4") {
    await interaction.deferUpdate();
    const duration = "5m" ? ms("5m") : undefined;
    const reason = "Küfür, Argo, Hakaret ve Rahatsız Edici Davranış";
    
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { MuteAmount: 1 } }, {upsert: true});
    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 8 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`chat mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    message.react(green)
    member.roles.add(conf.chatMute);
    const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    if(msg) msg.delete();
    interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
    if (god.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar susturuldunuz.`}).catch(() => {});
    
    const log = embed
      .setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
      .setColor("#2f3136")
      .setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
${revusome} Ceza Bitiş: <t:${Math.floor((Date.now() + duration) / 1000)}:R>
${kirmiziok} Ceza Sebebi: \`${reason}\`
      `)
      .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.cmuteLogChannel).wsend({ embeds : [log]});
    
    if (god.Main.chatmutelimit > 0) {
      if (!muteLimit.has(message.author.id)) muteLimit.set(message.author.id, 1);
      else muteLimit.set(message.author.id, muteLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (muteLimit.has(message.author.id)) muteLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }
  }
    
    if(interaction.values[0] === "mute5") {
    await interaction.deferUpdate();
    const duration = "30m" ? ms("30m") : undefined;
    const reason = "Abartı, Küfür ve Taciz Kullanımı";
    
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { MuteAmount: 1 } }, {upsert: true});
    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 8 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`chat mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    message.react(green)
    member.roles.add(conf.chatMute);
    const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    if(msg) msg.delete();
    interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
    if (god.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar susturuldunuz.`}).catch(() => {});
    
    const log = embed
      .setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
      .setColor("#2f3136")
      .setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
${revusome} Ceza Bitiş: <t:${Math.floor((Date.now() + duration) / 1000)}:R>
${kirmiziok} Ceza Sebebi: \`${reason}\`
      `)
      .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.cmuteLogChannel).wsend({ embeds : [log]});
    
    if (god.Main.chatmutelimit > 0) {
      if (!muteLimit.has(message.author.id)) muteLimit.set(message.author.id, 1);
      else muteLimit.set(message.author.id, muteLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (muteLimit.has(message.author.id)) muteLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }
  }
    
    if(interaction.values[0] === "mute6") {
    await interaction.deferUpdate();
    const duration = "2w" ? ms("2w") : undefined;
    const reason = "Dini, Irki ve Siyasi değerlere Hakaret";
    
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { MuteAmount: 1 } }, {upsert: true});
    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 8 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`chat mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    message.react(green)
    member.roles.add(conf.chatMute);
    const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    if(msg) msg.delete();
    interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
    if (god.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar susturuldunuz.`}).catch(() => {});
    
    const log = embed
      .setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
      .setColor("#2f3136")
      .setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
${revusome} Ceza Bitiş: <t:${Math.floor((Date.now() + duration) / 1000)}:R>
${kirmiziok} Ceza Sebebi: \`${reason}\`
      `)
      .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.cmuteLogChannel).wsend({ embeds : [log]});
    
    if (god.Main.chatmutelimit > 0) {
      if (!muteLimit.has(message.author.id)) muteLimit.set(message.author.id, 1);
      else muteLimit.set(message.author.id, muteLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (muteLimit.has(message.author.id)) muteLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }
  }
    
    if(interaction.values[0] === "mute7") {
    await interaction.deferUpdate();
    const duration = "1h" ? ms("1h") : undefined;
    const reason = "Sunucu Kötüleme ve Kişisel Hakaret";
    
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
    await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { MuteAmount: 1 } }, {upsert: true});
    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
    await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 8 } }, { upsert: true });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
    if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`chat mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
    message.react(green)
    member.roles.add(conf.chatMute);
    const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + duration);
    if(msg) msg.delete();
    interaction.followUp({ content:`${green} ${member.toString()} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle susturuldu! \`(Ceza ID: #${penal.id})\``}).then((e) => setTimeout(() => { e.delete(); }, 50000));
    if (god.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle, <t:${Math.floor((Date.now() + duration) / 1000)}:R>'ya kadar susturuldunuz.`}).catch(() => {});
    
    const log = embed
      .setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
      .setColor("#2f3136")
      .setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

${Mute} Mute Atan Kişi : ${message.author} (\`${message.author.id}\`)
${revusome} Ceza Bitiş: <t:${Math.floor((Date.now() + duration) / 1000)}:R>
${kirmiziok} Ceza Sebebi: \`${reason}\`
      `)
      .setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
    message.guild.channels.cache.get(conf.cmuteLogChannel).wsend({ embeds : [log]});
    
    if (god.Main.chatmutelimit > 0) {
      if (!muteLimit.has(message.author.id)) muteLimit.set(message.author.id, 1);
      else muteLimit.set(message.author.id, muteLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (muteLimit.has(message.author.id)) muteLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }
  }
    
    if(interaction.values[0] === "mute8") {
    await interaction.deferUpdate();
    if(msg) msg.delete();
    interaction.followUp({ content: `${green} Susturma işlemi başarıyla iptal edildi.`, ephemeral: true });
    }
    })
    }
      },
    };