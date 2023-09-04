const { MessageEmbed, Collection,MessageAttachment} = require("discord.js");
const { Canvas } = require('canvas-constructor');
const { loadImage } = require('canvas');
const Stat = require("../schemas/level");
const rainha = require("../schemas/dolar");
const god = require("../../../../config.json");
const ayar = require("../configs/sunucuayar.json")
const client = global.bot;

module.exports = async (message) => {
  if (!message.guild) return
  if (message.author.bot) return;

    await client.checkLevel(message.author.id, god.GuildID, "mesaj")
	let data = await Stat.findOne({ userID: message.author.id, guildID: god.GuildID }) || { messageLevel: 0 };
	let siradakilevel = data.messageLevel * 643;

	if (siradakilevel < data.messageXP) {
	const avatar = await loadImage(message.author.avatarURL({ format: "jpg" }));
	const background = await loadImage("https://media.discordapp.net/attachments/1061350563775783004/1068115110733828147/rainha_level.png");            
	const image = new Canvas(740, 128)
	.printImage(background, 0, 0, 740, 128)
	.printRoundedImage(avatar, 621, 12, 105.5, 105.5, 10)
	.setTextFont('14px Arial Black')
	.setColor("#fff")
	.printText(`+${2000*(data.messageLevel+1)} Bonus Para KAZANDIN! `, 340, 70,350)
	.setTextFont('9px Arial Black')
	.setColor("#fff")
	.printText(`Bir Sonraki Level İçin ${(data.messageLevel+1) * 643}XP Kazanmalısın `, 318, 115,350)
	if ((data.messageLevel).toString().length == 1) {
	image.setTextFont('38px Arial Black')
	image.setColor("#fff")
	image.printText(`${data.messageLevel}`, 53,77,350)
	} else {
	image.setTextFont('38px Arial Black')
 	image.setColor("#fff")
	image.printText(`${data.messageLevel}`, 40,77,350)
	}
	if ((data.messageLevel+1).toString().length == 1) {
	image.setTextFont('38px Arial Black')
	image.setColor("#fff")
	image.printText(`${data.messageLevel+1}`, 233 , 77 ,350)
	} else {
	image.setTextFont('38px Arial Black')
	image.setColor("#fff")
  	image.printText(`${data.messageLevel+1}`, 220, 77,350)
	}
	image.save()
	let para = 2000*(data.messageLevel+1)
	const attachment = new MessageAttachment(image.toBuffer(), 'rainha-level.png');
	message.channel.send({ content: `> **[** \`${message.author.username}\` **]** kullanıcısı level atladı TEBRİKLER!`, files:  [attachment] });
	await Stat.findOneAndUpdate({ guildID: god.GuildID, userID: message.author.id }, { $set: {["messageXP"]: 0}, $inc: {["messageLevel"]: 1 }}, { upsert: true });
	await rainha.findOneAndUpdate({ guildID: god.GuildID, userID: message.author.id }, { $inc: { dolar: +para } }, { upsert: true });
	}
	await levelMessageXP(message.author.id, message.channel.id, 1, message.channel.parentId || "nocategory");
};

async function levelMessageXP(id, channel, value, category) {
let randomMessageXP = [2, 4, 6, 8, 10, 12, 14, 16, 18].random();
await Stat.findOneAndUpdate({ guildID: god.GuildID, userID: id }, { $inc: { messageXP: randomMessageXP } }, { upsert: true });
};

module.exports.conf = {
 name: "messageCreate",
};