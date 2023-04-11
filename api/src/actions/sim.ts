import { logger } from "../logger"
import { SimcRunner } from "../services/SimcRunner.service"
import { Router } from "express"
import WasabiService from "../services/Wasabi.service"
import "dotenv/config"

export const wasabiService = new WasabiService(
  process.env?.S3_ACCESS_KEY || "",
  process.env.S3_SECRET_KEY || "",
  logger
)
const simcRunner = new SimcRunner(logger, wasabiService)

const router = Router()

router.post("/", async (req, res) => {
  if (!req.body?.character) {
    return res.status(500).send("No character")
  }
  const simulation = await simcRunner.simc(req.body.character)
  return res.redirect(`/sim/json-reports/${simulation.fileName}`)
})

router.get("/json-reports/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(500).send("no id")
  }

  const simJson = await simcRunner.getObject(`${req.params.id}.json`)

  if (typeof simJson !== "string") {
    return res
      .status(500)
      .send("Error fetching report, does the character exist?")
  }

  res.json({ sim: JSON.parse(simJson), simId: req.params.id })
})

router.get("/reports/:id", async (req, res) => {
  if (!req.params.id) {
    return res.send("no id")
  }

  const simHTML = await simcRunner.getObject(`${req.params.id}.html`)

  if (typeof simHTML !== "string") {
    return res.status(500).send("Error fetching HTML")
  }

  return res.send(simHTML)
})

export default router
