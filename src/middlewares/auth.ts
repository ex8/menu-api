import '../config/env'
import { Middleware } from 'koa'
import { use, initialize } from 'koa-passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { IUser, User } from '../apps/users'

export const secret: string = process.env.JWT_KEY
export type roles = 'user' | 'chef' | 'admin'

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
}

use('user', new Strategy(opts, async ({ id }, done) => {
  const user: IUser = await User.findById(id)
  if (user) {
    return done(null, user)
  }
  done(null, false)
}))

export default (): Middleware => {
  return initialize()
}
