import { Context, Middleware } from 'koa'

export type HttpMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface IRoute {
  path: string
  method: HttpMethodType
  middlewares: Middleware[]
  handler: (ctx: Context) => Promise<void>
}
