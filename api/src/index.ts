import "make-promises-safe"
import "dotenv/config"
import express from "express"
import bodyParser from "body-parser"
import sim from "./actions/sim"
import armory from "./actions/armory"

const PORT = process.env.port || 8084
const app = express()

app.use(bodyParser())

app.use("/sim", sim)
app.use("/armory", armory)

const server = app.listen(PORT, () => {
  console.log("started server")
})

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("closing server")
  })
})

process.on("SIGINT", () => {
  server.close(() => {
    console.log("closing server")
  })
})
