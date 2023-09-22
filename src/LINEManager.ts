import * as line from '@line/bot-sdk'

let client: line.Client
let initFlg = false

class LINEManager {
  /**
   * LINE返信
   * @param {String} token 返信トークン
   * @param {String} message 送信内容
   */
  async replyMessage(token: string, message: line.Message | line.Message[]) {
    if (!initFlg) await initLINE()
    return await client.replyMessage(token, message)
  }
}

/**
 * LINE初期化
 */
async function initLINE() {
  const config = {
    channelAccessToken: process.env.ACCESS_TOKEN as string,
    channelSecret: process.env.CHANNEL_SECRET as string,
  }
  client = new line.Client(config)
  initFlg = true
}

export default LINEManager
