import { WebhookEvent } from '@line/bot-sdk'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import LINEService from '@/service/LINEService'
const lineService = new LINEService()

const router = new Hono()

// Or you can use "function"
router.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    exposeHeaders: ['Content-Type', 'X-Line-Signature'],
  })
)

/**
 * LINE Webhook
 */
router.post('/bot', async (c) => {
  const data = await c.req.json()
  const events: WebhookEvent[] = (data as any).events
  await Promise.all(events.map(lineService.handleEvent))
    .then(() => {
      return c.json({ message: 'ok' })
    })
    .catch((err) => {
      console.error(err.message)
      return c.json({ message: 'ng' })
    })
  return c.json({ message: 'ok' })
})

router.use('*', async (c, next) => {
  await next()
  return c.status(500)
})

export default router
