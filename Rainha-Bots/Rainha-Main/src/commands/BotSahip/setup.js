const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const god = require("../../../../../config.json");
const { Database } = require("ark.db");
const rainhasetupxd = new Database("/src/configs/sunucuayar.json");
const ayar = require("../../configs/sunucuayar.json");

module.exports = {
  conf: {
    aliases: ["kur","setup"],
    name: "setup",
    help: "setup",
    category: "sahip",
    owner: true,
  },

  run: async (client, message, args) => {

    let choose = args[0]

const row = new MessageActionRow()
.addComponents(
new MessageSelectMenu()
.setCustomId('select')
.setPlaceholder('Bot Kurulum bilgilendirme için tıklayınız')
.addOptions([
  { label: 'Bot Kurulum Bilgilendirme', description: 'Bot kurulum komutları hakkında bilgi almanızı sağlar.', value: 'help' },
  { label: 'Bot Kurulum Liste', description: 'Bot kurulum listesindeki kayıtlı verileri gösterir.', value: 'help2' },
]),
);
    
const row2 = new MessageActionRow()
.addComponents(
new MessageSelectMenu()
.setCustomId('select2')
.setPlaceholder('Bot Kurulum komutları için tıklayınız')
.addOptions([
  { label: 'Sunucu Kurulum Bilgilendirme', description: 'Sunucu kurulum komutları hakkında bilgi almanızı sağlar.', value: 'Server' },
  { label: 'Rol Kurulum Bilgilendirme', description: 'Rol kurulum komutları hakkında bilgi almanızı sağlar.', value: 'Roles' },
  { label: 'Kanal Kurulum Bilgilendirme', description: 'Kanal kurulum komutları hakkında bilgi almanızı sağlar.', value: 'Channel' },
  { label: 'Kategori Kurulum Bilgilendirme', description: 'Kategori kurulum komutları hakkında bilgi almanızı sağlar.', value: 'Category' },
  { label: 'Veri Yenileme', description: 'Sunucu kurulumunuz bittikten sonra verileri dataya günceller.', value: 'Restart' },
]),
);

const row3 = new MessageActionRow()
.addComponents(
new MessageSelectMenu()
.setCustomId('select3')
.setPlaceholder('Bot Kurulum Verileri için tıklayınız')
.addOptions([
  { label: 'Sunucu Veri Bilgilendirme', description: 'Sunucu kurulum verilerinden kurulanları görüntülersiniz.', value: 'Server2' },
  { label: 'Rol Veri Bilgilendirme', description: 'Rol kurulum verilerinden kurulanları görüntülersiniz.', value: 'Roles2' },
  { label: 'Kanal Veri Bilgilendirme', description: 'Kanal kurulum verilerinden kurulanları görüntülersiniz.', value: 'Channel2' },
  { label: 'Kategori Veri Bilgilendirme', description: 'Kategori kurulum verilerinden kurulanları görüntülersiniz.', value: 'Category2' },
  { label: 'Veri Yenileme', description: 'Sunucu verilerinizi en son kurduğunuz haline günceller.', value: 'Restart2' },
]),
);

if(!choose) {
await message.reply({ content: `Botun kurulumu hakkında bilgi almak için aşağıdaki menüyü kullanınız.`, components: [row] });
}

const embed = new MessageEmbed().setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
.setDescription(`${message.author.toString()}, **${message.guild.name}** sunucususu içerisinde <t:${Math.floor(Date.now() / 1000)}:R>'den itibaren sunucu kurulum komutları hakkında bilgilendirme almak için aşağıdaki menüyü kullanabilirsiniz.`)
.setFooter({
text: `Veri Yenileme ile kurulum verilerinizi datadan güncellemeyi unutmayınız.`,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})

const embed2 = new MessageEmbed().setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
.setDescription(`${message.author.toString()}, **${message.guild.name}** sunucususu içerisinde <t:${Math.floor(Date.now() / 1000)}:R>'den itibaren sunucuda kurulumu gerçekleşmiş olan veriler hakkında bilgilendirme almak için aşağıdaki menüyü kullanabilirsiniz.`)
.setFooter({
text: `Veri Yenileme ile kurulum verilerinizi datadan güncellemeyi unutmayınız.`,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})

const filter = i => i.user.id == message.author.id    
    let collector = await message.channel.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 5, time: 120000 })
    collector.on("collect", async (interaction) => {

    if (interaction.values[0] === "Server") {
const sunucu = new MessageEmbed()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden sunucu ayarlarının kurulum komutlarının kullanımını görüntülüyebilirsiniz.

\`\`\`diff\n- SUNUCU KURULUM AYARLARI -\`\`\`
!kur tag \`<Örnek: ✬ >\`
!kur ikinciTag \`<Örnek: • >\`
!kur url \`<Örnek: Rainha >\`
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [sunucu], components: [], ephemeral: true }).catch({});
    }

    if (interaction.values[0] === "Roles") {
const rol = new MessageEmbed()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden rollerin kurulum komutlarının kullanımını görüntülüyebilirsiniz.

\`\`\`diff\n- ROL KURULUM AYARLARI -\`\`\`
!kur manRoles \`<Örnek: @🌀 Mannlich @♂ >\`
!kur womanRoles \`<Örnek: @🌺 Weiblich @♀️ >\`
!kur unregRoles \`<Örnek: @Kayıtsız >\`
!kur familyRole \`<Örnek: @Taglı >\`
!kur boosterRole \`<Örnek: @Server Booster >\`
!kur staffs \`<Örnek: @Yetkili @Yetkili2 >\`
!kur yetkiliRoles \`<Örnek: @SağGörünümPerm @RegisterRol >\`
!kur teyitciRoles \`<Örnek: @BotKomutRol @RegisterRol >\`
!kur sahipRoles \`<Örnek: @Owner @Ceo >\`
!kur rolverici \`<Örnek: @Tag @ÇiftTag >\`
!kur canlıdestek \`<Örnek: @Canlı Destek >\`(Destek Bot)
!kur yetkilialım \`<Örnek: @Yetkili Alım DM >\`(Destek Bot)

\`\`\`diff\n- PERM ROL KURULUM AYARLARI -\`\`\`
!kur vipRole \`<Örnek: @Vip >\`
!kur müzisyenRole \`<Örnek: @Musician >\`
!kur tasarımcıRole \`<Örnek: @Designer >\`
!kur streamerRole \`<Örnek: @Streamer >\`
!kur terapistRole \`<Örnek: @Terapist >\`
!kur sorunçözücüRole \`<Örnek: @Sorun Çözücü >\`

\`\`\`diff\n- CEZALANDIRMA ROL KURULUM AYARLARI -\`\`\`
!kur jailRole \`<Örnek: @⛔ Karantina >\`
!kur chatMute \`<Örnek: @Muted >\`
!kur voiceMute \`<Örnek: @V.Muted >\`
!kur fakeAccRole \`<Örnek: @🛑 Cezalı >\`
!kur warnHammer \`<Örnek: @|| Warn >\`
!kur banHammer \`<Örnek: @|| Ban >\`
!kur jailHammer \`<Örnek: @|| Jail >\`
!kur cmuteHammer \`<Örnek: @|| Chat Mute >\`
!kur vmuteHammer \`<Örnek: @|| Voice Mute >\`
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [rol], components: [], ephemeral: true }).catch({});
    }

    if (interaction.values[0] === "Channel") {
const kanal = new MessageEmbed()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden kanal ayarlarının kurulum komutlarının kullanımını görüntülüyebilirsiniz.

\`\`\`diff\n- KANAL KURULUM AYARLARI -\`\`\`
!kur kurallar \`<Örnek: #rules >\`
!kur chatChannel \`<Örnek: #chat >\`
!kur welcomeChannel \`<Örnek: #welcome-to-server >\`
!kur inviteChannel \`<Örnek: #invite-channel >\`
!kur banLogChannel \`<Örnek: #ban-log >\`
!kur jailLogChannel \`<Örnek: #jail-log >\`
!kur cmuteLogChannel \`<Örnek: #mute-bilgi >\`
!kur vmuteLogChannel \`<Örnek: #ses-mute-bilgi >\`
!kur warnLogChannel \`<Örnek: #uyarı-log >\`
!kur cezapuanlog \`<Örnek: #ceza-puan-bilgi >\`
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [kanal], components: [], ephemeral: true }).catch({});
    }

    if (interaction.values[0] === "Category") {
const kategori = new MessageEmbed()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden kategori ayarlarının kurulum komutlarının kullanımını görüntülüyebilirsiniz.

\`\`\`diff\n- KATEGORİ KURULUM AYARLARI -\`\`\`
!kur registerParents \`<Örnek: #WELCOME-TO-SERVER >\`
!kur publicParents \`<Örnek: #SERVER-PUBLIC-VOICE >\`
!kur funParents \`<Örnek: #VK-DC-ROOMS/#GAME-ROOMS >\`
!kur solvingParents \`<Örnek: #SORUN-ÇÖZÜM/#SERVER-SILIVRI >\`
!kur privateParents \`<Örnek: #SECRET-ODALAR >\`
!kur aloneParents \`<Örnek: #ALONA-ODALAR >\`
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [kategori], components: [], ephemeral: true }).catch({});
    }

if (interaction.values[0] === "Restart") {
    await interaction.reply({ content: `Sunucu Kurulum Verileri Güncelleniyor ve __**Bot**__ yeniden başlatılıyor!`, components: [], ephemeral: true }).catch({});
    process.exit(0)
    }
})

    let collector2 = await message.channel.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 5, time: 120000 })
    collector2.on("collect", async (interaction) => {

    if (interaction.values[0] === "Server2") {
const embed = new MessageEmbed()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden bota kurulmuş veya kurulmamış Sunucu ayarları verilerini görüntülüyebilirsiniz.

\`\`\`diff\n- SUNUCU KURULUM VERİLERİ -\`\`\`
Bot-Owner: (${god.owners.length > 0 ? `${god.owners.map(x => `<@${x}>`).join(",")}` : "\`YOK\`"})
Tag: (\` ${ayar.tag ? ayar.tag : "YOK"} \`) / (\` ${ayar.ikinciTag ? ayar.ikinciTag : "YOK"} \`)
Link: (${ayar.serverUrl ? ayar.serverUrl : "\`YOK\`"})
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [embed], components: [], ephemeral: true }).catch({});
    }

    if (interaction.values[0] === "Roles2") {
const embed = new MessageEmbed()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden bota kurulmuş veya kurulmamış rol ayarları verilerini görüntülüyebilirsiniz.

\`\`\`diff\n- ROL KURULUM VERİLERİ -\`\`\`
Man Roles: (${ayar.erkekRolleri.length > 0 ? `${ayar.erkekRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Woman Roles: (${ayar.kizRolleri.length > 0 ? `${ayar.kizRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Unregister Role: (${ayar.unregRoles.length > 0 ? `${ayar.unregRoles.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Family Role: (${ayar.ekipRolu ? `<@&${ayar.ekipRolu}>` : "\`YOK\`"})
Booster Role: (${ayar.boosterRolu ? `<@&${ayar.boosterRolu}>` : "\`YOK\`"})
Staff Roles: (${ayar.staffs.length > 0 ? `${ayar.staffs.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Yetkili Roles: (${ayar.yetkiRolleri.length > 0 ? `${ayar.yetkiRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Teyitci Roles: (${ayar.teyitciRolleri.length > 0 ? `${ayar.teyitciRolleri.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Sahip Roles: (${ayar.sahipRolu.length > 0 ? `${ayar.sahipRolu.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Rol Verici Roles: (${ayar.rolverici.length > 0 ? `${ayar.rolverici.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Canlı Destek Role: (${ayar.canlıdestekRol ? `<@&${ayar.canlıdestekRol}>` : "\`YOK\`"})
Yetkili Alım Role: (${ayar.yetkilialımRol ? `<@&${ayar.yetkilialımRol}>` : "\`YOK\`"})

\`\`\`diff\n- PERM KURULUM VERİLERİ -\`\`\`
Vip Role: (${ayar.vipRole ? `<@&${ayar.vipRole}>` : "\`YOK\`"})
Müzisyen Rol: (${ayar.müzisyenRole ? `<@&${ayar.müzisyenRole}>` : "\`YOK\`"})
Tasarımcı Rol: (${ayar.tasarımcıRole ? `<@&${ayar.tasarımcıRole}>` : "\`YOK\`"})
Streamer Role: (${ayar.streamerRole ? `<@&${ayar.streamerRole}>` : "\`YOK\`"})
Terapist Rol: (${ayar.terapistRole ? `<@&${ayar.terapistRole}>` : "\`YOK\`"})
Sorun Çözme Rol: (${ayar.sorunçözücüRole ? `<@&${ayar.sorunçözücüRole}>` : "\`YOK\`"})

\`\`\`diff\n- CEZALANDIRMA ROL KURULUM VERİLERİ -\`\`\`
Jail Role: (${ayar.jailRole.length > 0 ? `${ayar.jailRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Chat Mute Role: (${ayar.chatMute.length > 0 ? `${ayar.chatMute.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Voice Mute Role: (${ayar.voiceMute.length > 0 ? `${ayar.voiceMute.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"}))
Fake Account Role: (${ayar.fakeAccRole.length > 0 ? `${ayar.fakeAccRole.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Warn Hammer Role: (${ayar.warnHammer.length > 0 ? `${ayar.warnHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Ban Hammer Role: (${ayar.banHammer.length > 0 ? `${ayar.banHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
Jail Hammer Role: (${ayar.jailHammer.length > 0 ? `${ayar.jailHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
CMute Hammer Role: (${ayar.cmuteHammer.length > 0 ? `${ayar.cmuteHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
VMute Hammer Role: (${ayar.vmuteHammer.length > 0 ? `${ayar.vmuteHammer.map(x => `<@&${x}>`).join(",")}` : "\`YOK\`"})
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})

      await interaction.reply({ embeds: [embed], components: [], ephemeral: true }).catch({});
    }

    if (interaction.values[0] === "Channel2") {
const embed = new MessageEmbed()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden bota kurulmuş veya kurulmamış kanal ayarları verilerini görüntülüyebilirsiniz.

\`\`\`diff\n- KANAL KURULUM VERİLERİ -\`\`\`
Kurallar: (${ayar.kurallar.length ? `<#${ayar.kurallar}>` : "\`YOK\`"})
Chat Channel: (${ayar.chatChannel.length ? `<#${ayar.chatChannel}>` : "\`YOK\`"})
Welcome Channel: (${ayar.teyitKanali.length ? `<#${ayar.teyitKanali}>` : "\`YOK\`"})
İnvite Channel: (${ayar.invLogChannel.length ? `<#${ayar.invLogChannel}>` : "\`YOK\`"})
Ban Log Channel: (${ayar.banLogChannel.length ? `<#${ayar.banLogChannel}>` : "\`YOK\`"})
Jail Log Channel: (${ayar.jailLogChannel.length ? `<#${ayar.jailLogChannel}>` : "\`YOK\`"})
CMute Log Channel: (${ayar.cmuteLogChannel.length ? `<#${ayar.cmuteLogChannel}>` : "\`YOK\`"})
VMute Log Channel: (${ayar.vmuteLogChannel.length ? `<#${ayar.vmuteLogChannel}>` : "\`YOK\`"})
Warn Log Channel: (${ayar.warnLogChannel.length ? `<#${ayar.warnLogChannel}>` : "\`YOK\`"})
Ceza-Puan Log Channel: (${ayar.cezapuanlog.length ? `<#${ayar.cezapuanlog}>` : "\`YOK\`"})
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [embed], components: [], ephemeral: true }).catch({});
    }

    if (interaction.values[0] === "Category2") {
const embed = new MessageEmbed()
.setDescription(`${message.author.toString()}, ${message.guild.name} sunucusu içerisinde Aşağıdaki listeden bota kurulmuş veya kurulmamış kategori ayarları verilerini görüntülüyebilirsiniz.

\`\`\`diff\n- KATEGORİ KURULUM VERİLERİ -\`\`\`
Register Parents: (** ${ayar.registerParents.length ? `${ayar.registerParents.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
Public Parents: (** ${ayar.publicParents.length ? `<#${ayar.publicParents}>` : "\`YOK\`"} **)
Fun Parents: (** ${ayar.funParents.length > 0 ? `${ayar.funParents.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
Solving Parents: (** ${ayar.solvingParents.length > 0 ? `${ayar.solvingParents.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
Private Parents: (** ${ayar.privateParents.length ? `${ayar.privateParents.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
Alone Parents: (** ${ayar.aloneParents.length ? `${ayar.aloneParents.map(x => `<#${x}>`).join(",")}` : "\`YOK\`"} **)
`)
.setFooter({
text: message.author.tag,
iconURL: message.author.displayAvatarURL({ dynamic: true })
})
      await interaction.reply({ embeds: [embed], components: [], ephemeral: true }).catch({});
    }

if (interaction.values[0] === "Restart2") {
      await interaction.reply({ content: `Sunucu Kurulum Verileri Güncelleniyor ve __**Bot**__ yeniden başlatılıyor!`, components: [], ephemeral: true }).catch({});
      process.exit(0)
    }
})

    const collector3 = message.channel.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 2, time: 120000 });
    collector3.on("collect", async (interaction) => {
   
        if (interaction.values[0] === "help") {
            await interaction.reply({ embeds: [embed], components: [row2], ephemeral: true }).catch({});
          }
          if (interaction.values[0] === "help2") {
            await interaction.reply({ embeds: [embed2], components: [row3], ephemeral: true }).catch({});
          }
    
        });



/////
const setup1 = [
  { name: ["tag"], conf: "tag", cmdName: "Tag" },
  { name: ["secondarytag", "secondary-tag", "ikincitag", "ikinciTag"], conf: "ikinciTag", cmdName: "İkinci Tag" },
  { name: ["link", "url"], conf: "serverUrl", cmdName: "Url" },
]

const setup2 = [
  { name: ["staffs","staffrole","staffRole","staffRoles"], conf: "staffs", cmdName: "Yetkili Rol(leri)" },
  { name: ["erkekrol","manrole","manRoles","manroles"], conf: "erkekRolleri", cmdName: "Erkek Rolleri Rol(leri)" },
  { name: ["kadınrol","womanrole","womanRoles","womanroles"], conf: "kizRolleri", cmdName: "Kız Rolleri Rol(leri)" },
  { name: ["kayıtsızrol","unregisterrole","unregisterRole","unregRoles"], conf: "unregRoles", cmdName: "Kayıtsız Rol(leri)" },
  { name: ["yetkilirol","yetkilirole","yetkiliRole","yetkiliRoles"], conf: "yetkiRolleri", cmdName: "Yetki Rol(leri)" },
  { name: ["teyitcirol","teyitcirole","teyitciRole","teyitciRoles"], conf: "teyitciRolleri", cmdName: "Teyitci Rol(leri)" },
  { name: ["sahiprol","sahiprole","sahipRole","sahipRoles"], conf: "sahipRolu", cmdName: "Sahip Rol(leri)" },
  { name: ["warnHammer","warnhammer","warnh"], conf: "warnHammer", cmdName: "Warn Hammer" },
  { name: ["banHammer","banhammer","banh"], conf: "banHammer", cmdName: "Ban Hammer" },
  { name: ["jailHammer","jailhammer","jailh"], conf: "jailHammer", cmdName: "Jail Hammer" },
  { name: ["cmutehammer","cmuteHammer","cmh"], conf: "cmuteHammer", cmdName: "Chat-Mute Hammer" },
  { name: ["vmutehammer","vmuteHammer","vmh"], conf: "vmuteHammer", cmdName: "Voice-Mute Hammer" },
  { name: ["jail","jailRole","jailRole","jailRoles"], conf: "jailRole", cmdName: "Jail Rol" },
  { name: ["chatMute","chatmute","chatMuteRole","chatmterole"], conf: "chatMute", cmdName: "Chat-Mute Rol" },
  { name: ["voiceMute","voicemute","voicemuteRole","voicemuterole"], conf: "voiceMute", cmdName: "Voice-Mute Rol" },
  { name: ["fakeAcc","fakeaccrole","fakeAccRole","fakeAccRoles"], conf: "fakeAccRole", cmdName: "Yeni Hesap Rol" },
  { name: ["rolverici","rolvericirole","rolvericiRole","rolvericiRoles"], conf: "rolverici", cmdName: "Rol Yönetici Rol" },
]

const setup3 = [
  { name: ["taglırol","familyrole","familyRole","familyRoles"], conf: "ekipRolu", cmdName: "Taglı Rol(leri)" },
  { name: ["boosterrol","boosterrole","boosterRole","boosterRoles"], conf: "boosterRolu", cmdName: "Booster Rol" },
  { name: ["viprol","viprole","vipRole","vipRoles"], conf: "vipRole", cmdName: "Vip Rol" },
  { name: ["müzisyenrol","müzisyenrole","müzisyenRole","müzisyen"], conf: "müzisyenRole", cmdName: "Müziysen Rol" },
  { name: ["tasarımcırol","tasarımcırole","tasarımcıRole","tasarımcı"], conf: "tasarımcıRole", cmdName: "Tasarımcı Rol" },
  { name: ["streamerrol","streamerrole","streamerRole","streamer"], conf: "streamerRole", cmdName: "Streamer Rol" },
  { name: ["sorunçözücürol","sorunçözücürole","sorunçözücüRole","sorunçözücü"], conf: "sorunçözücüRole", cmdName: "Sorun Çöüzücü Rol" },
  { name: ["terapistrol","terapistrole","terapistRole","terapist"], conf: "terapistRole", cmdName: "Terapist Rol" },
  { name: ["canlıdestekrol","canlıdestekrole","canlıdestekRole","canlıdestek"], conf: "canlıdestekRol", cmdName: "Canlı Destek Rol" },
  { name: ["yetkilialımrol","yetkilialımrole","yetkilialımRole","yetkilialım"], conf: "yetkilialımRol", cmdName: "Yetkili Alım Rol" },
]

const setup4 = [
  { name: ["chat","genelchat","chatChannel","chatchannel"], conf: "chatChannel", cmdName: "Chat Kanal" },
  { name: ["welcome","register","welcomechannel","welcomeChannel"], conf: "teyitKanali", cmdName: "Hoşgeldin Kanal" },
  { name: ["invite","invitekanal","inviteChannel","invitechannel"], conf: "invLogChannel", cmdName: "İnvite Kanal" },
  { name: ["bankanal","banlog","banLogChannel","banlogchannel"], conf: "banLogChannel", cmdName: "Ban Log Kanal" },
  { name: ["jailkanal","jaillog","jailLogChannel","jaillogchannel"], conf: "jailLogChannel", cmdName: "Jail Log Kanal" },
  { name: ["cmutekanal","cmutelog","cmuteLogChannel","cmutelogchannel"], conf: "cmuteLogChannel", cmdName: "Chat-Mute Log Kanal" },
  { name: ["vmutekanal","vmutelog","vmuteLogChannel","vmutelogchannel"], conf: "vmuteLogChannel", cmdName: "Voice-Mute Log Kanal" },
  { name: ["warnkanal","warnlog","warnLogChannel","warnlogchannel"], conf: "warnLogChannel", cmdName: "Uyarı Log Kanal" },
  { name: ["rules","kurallar","kurallarkanalı","ruleschannel"], conf: "kurallar", cmdName: "Kurallar Kanal" },
  { name: ["cezapuankanal","cezapuanlog","cezapuanLogChannel","cezapuanlogchannel"], conf: "cezapuanlog", cmdName: "Ceza Puan Log Kanal" },
]
 
const setup5 = [
  { name: ["registerParents","registerparents","registerParent","registerparent"], conf: "registerParents", cmdName: "Register Kategori" },
  { name: ["solvingParents","solvingparents","solvingParent","solvingparent"], conf: "solvingParents", cmdName: "Geçersiz Kategori(leri)" },
  { name: ["privateParents","privateparents","privateParent","privateparent"], conf: "privateParents", cmdName: "Secret Kategori" },
  { name: ["aloneParents","aloneparents","aloneParent","aloneparent"], conf: "aloneParents", cmdName: "Alone Kategori" },
  { name: ["funParents","funparents","funParent","funparent"], conf: "funParents", cmdName: "Eğlence Kategori(leri)" },
]

const setup6 = [
  { name: ["publicParents","publicparents","publicParent","publicparent"], conf: "publicParents", cmdName: "Public Kategori" },
]

setup1.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  let select = args[1];
  if (!select) {
  message.reply({ content: `Sunucu **${x.cmdName}** belirtmelisin`, ephemeral: true });
  return }
  rainhasetupxd.set(`${x.conf}`, `${select}`)
  message.reply({ content: `**${select}** ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true })
};
});

setup2.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  let rol;
  if (message.mentions.roles.size >= 1) {
    rol = message.mentions.roles.map(r => r.id);
  }
  let db = rainhasetupxd.get(`${x.conf}`)
  if(rol) {
  if(db.some(rainha => rainha.includes(rol.id))) {
    rainhasetupxd.pull(`${x.conf}`, `${rol.map(x => x)}`)
  message.reply({ content: `${rol.map(x => `<@&${x}>`)} ${x.cmdName} listesinden başarıyla kaldırıldı.`, ephemeral: true })
  } else {
  let xd = []
  rol.map(x => 
  xd.push(`${x}`)
  )
  rainhasetupxd.set(`${x.conf}`, xd)
  message.reply({ content: `${rol.map(x => `<@&${x}>`)} ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true })
  }
  } else if (!rol) {
  message.reply({ content: `Sunucu ${x.cmdName} belirtmelisin`, ephemeral: true });
  return }
  };
});
   
setup3.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(rainha => rainha.name === args.join(" "))
  if (rol) {
  rainhasetupxd.set(`${x.conf}`, `${rol.id}`)
  message.reply({ content: `${rol} ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true })
  } else if (!rol) {
  message.reply({ content: `Sunucu ${x.cmdName} belirtmelisin`, ephemeral: true });
  return }
};
});

setup4.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || message.guild.channels.cache.find(rainha => rainha.name === args.join(" "))
  if (channel) {
  rainhasetupxd.set(`${x.conf}`, `${channel.id}`)
  message.reply({ content: `<#${channel.id}> ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true })
  } else if (!channel) {
  message.reply({ content: `Sunucu ${x.cmdName} belirtmelisin`, ephemeral: true });
  return }
  };
});

setup5.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  let kanal;
  if (args.length >= 1) {
    kanal = args
    .filter((id) => message.guild.channels.cache.has(id))
    .map((id) => message.guild.channels.cache.get(id));
  }
  let db = rainhasetupxd.get(`${x.conf}`)
  if(kanal) {
  if(db.some(rainha => rainha.includes(kanal.id))) {
  rainhasetupxd.pull(`${x.conf}`, `${kanal.map(x => x)}`)
  message.reply({ content: `**${kanal.map(x => `${x}`)}** ${x.cmdName} listesinden başarıyla kaldırıldı.`, ephemeral: true })
  } else {
  let xd = []
  kanal.map(x => 
  xd.push(`${x.id}`)
  )
  rainhasetupxd.set(`${x.conf}`, xd)
  message.reply({ content: `**${kanal.map(x => `${x}`)}** ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true })
  }
  } else if (!kanal) {
  message.reply({ content: `Sunucu **${x.cmdName}** belirtmelisin`, ephemeral: true });
  return }
  };
});

setup6.forEach(async (x) => {
  if(x.name.some(x => x === choose)) {
  let rainhawjer = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
  if (!rainhawjer) return message.reply({ content: `Sunucu **${x.cmdName}** belirtmelisin`, ephemeral: true })
  rainhasetupxd.set(`${x.conf}`, rainhawjer.id)
  message.reply({ content: `**${rainhawjer}** ${x.cmdName} listesine başarıyla eklendi.`, ephemeral: true });
};
});

  }
};