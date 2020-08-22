import Koa, { Middleware } from 'koa'

export class App {
  private readonly app: Koa

  constructor(private readonly port: number) {
    this.app = new Koa()
  }

  middlewares(middlewares: Middleware) {
    this.app.use(middlewares)
  }
}
