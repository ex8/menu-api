import { Schema, model, Model } from 'mongoose'
import validator from 'validator'
import { IUser } from './interfaces'
import { encrypt } from '../../util/encrypt'

export const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Invalid e-mail address'],
  },
  phone: {
    type: String,
    required: true,
    validate: [validator.isMobilePhone, 'Invalid phone number'],
  },
  password: { type: String, required: true },
  isEmailVerified: { type: Boolean, default: false, required: true },
}, { timestamps: true })

userSchema.pre<IUser>('save', async function(next) {
  if (this.isModified('password')) {
    const encrypted: string = await encrypt(this.password)
    if (!encrypted) return next(new Error('Hashing password'))
    this.password = encrypted
  }
  next()
})

const User: Model<IUser> = model<IUser>('User', userSchema)

export { User }
