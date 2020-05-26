
import { Middleware } from 'koa'
import compose from 'koa-compose'
import logger from 'koa-pino-logger'
import helmet from 'koa-helmet'
import cors from '@koa/cors'
import bodyParser from 'koa-body'
import error from './error'
import auth from './auth'

export default function middlewares(): Middleware {
  return compose([
    logger({ prettyPrint: true }),
    helmet(),
    cors(),
    error(),
    bodyParser(),
    auth(),
  ])
}
