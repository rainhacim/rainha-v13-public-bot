const { SlashCommandBuilder, hyperlink  } = require("@discordjs/builders");
const { MessageEmbed, IntegrationApplication } = require("discord.js");
const god = require("../../../../config.json")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("restart")
    .setDescription("Guard/Backup Botlarını Yeniden Başlatmayı Sağlar."),

  async execute(interaction, client) {
    if(!god.owners.includes(interaction.user.id)) {
        return interaction.reply({ content: "<a:warnn:1117866163565772854> **Bot developerı olmadığın için kullanamazsınız.**", ephemeral: true })
    }
    await interaction.reply({ content: `**Bot Yeniden başlatılıyor!** <a:loadd:1117871776458866738>`, ephemeral: true })
    process.exit(0)
}
  };