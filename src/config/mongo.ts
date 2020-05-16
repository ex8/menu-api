import './env'
import { Mongoose, connect } from 'mongoose'

const dbUrl: string = process.env.MONGODB_URL

export default async function mongo(): Promise<Mongoose> {
  return connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
}
