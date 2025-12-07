import fastifyLine, { messagingApi } from 'fastify-line'
import fp from 'fastify-plugin'

declare module 'fastify' {
  export interface FastifyInstance {
    blobClient: messagingApi.MessagingApiBlobClient
  }
}

export default fp(async (app) => {
  /**
   * A Fastify plugin for LINE Messaging API integration.
   *
   * @see {@link https://github.com/inyourtime/fastify-line}
   */
  app.register(fastifyLine, {
    channelSecret: app.config.LINE_CHANNEL_SECRET,
    channelAccessToken: app.config.LINE_CHANNEL_ACCESS_TOKEN,
    skipVerify: false,
  })

  const blobClient = new messagingApi.MessagingApiBlobClient({
    channelAccessToken: app.config.LINE_CHANNEL_ACCESS_TOKEN,
  })

  app.decorate('blobClient', blobClient)
})
