import { Logger } from "winston"
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3"

class WasabiService {
  private s3
  constructor(accessKey: string, secretKey: string, private logger: Logger) {
    this.s3 = new S3Client({
      endpoint: "https://s3.eu-central-003.backblazeb2.com",
      region: "eu-central-003",
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    })
  }

  async uploadObject(object: any, fileName: string) {
    const command = new PutObjectCommand({
      Bucket: "",
      Key: fileName,
      Body: object,
    })
    await this.s3.send(command)
  }
  async readObject(fileName: string) {
    const data = await this.s3.send(
      new GetObjectCommand({ Bucket: "", Key: fileName })
    )

    return data.Body?.transformToString()
  }
}

export default WasabiService
