const client = global.bot;
const isimler = require("../schemas/names");
const inviterSchema = require("../schemas/inviter");
const inviteMemberSchema = require("../schemas/inviteMember");
const coin = require("../schemas/coin");
const gorev = require("../schemas/invite");
const conf = require("../configs/sunucuayar.json")
const god = require("../../../../config.json");

module.exports = async (member) => {
  const channel = member.guild.channels.cache.get(conf.invLogChannel);
  if (!channel) return;
  if (member.user.bot) return;
  const data = await isimler.findOne({ guildID: god.GuildID, userID: member.user.id });

  if (data && data.names.length) {
  await isimler.findOneAndUpdate({ guildID: god.GuildID, userID: member.user.id }, { $push: { names: { name: data.names.splice(-1).map((x, i) => `${x.name}`), sebep: "Sunucudan Ayrılma", date: Date.now() } } }, { upsert: true });
  }
  
  const inviteMemberData = await inviteMemberSchema.findOne({ guildID: member.guild.id, userID: member.user.id });
  if (!inviteMemberData) {
    channel.wsend({ content: `\`${member.user.tag}\` sunucumuzdan ayrıldı ama kim tarafından davet edildiğini bulamadım.`});
  } else {
    const inviter = await client.users.fetch(inviteMemberData.inviter);
    await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { leave: 1, total: -1 } }, { upsert: true });
    const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: inviter.id, });
    const total = inviterData ? inviterData.total : 0;
    const gorevData = await gorev.findOne({ guildID: member.guild.id, userID: inviter.id });
    channel.wsend({ content:`\`${member.user.tag}\` sunucumuzdan ayrıldı. ${inviter.tag} tarafından davet edilmişti. (**${total}** davet)`});
    await coin.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { coin: -15 } }, { upsert: true });
    if (gorevData)
    await gorev.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { invite: -1 } }, { upsert: true });
  }
};

module.exports.conf = {
  name: "guildMemberRemove",
};
