import { WebhookEvent, TextMessage, MessageAPIResponseBase } from '@line/bot-sdk'
import LINEManager from '@/LINEManager'
import OpenAIManager from '@/OpenAIManager'
const lineManager = new LINEManager()
const openaiManager = new OpenAIManager()

class LINEService {
  /**
   * オウム返し用のWebhook Event Handler
   * @param event webhook event
   * @returns MessageAPIResponseBase
   */
  async handleEvent(event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return
    }
    const { replyToken } = event
    const { text } = event.message

    const echo: TextMessage = {
      type: 'text',
      text,
    }
    return await lineManager.replyMessage(replyToken, echo)
  }

  /**
   * OpenAIのチャットを使ったWebhook Event Handler
   * @param event
   * @returns
   */
  async openaiChatEvent(event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return
    }
    const { replyToken } = event
    const { text } = event.message

    const message = await openaiManager.openAIChat('gpt-3.5-turbo', text)

    const echo: TextMessage = {
      type: 'text',
      text: message,
    }
    return await lineManager.replyMessage(replyToken, echo)
  }

  /**
   * OpenAIの一発回答を使ったWebhook Event Handler
   * @param event
   * @returns
   */
  async openaiInstructEvent(event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return
    }
    const { replyToken } = event
    const { text } = event.message

    const message = await openaiManager.openAIInstruct('gpt-3.5-turbo-instruct', text, 256)

    const echo: TextMessage = {
      type: 'text',
      text: message,
    }
    return await lineManager.replyMessage(replyToken, echo)
  }
}

export default LINEService
