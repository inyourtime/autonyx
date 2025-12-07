import { join } from 'node:path'
import fastifyAutoload from '@fastify/autoload'
import { type FastifyServerOptions, fastify } from 'fastify'
import configEnv from './config.ts'

export default async function buildServer(opts?: FastifyServerOptions) {
  const app = fastify(opts)

  await app.register(configEnv)

  app.register(fastifyAutoload, {
    dir: join(import.meta.dirname, 'plugins/external'),
    forceESM: true,
  })

  app.register(fastifyAutoload, {
    dir: join(import.meta.dirname, 'routes'),
    forceESM: true,
  })

  return app
}
