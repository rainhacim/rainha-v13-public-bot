const { Client, Collection } = require("discord.js");
const client = global.bot = new Client({
  fetchAllMembers: true,
  intents: [ 32767 ],
}); 
const Discord = require('discord.js');
const conf = require("./src/configs/sunucuayar.json");
const fs = require("fs");
client.commands = new Collection();
client.aliases = new Collection();
client.invites = new Collection();
client.cooldown = new Map();

const { Database } = require("ark.db");
const rankdb = (global.rankdb = new Database("./src/configs/ranks.json"));
client.ranks = rankdb.get("ranks") ? rankdb.get("ranks").sort((a, b) => a.coin - b.coin) : [];
const god = require("../../config.json");

//KOMUT ÇALIŞTIRMA
fs.readdir('./src/commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`[rainha] ${files.length} komut yüklenecek.`);
  files.forEach(f => {
    fs.readdir("./src/commands/" + f, (err2, files2) => {
      files2.forEach(file => {
        let props = require(`./src/commands/${f}/` + file);
        console.log(`[rainha KOMUT] ${props.conf.name} komutu yüklendi!`);
        client.commands.set(props.conf.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.conf.name);
        });
      })
    })
  });
});
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

client
  .login(god.Main.token)
  .then(() => console.log("Bot Başarıyla Bağlandı!"))
  .catch(() => console.log("[HATA] Bot Bağlanamadı!"));

  process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
    process.exit(1);
  });
  
  process.on("unhandledRejection", err => {
    console.error("Promise Hatası: ", err);
  });


  ///// slash commands
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v10');  
  client.slashcommands = new Collection();
  var slashcommands = [];
  
  fs.readdirSync('./src/Slashcommands/').forEach(async category => {
		const commands = fs.readdirSync(`./src/Slashcommands/${category}/`).filter(cmd => cmd.endsWith('.js'));
		for (const command of commands) {
		const Command = require(`./src/Slashcommands/${category}/${command}`);
    client.slashcommands.set(Command.data.name, Command);
    slashcommands.push(Command.data.toJSON());
		}
	});
  
	const rest = new REST({ version: '9' }).setToken(god.Main.token);
  (async () => {
	try {
		console.log('[rainha] Slash ve Komutlar yükleniyor.');
		await rest.put(
			Routes.applicationGuildCommands(god.Main.BotClientID, god.GuildID),
			{ body: slashcommands },
		).then(() => {
			console.log('[rainha] Slash ve Context Komutlar yüklendi.');
		});
	}
	catch (e) {
		console.error(e);
	}
})();

client.on('interactionCreate', (interaction) => {
  if (interaction.isContextMenu() || interaction.isCommand()) {
    const command = client.slashcommands.get(interaction.commandName);
    if (interaction.user.bot) return;
    if (!interaction.inGuild() && interaction.isCommand()) return interaction.editReply({ content: 'Komutları kullanmak için bir sunucuda olmanız gerekir.' });
    if (!command) return interaction.reply({ content: 'Bu komut kullanılamıyor.', ephemeral: true }) && client.slashcommands.delete(interaction.commandName);
    try {
      command.execute(interaction, client);
    }
    catch (e) {
      console.log(e);
      return interaction.reply({ content: `An error has occurred.\n\n**\`${e.message}\`**` });
    }
  }
});


////
let stats = require("./src/schemas/level");
 
let arr = [{
  Chat: "💬🥉",
  Voice: "🔊🥉",
  ChatColor: "#fa795b",
  VoiceColor: "#fa795b",
  sLevel: 3,
  cLevel: 2
}, {
  Chat: "💬🥈",
  Voice: "🔊🥈",
  ChatColor: "#cfcbcb",
  VoiceColor: "#cfcbcb",
  sLevel: 8,
  cLevel: 5
}, {
  Chat: "💬🥇",
  Voice: "🔊🥇",
  ChatColor: "#fffb00",
  VoiceColor: "#fffb00",
  sLevel: 20,
  cLevel: 35
}, {
  Chat: "💬🏆",
  Voice: "🔊🏆",
  ChatColor: "#23fafa",
  VoiceColor: "#23fafa",
  sLevel: 50,
  cLevel: 70
}]
client.checkLevel = async function (userID, guildID, type) {
  if (god.Main.LevelSystem == false) return;
  let sunucu = client.guilds.cache.get(guildID);
  if (!sunucu) return;
  let kontrol = await stats.findOne({
    userID: userID,
    guildID: guildID
  });
  if (!kontrol) return;
  const channel = client.channels.cache.find(x => x.name == "level_bilgi");
  arr.map(async data => {
    if (type === "mesaj") {
      if (kontrol.messageLevel >= data.cLevel) {
        if (kontrol.autoRankup.includes(data.Chat)) return;
        stats.updateOne({userID: userID, guildID: guildID}, {$push: {autoRankup: data.Chat}}, {upsert: true}).exec()
        await channel.send({ content: `:tada: <@${userID}> tebrikler! Mesaj istatistiklerin bir sonraki seviyeye atlaman için yeterli oldu. **"${data.Chat}"** rolüne terfi edildin!`})
      };
    };
    if (type === "ses") {
      if (kontrol.voiceLevel >= data.sLevel) {
        if (kontrol.autoRankup.includes(data.Voice)) return;
        stats.updateOne({userID: userID, guildID: guildID}, {$push: {autoRankup: data.Voice}}, {upsert: true}).exec()
        await channel.send({ content: `:tada: <@${userID}> tebrikler! Ses istatistiklerin bir sonraki seviyeye atlaman için yeterli oldu. **"${data.Voice}"** rolüne terfi edildin!`})
      };
    };
  });
};


// aylık üye sistemi

setInterval(() => {
  let OneMonth = "1 Aylık Üye 🏵️" // 1 aylık
  let ThreeMonth = "3 Aylık Üye ☘️" // 3 aylık
  let SixMonth = "6 Aylık Üye 🌿" // 6 aylık
  let NineMonth = "9 Aylık Üye 🍂" // 9 aylık
  let OneYear = "1 Yıllık Üye ⚒️" // 1 yılık
  const server = client.guilds.cache.get(settings.guildID); 
  server.members.cache.forEach(async member => {
if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 30) {await member.roles.add(OneMonth)}

if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 90) {await member.roles.remove(OneMonth)
  await member.roles.add(ThreeMonth)}

if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 180) {await member.roles.remove(ThreeMonth)
await member.roles.add(SixMonth)}

if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 270) {await member.roles.remove(SixMonth)
await member.roles.add(NineMonth)}

if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 365) {await member.roles.remove(NineMonth)
await member.roles.add(OneYear)}

        })
      }, 1000 * 60 * 60 * 24)