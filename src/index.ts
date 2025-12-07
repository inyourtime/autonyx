import './load-env.ts'
import type { FastifyServerOptions } from 'fastify'
import buildServer from './app.ts'

const options = {
  logger:
    process.env.NODE_ENV === 'development'
      ? {
          transport: {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          },
        }
      : false,
} satisfies FastifyServerOptions

const server = await buildServer(options)

try {
  await server.listen({
    host: server.config.HOST,
    port: server.config.PORT,
    listenTextResolver: (address) => `@autonyx listening on ${address}`,
  })
} catch (error) {
  server.log.error(error)
  process.exit(1)
}
