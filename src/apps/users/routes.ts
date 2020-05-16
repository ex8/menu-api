import { DefaultState, Context } from 'koa'
import Router from '@koa/router'
import { createUser, loginUser, fetchUserDashboard, fetchUserOrders, fetchUserReceipts, updateUser } from './controllers'
import { isAuthenticated } from '../../util/auth'

const userRouter = new Router<DefaultState, Context>({ prefix: '/users' })

userRouter
  .post('/', createUser)
  .put('/', isAuthenticated('user'), updateUser)
  .get('/account', isAuthenticated('user'), fetchUserDashboard)
  .get('/account/orders', isAuthenticated('user'), fetchUserOrders)
  .get('/account/receipts', isAuthenticated('user'), fetchUserReceipts)
  .post('/account/login', loginUser)

export { userRouter }
