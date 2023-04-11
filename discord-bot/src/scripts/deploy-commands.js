const { SlashCommandBuilder } = require("@discordjs/builders")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { clientId, guildId, token } = require("./config.json")

const commands = [
  new SlashCommandBuilder()
    .setName("sim")
    .setDescription("Sims your WoW character")
    .addStringOption(option =>
      option
        .setName("charactername")
        .setDescription("Character Name")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("realmname")
        .setDescription("Realm Name")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("server")
        .setDescription("Server(EU/NA)")
        .setRequired(true)
        .addChoices({ name: "EU", value: "eu" }, { name: "NA", value: "us" })
    ),
].map(command => command.toJSON())

const rest = new REST({ version: "9" }).setToken(token)

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error)
