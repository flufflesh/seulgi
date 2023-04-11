import "make-promises-safe"
import "dotenv/config"
import { logger } from "./logger"
import { Client, Intents, MessageEmbed } from "discord.js"
import fetch from "cross-fetch"
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.once("ready", () => {
  console.log("started bot")
})

const getSpellName = (sim: any, i: number): string => {
  if (!sim.sim.players[0].stats[i].portion_apse?.mean) {
    return getSpellName(sim, i + 1)
  }
  return sim.sim.players[0].stats[i].spell_name
}

const getSpellDamage = (sim: any, i: number): number => {
  if (!sim.sim.players[0].stats[i].portion_apse?.mean) {
    return getSpellDamage(sim, i + 1)
  }
  return Math.round(sim.sim.players[0].stats[i].portion_apse.mean)
}

const getCount = (sim: any, i: number): string => {
  if (!sim.sim.players[0].stats[i].portion_apse?.mean) {
    return getCount(sim, i + 1)
  }
  return String(Math.round(sim.sim.players[0].stats[i].num_direct_results.mean))
}

client.on("interaction", async interaction => {
  if (!interaction.isCommand()) return

  if (interaction.commandName === "sim") {
    await interaction.reply("simming..")

    const characterName = interaction.options.getString("charactername", true)
    const realmName = interaction.options
      .getString("realmname")
      ?.split(/\s+/g)
      .join("-")
    const server = interaction.options.getString("server")

    const requestBody = {
      character: {
        characterName,
        realm: realmName,
        region: server,
      },
    }
    const simRes = await fetch("http://localhost:8084/sim", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const { sim, simId } = await simRes.json()
    const embed = new MessageEmbed()
      .setColor("#00FF98")
      .setTitle(
        `${characterName?.charAt(0).toUpperCase() +
          characterName?.slice(1)}'s simulation`
      )
      .setURL("http://localhost:8084/sim/reports/" + simId)
      .setAuthor({ name: "Simming tool" })
      .addFields([
        {
          name: "Class",
          value: sim.sim.players[0].specialization,
          inline: true,
        },
        { name: "Avg Length", value: "300 Sec", inline: true },
        {
          name: "DPS",
          value: String(
            Math.round(sim.sim.players[0].collected_data.dpse.mean)
          ),
          inline: true,
        },
        { name: "\u200B", value: "\u200B" },
        {
          name: getSpellName(sim, 0),
          value: getSpellDamage(sim, 0) + " DPS",
          inline: true,
        },
        {
          name: "Count",
          value: getCount(sim, 0),
          inline: true,
        },
        { name: "\u200B", value: "\u200B" },

        {
          name: getSpellName(sim, 1),
          value: getSpellDamage(sim, 1) + " DPS",
          inline: true,
        },
        {
          name: "Count",
          value: getCount(sim, 1),
          inline: true,
        },
        { name: "\u200B", value: "\u200B" },
        {
          name: getSpellName(sim, 2),
          value: getSpellDamage(sim, 2) + " DPS",
          inline: true,
        },
        {
          name: "Count",
          value: getCount(sim, 2),
          inline: true,
        },
      ])
    await interaction.editReply("done")
    await interaction.editReply({ embeds: [embed] })
  }
})

client.login(process.env.token)
