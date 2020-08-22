import { IRoute } from '@menu/app-config'
import { Context } from 'koa'

export const CreateUser: IRoute = {
  path: '/user',
  method: 'POST',
  middlewares: [],
  handler: async (ctx: Context): Promise<void> => {
    ctx.status = 200
    ctx.body = { s: 's' }
  }
}
