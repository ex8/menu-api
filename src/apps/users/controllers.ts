import { Context } from 'koa'
import { compare } from 'bcryptjs'
import validator from 'validator'
import DaoFactory from '../../dao/DaoFactory'
import { IUser } from './interfaces'
import { generateToken } from '../../util/token'

export async function createUser(ctx: Context): Promise<void> {
  const { email, phone }: IUser = ctx.request.body
  if (!email) {
    return ctx.throw(400, { success: false, message: 'No email found' })
  }

  if (!phone) {
    return ctx.throw(400, { success: false, message: 'No phone found' })
  }

  if (!validator.isEmail(email)) {
    return ctx.throw(400, { success: false, message: 'Invalid email address' })
  }

  if (!validator.isMobilePhone(phone)) {
    return ctx.throw(400, { success: false, message: 'Invalid phone number' })
  }

  const dao = DaoFactory.getUserDao()

  const exists: IUser = await dao.findOne(ctx, { email })
  if (exists) {
    return ctx.throw(400, { success: false, message: 'Email already exists' })
  }

  // TODO: check if new user email exists in chef accounts...

  const user: IUser = await dao.create(ctx)
  if (!user) {
    return ctx.throw(400, { success: false, message: '' })
  }

  ctx.status = 200
  ctx.body = { success: true, user }
}

export async function updateUser(ctx: Context): Promise<void> {
  const user: IUser = await DaoFactory.getUserDao().update(ctx)
  if (!user) {
    return ctx.throw(400, { success: false, message: 'Error updating user' })
  }

  ctx.status = 200
  ctx.body = { success: true, user }
}

export async function checkUserEmail(ctx: Context): Promise<void> {
  const { email }: IUser = ctx.request.body
  if (!email) {
    return ctx.throw(400, { success: false, message: 'No email found' })
  }

  const user: IUser = await DaoFactory.getUserDao().findOne(ctx, { email })
  if (!user) {
    return ctx.throw(404, { success: false, message: 'Incorrect email - Please try again' })
  }

  ctx.status = 200
  ctx.body = { success: true }
}

export async function checkUserPassword(ctx: Context): Promise<void> {
  const { email, password }: IUser = ctx.request.body
  const user: IUser = await DaoFactory.getUserDao().findOne(ctx, { email })
  if (!user) {
    return ctx.throw(404, { success: false, message: 'User not found' })
  }

  const isMatch: boolean = await compare(password, user.password)
  if (isMatch) {
    const token: string = generateToken({ id: user.id })
    ctx.status = 200
    ctx.body = { success: true, token }
  } else {
    // TODO: send email to user about invalid password attempt
    return ctx.throw(404, { success: false, message: 'Incorrect password. Please try again' })
  }
}

export async function fetchUserDashboard(ctx: Context): Promise<void> {
  return ctx.throw(400, { success: false, message: 'Method not implemented yet' })
}

export async function fetchUserOrders(ctx: Context): Promise<void> {
  return ctx.throw(400, { success: false, message: 'Method not implemented yet' })
}

export async function fetchUserReceipts(ctx: Context): Promise<void> {
  return ctx.throw(400, { success: false, message: 'Method not implemented yet' })
}
