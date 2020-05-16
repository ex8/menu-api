import Koa from 'koa'
import middlewares from '../middlewares'
import routes from '../routes'

const app = new Koa()

app.use(middlewares())
app.use(routes())

export default app
