import app from './app'

const port = process.env.API_PORT

async function run() {
  // try {
  //   await mongo()
  // } catch (error) {
  //   throw new Error(`MongoDB connection unsuccessful: ${error}`)
  // }
  app.listen(port, () => console.log(`Menu API running on ${port}...`))
}

run()