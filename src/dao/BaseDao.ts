import { Context } from 'koa'
import { FilterQuery } from 'mongoose'

export abstract class BaseDao<T> {
  abstract async find(ctx: Context, query?: FilterQuery<T>): Promise<T[]>
  abstract async findOne(ctx: Context, query?: FilterQuery<T>): Promise<T>
  abstract async create(ctx: Context): Promise<T>
  abstract async update(ctx: Context): Promise<T>
}
