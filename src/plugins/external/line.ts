import fastifyLine from 'fastify-line'
import fp from 'fastify-plugin'

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
})
