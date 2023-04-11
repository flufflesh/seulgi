import { wow } from "blizzard.js"
import { Origins } from "blizzard.js/dist/endpoints"

class BlizzardArmory {
  constructor(private key: string, private secret: string) {}
  async getCharacter(server: Origins, name: string, realm: string) {
    const wowClient = await wow.createInstance({
      key: this.key,
      secret: this.secret,
      locale: "en_US",
      origin: server,
    })
    const { data: characterEquipment } = await wowClient.characterEquipment({
      realm,
      name,
    })
    const { data: specs } = await wowClient.characterSpecializations({
      realm,
      name,
    })

    const activeSpec = specs.specializations.find(
      (spec: any) => spec.specialization.id === specs.active_specialization.id
    )
    return { characterEquipment, characterTalents: activeSpec }
  }
}

export default BlizzardArmory
