import { Middleware } from 'koa'
import { authenticate } from 'koa-passport'
import { roles } from '../middlewares/auth'

export function isAuthenticated(...types: roles[]): Middleware {
  return authenticate(types, { session: false })
}
