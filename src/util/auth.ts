import { Middleware } from 'koa'
import { authenticate } from 'koa-passport'
import { roles } from '../middlewares/passport'

export function isAuthenticated(...types: roles[]): Middleware {
  return authenticate(types, { session: false })
}
