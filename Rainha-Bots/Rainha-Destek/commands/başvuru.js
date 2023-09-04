const { Modal, TextInputComponent, showModal } = require('discord-modals')
const { SlashCommandBuilder } = require("@discordjs/builders");
const conf = require('../../Rainha-Main/src/configs/sunucuayar.json');
const god = require('../../../config.json');

    module.exports = {
      data: new SlashCommandBuilder()
      .setName("başvuru")
      .setDescription("Yetkili başvurusunda bulunmanızı sağlar."),

      async execute(interaction, client) {
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
        .setLabel('İsim Ve Yaşınız Nedir?')
        .setStyle('SHORT')
        .setMinLength(5)
        .setMaxLength(20)
        .setPlaceholder('Lütfen buraya yazın. / Örn: Mert 23')
        .setRequired(true),
        new TextInputComponent()
        .setCustomId('aktiflik')
        .setLabel('Sunucumuzda Günlük Aktifliğiniz Ne Kadar Olur?')
        .setStyle('SHORT')
        .setMinLength(1)
        .setMaxLength(10)
        .setPlaceholder('Lütfen buraya yazın. / Örn: 8 Saat')
        .setRequired(true),
        new TextInputComponent()
        .setCustomId('yarar')
        .setLabel('Sohbet Kanallarında Ne Kadar İlgilenebilirsiniz?')
        .setStyle('SHORT')
        .setMinLength(5)
        .setMaxLength(100)
        .setPlaceholder('Lütfen buraya yazın. / Örn: Günlük 4 Saat.')
        .setRequired(true),
        new TextInputComponent()
        .setCustomId('hakkında')
        .setLabel('Kendiniz hakkında biraz bilgi verebilir misiniz?')
        .setStyle('SHORT')
        .setMinLength(5)
        .setMaxLength(100)
        .setPlaceholder('Lütfen buraya yazın. / Örn: Müzik Dinlemeyi Severim.')
        .setRequired(true)
      );
      showModal(modal, { client, interaction });
    }
  }
}