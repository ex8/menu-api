import { setupTestDb } from '../../../util/test-db'
import { User } from '../models'
import { IUser } from '../interfaces'
import { Error } from 'mongoose'
import * as encrypt from '../../../util/encrypt'

describe('User Models', () => {
  setupTestDb('jest-users')

  test('should create basic User', async () => {
    const user: IUser = await User.create({
      firstName: 'some-first-name',
      lastName: 'some-last-name',
      email: 'some@email.com',
      phone: '(405) 390-6591',
      password: 'some-password',
    })

    expect(user).toBeDefined()
    expect(user.id).toBeDefined()
    expect(user.firstName).toBe('some-first-name')
    expect(user.lastName).toBe('some-last-name')
    expect(user.createdAt).toBeDefined()
    expect(user.updatedAt).toBeDefined()
    expect(user.password).not.toBe('some-password')
    expect(user.isEmailVerified).toBe(false)
  })

  test('should encrypt user password on pre-save', async () => {
    const mockEncrypt = jest.spyOn(encrypt, 'encrypt')

    const user: IUser = await User.create({
      firstName: 'some-first-name',
      lastName: 'some-last-name',
      email: 'some@email.com',
      phone: '(405) 390-6591',
      password: 'some-password',
    })

    expect(mockEncrypt).toHaveBeenCalledTimes(1)
    expect(mockEncrypt).toHaveBeenCalledWith('some-password')
    expect(user.password).not.toBe('some-password')
  })

  test('should fail to create User with invalid e-mail', async () => {
    try {
      await User.create({
        firstName: 'some-first-name',
        lastName: 'some-last-name',
        email: 'email',
        phone: '(405) 390-6591',
        password: 'some-password',
      })
    } catch (err) {
      expect(err).toBeInstanceOf(Error.ValidationError)
    }
  })

  test('should fail to create User with invalid phone number', async () => {
    try {
      await User.create({
        firstName: 'some-first-name',
        lastName: 'some-last-name',
        email: 'some@email.com',
        phone: '1111111111',
        password: 'some-password',
      })
    } catch (err) {
      expect(err).toBeInstanceOf(Error.ValidationError)
    }
  })
})
