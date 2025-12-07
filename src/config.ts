import envSchema from 'env-schema'
import fp from 'fastify-plugin'
import { type Static, Type } from 'typebox'

declare module 'fastify' {
  export interface FastifyInstance {
    config: Static<typeof schema>
  }
}

const schema = Type.Object({
  PORT: Type.Number({ default: 3000 }),
  HOST: Type.String({ default: '0.0.0.0' }),
  LINE_CHANNEL_SECRET: Type.String(),
  LINE_CHANNEL_ACCESS_TOKEN: Type.String(),
  LINE_ENDPOINT: Type.String({ default: 'https://api.line.me' }),
  PRETTY_LOG_ENABLED: Type.Boolean({ default: false }),
})

export default fp(
  async (app) => {
    const config = envSchema<Static<typeof schema>>({ schema })

    app.decorate('config', config)
  },
  {
    name: '@autonyx/config',
  },
)
