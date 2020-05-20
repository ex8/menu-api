import mongoose from 'mongoose'

export async function removeAllCollections(): Promise<void> {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    await collection.deleteMany({})
  }
}

export async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    await collection.drop()
  }
}

export async function setupTestDb(name: string) {
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1:27017/${name}`
    await mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  })

  afterEach(async () => {
    await removeAllCollections()
  })

  afterAll(async () => {
    await dropAllCollections()
    await mongoose.connection.close()
  })
}
