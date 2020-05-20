import { Context } from 'koa'
import { createMockContext } from '@shopify/jest-koa-mocks'
import { User } from '../models'
import { IUser } from '../interfaces'
import { UserDao } from '../dao'

describe('User DAO', () => {
  test('should find and fetch users', async () => {
    const ctx: Context = createMockContext()
    const mockFind = jest.spyOn(User, 'find').mockResolvedValueOnce([])

    const users: IUser[] = await new UserDao().find(ctx)

    expect(mockFind).toHaveBeenCalledTimes(1)
    expect(users).toEqual([])
  })

  test('should find and fetch one user', async () => {
    const ctx: Context = createMockContext()
    const mockFindOne = jest.spyOn(User, 'findOne').mockResolvedValueOnce(null)

    const user: IUser = await new UserDao().findOne(ctx)

    expect(mockFindOne).toHaveBeenCalledTimes(1)
    expect(user).toEqual(null)
  })

  test('should create user', async () => {
    const ctx: Context = createMockContext({
      requestBody: {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'some@mail.com',
        phone: '(405) 390-6591',
        password: 'password',
      }
    })
    const mockCreate = jest.spyOn(User, 'create').mockResolvedValueOnce(null)

    const user: IUser = await new UserDao().create(ctx)

    expect(mockCreate).toHaveBeenCalledTimes(1)
    expect(user).toEqual(null)
  })

  test('should find and update user', async () => {
    const ctx: Context = createMockContext({
      requestBody: {
        firstName: 'firstName',
        lastName: 'lastName',
        phone: '(405) 390-6591',
      },
      state: {
        user: {
          id: 'some-id'
        }
      }
    })
    const mockUpdate = jest.spyOn(User, 'findByIdAndUpdate').mockResolvedValueOnce(null)

    const user: IUser = await new UserDao().update(ctx)

    expect(mockUpdate).toHaveBeenCalledTimes(1)
    expect(mockUpdate).toHaveBeenCalledWith('some-id', {
      firstName: 'firstName',
      lastName: 'lastName',
      phone: '(405) 390-6591',
    }, { new: true })
    expect(user).toEqual(null)
  })
})
