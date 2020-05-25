import { Context } from 'koa'
import { createMockContext } from '@shopify/jest-koa-mocks'
import { User } from '../models'
import { IUser } from '../interfaces'
import { UserDao } from '../dao'

describe('User Dao', () => {
  const sample: IUser[] = [new User(), new User()]

  test('should find Users', async () => {
    const ctx: Context = createMockContext()
    const mockFind = jest.spyOn(User, 'find').mockResolvedValueOnce(sample)

    const users: IUser[] = await new UserDao().find(ctx)

    expect(mockFind).toHaveBeenCalledTimes(1)
    expect(users.length).toBe(2)
    expect(users).toEqual(sample)
  })

  test('should find one User', async () => {
    const ctx: Context = createMockContext()
    const mockFindOne = jest.spyOn(User, 'findOne').mockResolvedValueOnce(sample[0])

    const user: IUser = await new UserDao().findOne(ctx)

    expect(mockFindOne).toHaveBeenCalledTimes(1)
    expect(user).toEqual(sample[0])
  })

  test('should create User', async () => {
    const ctx: Context = createMockContext({
      requestBody: {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'some@mail.com',
        phone: '(405) 390-6591',
        password: 'password',
      }
    })
    const mockCreate = jest.spyOn(User, 'create').mockResolvedValueOnce(sample[0])

    const user: IUser = await new UserDao().create(ctx)

    expect(mockCreate).toHaveBeenCalledTimes(1)
    expect(user).toEqual(sample[0])
  })

  test('should update User', async () => {
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
    const mockUpdate = jest.spyOn(User, 'findByIdAndUpdate').mockResolvedValueOnce(sample[0])

    const user: IUser = await new UserDao().update(ctx)

    expect(mockUpdate).toHaveBeenCalledTimes(1)
    expect(mockUpdate).toHaveBeenCalledWith('some-id', {
      firstName: 'firstName',
      lastName: 'lastName',
      phone: '(405) 390-6591',
    }, { new: true })
    expect(user).toHaveProperty('_id')
  })
})
