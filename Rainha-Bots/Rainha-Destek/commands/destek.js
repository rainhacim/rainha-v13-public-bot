const { Discord, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { Modal, TextInputComponent, showModal } = require('discord-modals')
const { SlashCommandBuilder } = require("@discordjs/builders");
const settings = require('../data.json');
const { green , red } = require('../../Rainha-Main/src/configs/emojis.json');
const conf = require('../../Rainha-Main/src/configs/sunucuayar.json');
const client = global.bot; 
const god = require('../../../config.json');

    module.exports = {
      data: new SlashCommandBuilder()
      .setName("destek")
      .setDescription("Öneri şikayet bildirmenizi veya canlı destek talebi açmanızı sağlar."),

      async execute(interaction, client) {

        const istek = new MessageButton()
        .setCustomId("istek")
        .setLabel("Öneri/İstek")
        .setStyle("SUCCESS")
    
        const sikayet = new MessageButton()
        .setCustomId("sikayet")
        .setLabel("Şikayet")
        .setStyle("DANGER")

        const canlıdestek = new MessageButton()
        .setCustomId("canlıdestek")
        .setLabel("Canlı Destek")
        .setStyle("PRIMARY")
  
        const basvuru = new MessageButton()
        .setCustomId("basvuru")
        .setLabel("Yetkili Başvuru")
        .setStyle("SECONDARY")

        const evet = new MessageButton()
        .setCustomId("evt")
        .setLabel("Evet")
        .setStyle("SUCCESS")
  
        const hayır = new MessageButton()
        .setCustomId("hyr")
        .setLabel("Hayır")
        .setStyle("DANGER")
  
        const onay = new MessageButton()
        .setCustomId("onayla")
        .setLabel("Onayla")
        .setStyle("SUCCESS")
  
        const red = new MessageButton()
        .setCustomId("reddet")
        .setLabel("Reddet")
        .setStyle("DANGER")

        const dk = new MessageButton()
        .setCustomId("kapat")
        .setLabel("Destek Sonlandır")
        .setStyle("SECONDARY")
        .setEmoji("🎫")
 
        const row = new MessageActionRow()
        .addComponents([istek, sikayet, canlıdestek, basvuru])

        const row2 = new MessageActionRow()
        .addComponents([evet, hayır])

        const row3 = new MessageActionRow()
        .addComponents([onay, red])

        const row31 = new MessageActionRow()
        .addComponents([dk])

       interaction.reply({ content: `Lütfen **20 saniye** içerisinde hangi hizmeti kullanmak istediğinizi aşağıdaki butonlara tıklayarak belirtin.`, components: [row]})

        const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', max: 2, time: 20000 });

       collector.on("collect", async (interaction) => {

            const filter = m => m.author === interaction.user;
            var cevaplar = {};
            istek: cevaplar["Öneri"]
    
          if(interaction.customId === "istek") {

            await interaction.update({ content: `Lütfen 60 saniye içerisinde önerinizi belirtiniz.`, components: []});
    
            interaction.channel.awaitMessages({filter, max: 1 }).then(async function (collected) {
            collected.each(msj => cevaplar["Öneri"] = msj.content);

            await interaction.deleteReply();
            await interaction.followUp( { content: `Öneriniz başarıyla iletildi!`, components: []});
    
    const rainha = new MessageEmbed()
    .setAuthor({
        name: "Öneri / İstek",
       iconURL: interaction.user.displayAvatarURL({ dynamic: true })
       })
       .setDescription(`**Gönderen:** ${interaction.user} - \`${interaction.user.id}\``)
       .addFields({ name: "Mesaj İçeriği", value: cevaplar["Öneri"], inline: true })
       .setColor("RANDOM")
       .setFooter({ text: interaction.user.username })
       .setTimestamp()
       
       var LogChannel = client.guilds.cache.get(god.GuildID).channels.cache.find((channel) => channel.id === settings.ÖneriİstekSikayetChannelID);
       LogChannel.send({ embeds: [rainha] })
    })
    
    } 
    
    if(interaction.customId === "sikayet") {

      await interaction.update({ content:`Lütfen 60 saniye içerisinde şikayetinizi belirtiniz.`, components: []}); 
    
            interaction.channel.awaitMessages({filter, max: 1 }).then(async function (collected) {
            collected.each(msj => cevaplar["Şikayet"] = msj.content);

            await interaction.deleteReply();
            await interaction.followUp({ content: `Şikayetiniz başarıyla iletildi!`, components: []});

    const rainha = new MessageEmbed()
    .setAuthor({
        name: "Şikayet",
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
    })
    .setDescription(`**Gönderen:** ${interaction.user} - \`${interaction.user.id}\``)
    .addFields({ name: "Mesaj İçeriği", value: cevaplar["Şikayet"], inline: true })
    .setColor("RANDOM")
    .setFooter({ text: interaction.user.username })
    .setTimestamp()

    var LogChannel = client.guilds.cache.get(god.GuildID).channels.cache.find((channel) => channel.id === settings.ÖneriİstekSikayetChannelID);
    LogChannel.send({ embeds: [rainha] })
    })
    } 
    
        if(interaction.customId === "canlıdestek") {
          await interaction.update({ content: `Görüşmelerimiz kayıt altına alınmaktadır! Trolleyen/Gereksiz kullananlar cezalandırılacaktır. Canlı desteğe bağlanmak istediğinizden emin misiniz?` , components: [row2]});
    } 
        
        if(interaction.customId === "evt") {
          await interaction.update({ content: `Sizi canlı destek ekibimize bağlıyorum, lütfen beklemede kalın...`, components: []});
  
var LogChannel = client.guilds.cache.get(god.GuildID).channels.cache.find((channel) => channel.id === settings.CanlıDestekLogChannelID);
  let rainha = new MessageEmbed()
  .setDescription(`
${interaction.user} - \`${interaction.user.id}\` kullanıcısı Canlı Desteğe bağlanmak istiyor kabul ediyormusunuz?
  `)
  .setAuthor({ name: "Canlı Destek", iconURL: client.guilds.cache.get(god.GuildID).iconURL({ dynamic: true, size: 2048 }) })
  .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 2048 }))
  .setTimestamp()

 let msg = await LogChannel.send({ content: `<@&${conf.canlıdestekRol}>`, embeds: [rainha], components: [row3] });

  const collector2 = msg.createMessageComponentCollector({ componentType: 'BUTTON', max: 1 });

  collector2.on("collect", async (interaction2) => {

    if (interaction2.customId == "onayla") {
  let rainha2 = new MessageEmbed()
  .setDescription(`
${interaction.user} - \`${interaction.user.id}\` kullanıcısının Canlı Destek başvurusu ${interaction2.user} tarafından başarıyla onaylandı.`)
  .setAuthor({ name: "Canlı Destek", iconURL: client.guilds.cache.get(god.GuildID).iconURL({ dynamic: true, size: 2048 }) })
  .setThumbnail(interaction2.user.displayAvatarURL({ dynamic: true, size: 2048 }))
  .setFooter({ text: "Kullanıcının destek talebini sonlandırmak için oluşturulan kanaldaki butonu kullanınız.", iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })

if(msg) msg.delete();

interaction2.reply({
  embeds : [rainha2],
  components : []
})

      client.guilds.cache.get(god.GuildID).channels.create(`${interaction.user.username}-destek`, {
        parent: settings.CanlıDestekKategoryID,
        topic: interaction.user.id,
        permissionOverwrites: [{
            id: interaction.user.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },

          {
            id: conf.canlıdestekRol,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: client.guilds.cache.get(god.GuildID).roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },
        ],
        type: 'text',
      }).then(async c => {

 c.send({
  content: `Canlı Destek Kanalı başarıyla oluşturuldu.\n**Not:** Destek işlemi bitince veya destek almaktan vazgeçerseniz buton yardımıyla kapatabilirsiniz.`,
  components : [row31]
})

interaction.user.send({
 content: `Canlı Destek bağlantınız başarıyla ${interaction2.user} tarafından onaylandı.\n\nBuradan destek için yetkililerimiz ile konuşabilirsiniz. \` > \` <#${c.id}>`
});
 });
}

    if (interaction2.customId == "reddet") {
  let rainha3 = new MessageEmbed()
  .setDescription(`
${interaction.user} - \`${interaction.user.id}\` kullanıcısının Canlı Destek başvurusu ${interaction2.user} tarafından reddedildi.
  `)
  .setAuthor({ name: "Canlı Destek", iconURL: interaction2.guild.iconURL({ dynamic: true, size: 2048 }) })
  .setThumbnail(interaction2.user.displayAvatarURL({ dynamic: true, size: 2048 }))
  .setTimestamp()

if(msg) msg.delete();

interaction2.reply({
  embeds : [rainha3],
  components : []
})

    await interaction.user.send({ content: `Canlı desteğe bağlanılırken bir hata oluştu veya bağlantı onaylanmadı!`, components: []}); 
}
    })


client.on("interactionCreate", async (interaction3) => {
if (interaction3.customId == "kapat") {
const guild = client.guilds.cache.get(interaction3.guildId);
const chan = guild.channels.cache.get(interaction3.channelId);
await chan.delete().catch(() => {});
}
})


          collector.stop()
        } 
    
        if(interaction.customId === "hyr") {
          await interaction.update({ content: `Canlı desteğe bağlanılırken bir hata oluştu veya bağlantı onaylanmadı!`, components: []}); 
          collector.stop()
        }


    if(interaction.customId === "basvuru") {

      if(!client.guilds.cache.get(god.GuildID).members.cache.get(interaction.user.id).roles.cache.has(conf.ekipRolu)) {
        return interaction.reply({ content: ":x: Tagın olmadığı için başvuramazsın.", ephemeral: true })
      } else if([conf.staffs].some(role2 => client.guilds.cache.get(god.GuildID).members.cache.get(interaction.user.id).roles.cache.get(role2))) {
        return interaction.reply({ content: ":x: Zaten Yetkili Rolüne Sahip olduğun için başvuramazsın.", ephemeral: true })
      } else {
        const modal = new Modal()
        .setCustomId('ybasvuru')
        .setTitle('Yetkili Başvuru')
        .addComponents(
          new TextInputComponent()
          .setCustomId('isimyas')
          .setLabel('İsim ve Yaşınız ?')
          .setStyle('SHORT')
          .setMinLength(5)
          .setMaxLength(20)
          .setPlaceholder('Lütfen buraya yazın. / Örn: Habib 24')
          .setRequired(true),
          new TextInputComponent()
          .setCustomId('aktiflik')
          .setLabel('Sunucumuzda günlük aktifliğiniz ?')
          .setStyle('SHORT')
          .setMinLength(1)
          .setMaxLength(10)
          .setPlaceholder('Lütfen buraya yazın. / Örn: 8 Saat')
          .setRequired(true),
          new TextInputComponent()
          .setCustomId('yarar')
          .setLabel('Sunucumuz için neler yapabilirsiniz ?')
          .setStyle('SHORT')
          .setMinLength(5)
          .setMaxLength(100)
          .setPlaceholder('Lütfen buraya yazın. / Örn: Günlük 5 invite ya da Diğer...')
          .setRequired(true),
          new TextInputComponent()
          .setCustomId('hakkında')
          .setLabel('Kendiniz hakkında biraz bilgi ?')
          .setStyle('SHORT')
          .setMinLength(5)
          .setMaxLength(100)
          .setPlaceholder('Lütfen buraya yazın. / Örn: Bot Kodlamayı severim.')
          .setRequired(true)
        );
        showModal(modal, { client, interaction });
      }
} 

});


  }
}
