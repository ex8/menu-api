import { Context } from 'koa'
import { FilterQuery } from 'mongoose'
import { IUser } from './interfaces'
import { BaseDao } from '../../dao/BaseDao'
import { User } from './models'

export class UserDao extends BaseDao<IUser> {
  public async find(ctx: Context, query?: FilterQuery<IUser>): Promise<IUser[]> {
    return User.find(query)
  }

  public async findOne(ctx: Context, query?: FilterQuery<IUser>): Promise<IUser> {
    return User.findOne(query)
  }

  public async create(ctx: Context): Promise<IUser> {
    const { firstName, lastName, email, phone, password }: IUser = ctx.request.body
    return User.create({ firstName, lastName, email, phone, password })
  }

  public async update(ctx: Context): Promise<IUser> {
    const { id } = ctx.state.user
    const { firstName, lastName, phone }: IUser = ctx.request.body
    return User.findByIdAndUpdate(id, { firstName, lastName, phone }, { new: true })
  }
}
