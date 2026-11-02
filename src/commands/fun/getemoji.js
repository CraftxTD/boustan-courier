const { SlashCommandBuilder, GatewayIntentBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('getemoji')
    .setDescription('Get an emoji')
    .addStringOption(option => option
      .setName('emoji')
      .setDescription('Emoji id')
      .setRequired(true)
    ),

  async execute(interaction) {
    const string = interaction.options.getString('emoji');
    console.log(string);
    const emoji = await interaction.client.application.emojis.fetch(string);
    const response = await interaction.reply({ content: `${emoji}`, withResponse: true });
    await response.resource.message.react(string);
    await interaction.followUp("test");
  },
};
