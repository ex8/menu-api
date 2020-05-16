import { genSalt, hash } from 'bcryptjs'

const DEFAULT_SALT_NUMBER: number = 15

export async function encrypt(k: string): Promise<string> {
  const salt: string = await genSalt(DEFAULT_SALT_NUMBER)
  if (!salt) return

  const hashed: string = await hash(k, salt)
  if (!hashed) return

  return hashed
}
