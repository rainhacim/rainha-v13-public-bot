const { red, green } = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["rolbilgi","role","rbilgi","r-bilgi"],
    name: "rolbilgi",
    help: "rolbilgi  <@Role/ID>",
    category: "yönetim",
  },
  run: async (client, message, args, embed) => {
    if (!message.member.permissions.has(8n)) return message.channel.send({ content: `${message.author}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
   
    let role = message.mentions.roles.first();
    if(role) role = await message.guild.roles.fetch(role.id);
    else if(message.content.split(" ")[1]) role = await message.guild.roles.fetch(message.content.split(" ")[1]);
    else return message.reply({
      content: 'Lütfen bir ID girin veya bir rol etiketleyin'
    });

    if(!role) return message.reply({
        content: 'Rol bulunamadı'
    });

    let members = await role.members;

    await message.guild.members.fetch();

    let offlineMembers = members.filter(a => a.presence?.status == 'offline');
    let voiceMembers = members.filter(a => a.voice.channelId);
    let onlineMembers = members.filter(a => a.presence?.status != 'offline' && !a.voice.channelId);

    message.channel.send({
        content: `\n**Rol Adı:** ${role.name}\n**Rol rengi:** #${role.color}\n**Rol Polisyonu:** ${role.position}\n**Role Üye Sayısı:** ${members.size}\n\n**----------**\n**Üyeler(Offline)(${offlineMembers.size})**\n${offlineMembers.map(a => (`<@!${a.id}> ${a.user.tag}`)).join("\n")}**----------**\n**Üyeler(Seste)(${voiceMembers.size})**\n${voiceMembers.map(a => (`<@!${a.id}> ${a.user.tag} <#${a.voice.channelId}>`)).join("\n")}\n**----------**\n**Üyeler(Aktif ama seste değil)(${onlineMembers.size})**\n${onlineMembers.map(a => (`<@!${a.id}> ${a.id}`)).join("\n")}`
    })
  }
}