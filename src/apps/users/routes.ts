import { DefaultState, Context } from 'koa'
import Router from '@koa/router'
import {
  createUser,
  checkUserEmail,
  checkUserPassword,
  fetchUserDashboard,
  fetchUserOrders,
  fetchUserReceipts,
  updateUser,
} from './controllers'
import { isAuthenticated } from '../../util/auth'

const userRouter = new Router<DefaultState, Context>({ prefix: '/users' })

userRouter
  .post('/', createUser)
  .put('/', isAuthenticated('user'), updateUser)
  .get('/account', isAuthenticated('user'), fetchUserDashboard)
  .get('/account/orders', isAuthenticated('user'), fetchUserOrders)
  .get('/account/receipts', isAuthenticated('user'), fetchUserReceipts)
  .post('/account/check-email', checkUserEmail)
  .post('/account/check-password', checkUserPassword)

export { userRouter }
