import type { FastifyInstance } from 'fastify'

export default async function (app: FastifyInstance) {
  app.get('/', async () => {
    return { hello: 'world' }
  })

  app.get('/health', async () => {
    return { status: 'ok' }
  })
}
