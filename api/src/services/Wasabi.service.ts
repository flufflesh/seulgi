import AWS from "aws-sdk"
import { Logger } from "winston"

class WasabiService {
  private s3
  constructor(accessKey: string, secretKey: string, private logger: Logger) {
    const credentials = new AWS.SharedIniFileCredentials({ profile: "wasabi" })
    AWS.config.credentials = credentials
    AWS.config.credentials.accessKeyId = accessKey
    AWS.config.credentials.secretAccessKey = secretKey
    const endpoint = new AWS.Endpoint("s3.wasabisys.com")
    this.s3 = new AWS.S3({ endpoint })
  }

  uploadObject(object: any, fileName: string) {
    this.s3.putObject(
      {
        Bucket: "lily-simming-tool",
        Key: fileName,
        Body: object,
      },
      err => {
        if (err) {
          this.logger.error(err)
        } else {
          return
        }
      }
    )
  }
  async readObject(fileName: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.s3.getObject(
          {
            Bucket: "lily-simming-tool",
            Key: fileName,
          },
          (err, readData) => {
            if (err) {
              return reject(err)
            }
            resolve(readData.Body?.toString("utf-8"))
          }
        )
      }, 3000)
    })
  }
}

export default WasabiService
