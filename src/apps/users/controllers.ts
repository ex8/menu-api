import { Context } from 'koa'
import { DaoFactory } from '../../dao/DaoFactory'
import { IUser } from './interfaces'

export async function createUser(ctx: Context): Promise<void> {
  const { email } = ctx.request.body as IUser
  const dao = DaoFactory.getUserDao()

  const exists: IUser = await dao.findOne(ctx, { email })
  if (exists) {
    return ctx.throw(400, { success: false, message: 'Email already exists.' })
  }

  // TODO: check if new user email exists in chef accounts...
  // here...

  const user: IUser = await dao.create(ctx)

  ctx.status = 200
  ctx.body = { success: true, user }
}

export async function updateUser(ctx: Context): Promise<void> {
  const user: IUser = await DaoFactory.getUserDao().update(ctx)
  if (!user) {
    return ctx.throw(400, { success: false, message: 'Error updating user.' })
  }
  ctx.status = 200
  ctx.body = { success: true, user }
}

export async function loginUser(ctx: Context): Promise<void> {
  return ctx.throw(400, { success: false, message: 'Method not implemented yet.' })
}

export async function fetchUserDashboard(ctx: Context): Promise<void> {
  return ctx.throw(400, { success: false, message: 'Method not implemented yet.' })
}

export async function fetchUserOrders(ctx: Context): Promise<void> {
  return ctx.throw(400, { success: false, message: 'Method not implemented yet.' })

}

export async function fetchUserReceipts(ctx: Context): Promise<void> {
  return ctx.throw(400, { success: false, message: 'Method not implemented yet.' })
}
