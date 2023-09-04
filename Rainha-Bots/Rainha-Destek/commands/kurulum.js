const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, IntegrationApplication, MessageActionRow, MessageButton } = require("discord.js");
const { cizgi, green, red, star } = require('../../Rainha-Main/src/configs/emojis.json');
const { Database } = require("ark.db");
const rainhasetupxd = new Database("../data.json");
const conf = require('../../Rainha-Main/src/configs/sunucuayar.json');
const god = require('../../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kurulum")
    .setDescription("Destek bot kanal ve emoji kurulumunu sağlar."),

  async execute(interaction, client) {
   
     if(interaction.guild === null) {
        return interaction.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
      } else if(!god.owners.includes(interaction.user.id)) {
        return interaction.reply({ content: "<a:warnn:1117866163565772854> **Bot developerı olmadığın için kurulumu yapamazsın.**", ephemeral: true })
      } else {

       await interaction.reply({ content: `${green} Support Kanal kurulumu başarıyla tamamlanmıştır.`, ephemeral: true })

            await interaction.guild.channels.create('Canlı Destek', { 
                type: 'GUILD_CATEGORY' 
              }).then(async (channel) => {
                rainhasetupxd.set("CanlıDestekKategoryID", `${channel.id}`)

            await interaction.guild.channels.create('Canlı Destek', { 
                type: 'GUILD_TEXT',
                parent: channel.id,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: conf.canlıdestekRol,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
               }]
              }).then(async (channel2) => {
                rainhasetupxd.set("CanlıDestekLogChannelID", `${channel2.id}`)
              });
            });

            const parent = await interaction.guild.channels.create('📋 Yetkili basvuru', { 
                type: 'GUILD_CATEGORY' 
              });

            await interaction.guild.channels.create('📋・yetkili-basvuru', { 
                type: 'GUILD_TEXT',
                parent: parent.id,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    allow: ['VIEW_CHANNEL','SEND_MESSAGES'],
                }]
              });

            await interaction.guild.channels.create('📋・yetkili-basvuru-onay', { 
                type: 'GUILD_TEXT',
                parent: parent.id,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    allow: ['VIEW_CHANNEL'],
                    deny: ['SEND_MESSAGES'],
                }]
              }).then(async (channel) => {
                rainhasetupxd.set("BaşvuruDurumLog", `${channel.id}`)
              });

            await interaction.guild.channels.create('📋・yetkili-basvuru-log', { 
                type: 'GUILD_TEXT',
                parent: parent.id,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
               {
                    id: conf.yetkilialımRol,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
               }]
              }).then(async (channel) => {
                rainhasetupxd.set("BaşvuruLogChannelID", `${channel.id}`)
              });

            await interaction.guild.channels.create('istek-sikayet-log', { 
                type: 'GUILD_TEXT',
                parent: parent.id,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    deny: ['VIEW_CHANNEL'],
                }]
              }).then(async (channel) => {
                rainhasetupxd.set("ÖneriİstekSikayetChannelID", `${channel.id}`)
              });
}
  },
};
