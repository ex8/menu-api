import { Middleware } from 'koa'
import compose from 'koa-compose'
import Router from '@koa/router'
import { userRouter } from '../apps/users'

const routerDefinitions: Router[] = [
  userRouter,
]

export default function routes(): Middleware {
  const api = new Router({ prefix: '/api' })

  for (const router of routerDefinitions) {
    api.use(router.routes())
    api.use(router.allowedMethods())
  }

  return compose([api.routes(), api.allowedMethods()])
}
