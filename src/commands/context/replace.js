const { ContextMenuCommandBuilder, ApplicationCommandType, PermissionFlagsBits } = require("discord.js");
const event = require("../../events");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName('replace')
    .setType(ApplicationCommandType.Message)
    .setDefaultMemberPermissions(PermissionFlagsBits.kickMembers),

  async execute(interaction) {
    await interaction.deferReply();
    const message = interaction.targetMessage;
    await event.copycatMessage(
      message,
      {
        content: message.content,
        files: message.attachments
      }
    );
    console.log(`Replaced message.`);

    await message.delete();
    await interaction.deleteReply();
  },
}

