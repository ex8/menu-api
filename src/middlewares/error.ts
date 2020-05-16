import { Context, Next } from 'koa'

export interface IError {
  statusCode: number
  success: boolean
  message: string
}

export default () => async (ctx: Context, next: Next) => {
  try {
    await next()
  }
  catch (err) {
    const { statusCode, message } = err as IError
    const success = err.success || false
    ctx.type = 'json'
    ctx.status = statusCode || 500
    ctx.body = { success, message }
  }
}
