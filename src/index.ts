import { Hono } from 'hono'
import line from '@/routes/line'
const app = new Hono().basePath('/api')

app.post('/test', (c) => c.json({ message: 'Hello Hono!' }))

app.route('/line', line)

export default {
  port: 9000,
  fetch: app.fetch,
}
