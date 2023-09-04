const client = global.bot;
const god = require("../../../../config.json");
const conf = require("../configs/sunucuayar.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const { Mute, Revuu, kirmiziok } = require("../configs/emojis.json")

module.exports = async (oldState, newState) => {
  let desc1 = ``;
  let desc2 = ``;
  let desc3 = ``;
  let desc4 = ``;
  let desc5 = ``;

  if(!oldState.channelId && newState.channelId){

    desc1 = `<@!${oldState.member.id}> üyesi <#${newState.channelId}> kanalına giriş yaptı.`;
    desc2 = `**Kanala girdiğinde:**\nMikrofon: **${newState.selfMute ? 'Kapalı' : 'Acık'}**\nKulaklık: **${newState.selfDeaf ? 'Kapalı' : 'Acık'}**`
    desc3 = `Yeni kanal: ${newState.channel.name} (${newState.channel.id})\nKullanıcı: ${newState.member.user.tag} (${newState.member.id})\nEylem gerceklesme: <t:${String(Date.now()).split("").reverse().slice(3).reverse().join("")}:R>`
    desc5 = `**Yeni kanalda bulunan üyeler:**\n${newState.channel.members.map(a => (`${a.nickname} [${a.user.tag}] (${a.id})`)).join("\n")}`

  }else if(oldState.channelId && newState.channelId){
    desc1 = `<@!${oldState.member.id}> üyesi <#${oldState.channelId}> kanalından <#${newState.channelId}> kanalına geciş yaptı.`;
    desc2 = `**Kanala girdiğinde:**\nMikrofon: **${newState.selfMute ? 'Kapalı' : 'Acık'}**\nKulaklık: **${newState.selfDeaf ? 'Kapalı' : 'Acık'}**`
    desc3 = `Eski kanal: ${oldState.channel.name} (${oldState.channel.id})\nYeni kanal: ${newState.channel.name} (${newState.channel.id})\nKullanıcı: ${newState.member.user.tag} (${newState.member.id})\nEylem gerceklesme: <t:${String(Date.now()).split("").reverse().slice(3).reverse().join("")}:R>`
    desc4 = `**Eski kanalda bulunan üyeler:**\n${oldState.channel.members.map(a => (`${a.nickname} [${a.user.tag}] (${a.id})`)).join("\n")}`
    desc5 = `**Yeni kanalda bulunan üyeler:**\n${newState.channel.members.map(a => (`${a.nickname} [${a.user.tag}] (${a.id})`)).join("\n")}`


  }else if(oldState.channelId && !newState.channelId){
    desc1 = `<@!${oldState.member.id}> üyesi <#${oldState.channelId}> kanalından cıkış yaptı.`;
    desc2 = `**Kanaldan cıktıgında:**\nMikrofon: **${oldState.selfMute ? 'Kapalı' : 'Acık'}**\nKulaklık: **${oldState.selfDeaf ? 'Kapalı' : 'Acık'}**`
    desc3 = `Eski kanal: ${oldState.channel.name} (${oldState.channel.id})\nKullanıcı: ${newState.member.user.tag} (${newState.member.id})\nEylem gerceklesme: <t:${String(Date.now()).split("").reverse().slice(3).reverse().join("")}:R>`
    desc4 = `**Eski kanalda bulunan üyeler:**\n${oldState.channel.members.map(a => (`${a.nickname} [${a.user.tag}] (${a.id})`)).join("\n")}`
  };
const channel = client.channels.cache.find(x => x.name == "voice_log");
if (!channel) return;
  channel.wsend({
      embeds: [
          new MessageEmbed().setAuthor({ name: `${oldState.member.user.tag}`, iconURL: `${oldState.member.user.displayAvatarURL()}`}).setDescription(`${desc1}\n\n${desc2}\n\n${desc3}\n\n${desc4}\n${desc5}`)
      ]
  })
};

module.exports.conf = {
  name: "voiceStateUpdate",
};