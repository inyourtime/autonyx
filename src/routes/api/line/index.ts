import fs from 'node:fs/promises'
import type { FastifyInstance } from 'fastify'
import type { WebhookRequestBody } from 'fastify-line'

export default async function (app: FastifyInstance) {
  app.post<{ Body: WebhookRequestBody }>(
    '/webhook',
    {
      config: {
        lineWebhook: true,
      },
    },
    async (request) => {
      if (request.body.events[0].type === 'message') {
        const { message } = request.body.events[0]
        if (message.type === 'image') {
          const content = await app.line.blobClient.getMessageContent(message.id)
          await fs.writeFile('image.jpg', content)

          await app.line.client.replyMessage({
            replyToken: request.body.events[0].replyToken,
            messages: [
              {
                type: 'text',
                text: 'ok',
              },
            ],
          })
        }
      }

      return 'ok'
    },
  )

  app.get('/health', async () => {
    return { status: 'ok' }
  })
}
