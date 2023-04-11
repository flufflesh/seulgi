import { exec } from "child_process"
import path from "path"
import { Logger } from "winston"
import crypto from "crypto"
import fs from "fs"
import WasabiService from "./Wasabi.service"

interface SimcArgs {
  characterName: string
  realm: string
  region: string
  additionalArgs?: string
}

export class SimcRunner {
  private parentDir: string = path.dirname(
    path.dirname(path.dirname(__dirname))
  )
  constructor(private logger: Logger, private wasabiService: WasabiService) {}

  arrayToObject(array: string[]) {
    const object: Record<string, string> = {}
    const cleanArray = array.filter(Boolean)
    for (let i = 0; i < cleanArray.length; i = i + 2) {
      object[array[i].replace(":", "")] = array[i + 1]
    }
    return object
  }

  regexAndTrimArray(array: string[]) {
    const regex =
      /([a-zA-Z]+ \([a-z]+\.[a-z]+\):)|([A-Z]+[a-z]*\s[A-Z][a-z]+:)|([A-Z][a-z]-+[A-Z][a-z]+:)|([A-Z][a-z]+:)/g

    return array
      .join("")
      .split(regex)
      .filter(Boolean)
      .map(text => text.replace(/\s{2,}/g, " ").trim())
  }

  parseDynamicBuffs(rotation: Record<string, string>) {
    const dynamicBuffRegex =
      /([a-z]+_[a-z]+_[a-z]+_[a-z]+_[a-z]+ :)|([a-z]+_[a-z]+_[a-z]+_[a-z]+ :)|([a-z]+_[a-z]+_[a-z]+ :)|([a-z]+_[a-z]+ :)|([a-z]+ :)/g
    const dynamicBuffValues = rotation["Dynamic Buffs"].split(dynamicBuffRegex)
    const dynamicBuffs = this.arrayToObject(
      dynamicBuffValues
        .filter(Boolean)
        .map(text => text.replace(/\s{2,}/g, " ").trim())
    )
    return {
      ...rotation,
      "Dynamic Buffs": dynamicBuffs,
    }
  }

  parseConstantBuffs(rotation: Record<string, any>) {
    return {
      ...rotation,
      "Constant Buffs": rotation["Constant Buffs"].split("/"),
    }
  }

  parseActions(rotation: Record<string, any>) {
    // find way to refactor this lol this is so ugly
    const parsedActions = rotation["Actions"].split(
      /(\b[a-z]+_[a-z]+_[a-z]+_[a-z]+_[a-z]+\b)|(\b[a-z]+_[a-z]+_[a-z]+_[a-z]+\b)|(\b[a-z]+_[a-z]+_[a-z]+\b)|(\b[a-z]+_[a-z]+\b)|(\b[a-z]+\b)/
    )
    return {
      ...rotation,
      Actions: this.arrayToObject(
        parsedActions.filter(Boolean).map((text: string) => text.trim())
      ),
    }
  }

  parseRotation(rotation: Record<string, any>) {
    let parsedRotation: Record<string, any> = this.parseConstantBuffs(rotation)
    parsedRotation = this.parseDynamicBuffs(parsedRotation)
    parsedRotation = this.parseActions(parsedRotation)
    return parsedRotation
  }

  parseSimcOutput(simcOutput: string) {
    const report = simcOutput.split("Generating reports...")[1]
    const [stats, ...rotation] = report.split("Priorities")
    const statsArray = stats.split("\n").filter(text => text !== "")
    const splitRotation = rotation
      .join("Priorities")
      .split("\n")
      .map(text => text.trim())

    splitRotation[0] = "Priorities " + splitRotation[0]
    const prettyRotation = this.regexAndTrimArray(splitRotation)

    const prettyRotationObject = this.parseRotation(
      this.arrayToObject(prettyRotation)
    )
    const prettyStats = this.regexAndTrimArray(statsArray)

    return {
      stats: this.arrayToObject(prettyStats),
      rotation: prettyRotationObject,
    }
  }

  async uploadFiles(reportId: string) {
    await new Promise((resolve, reject) => {
      try {
        fs.readFile(`reports/${reportId}.json`, (err, data) => {
          this.wasabiService.uploadObject(data, `${reportId}.json`)
          resolve("done")
        })
      } catch (err) {
        reject(err)
      }
    })
    fs.unlink(`reports/${reportId}.json`, err => {
      if (err) {
        this.logger.error(err)
      }
    })
    await new Promise((resolve, reject) => {
      try {
        fs.readFile(`reports/${reportId}.html`, (err, data) => {
          this.wasabiService.uploadObject(data, `${reportId}.html`)
          resolve("done")
        })
      } catch (err) {
        reject(err)
      }
    })

    fs.unlink(`reports/${reportId}.html`, err => {
      if (err) {
        this.logger.error(err)
      }
    })
  }

  async getObject(fileName: string): Promise<string | { err: string }> {
    try {
      const object = await this.wasabiService.readObject(`${fileName}`)
      return object as string
    } catch (err) {
      return {
        err: "error fetching file",
      }
    }
  }

  async simc({ characterName, region, realm, additionalArgs }: SimcArgs) {
    try {
      const SIMC_DIR = `${this.parentDir}/SimulationCraft/engine/simc`
      const reportId = crypto.randomBytes(20).toString("hex")
      const simcOutput: string = await new Promise((resolve, reject) => {
        exec(
          `${SIMC_DIR} armory=${region},${realm},${characterName} ${
            additionalArgs || ""
          } calculate_scale_factors=0 report_precision=2 html=reports/${reportId}.html json2=reports/${reportId}.json iterations=20000`,
          (err, stdout, stderr) => {
            if (err) {
              return reject(stderr)
            }
            return resolve(stdout)
          }
        )
      })

      await this.uploadFiles(reportId)

      return {
        simcOutput: this.parseSimcOutput(simcOutput),
        fileName: reportId,
      }
    } catch (err) {
      this.logger.error(err)
      return { err }
    }
  }
}
