import { OpenAI } from 'openai'

let initFlg = false
let openai: OpenAI

class OpenAIManager {
  /**
   * OpenAI返信
   * @param {String} model モデル名
   * @param {String} message ユーザー発言
   */
  async openAIChat(model: string, message: string) {
    if (!initFlg) await initOpenAI()
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'user',
        content: message,
      },
    ]
    const resp = await openai.chat.completions.create({
      model,
      messages,
    })
    return resp.choices[0].message.content as string
  }

  /**
   * OpenAI Instruct返信
   * @param {String} model モデル名
   * @param {String} message ユーザー発言
   * @param {Number} maxTokens 最大トークン数
   * @returns ChatGPT返信結果
   */
  async openAIInstruct(model: string, message: string, maxTokens: number = 256) {
    if (!initFlg) await initOpenAI()
    const resp = await openai.completions.create({
      model,
      prompt: message,
      max_tokens: maxTokens,
    })
    return resp.choices[0].text.trim() as string
  }
}

/**
 * OpenAI初期化
 */
async function initOpenAI() {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string,
  })
  initFlg = true
}
export default OpenAIManager
