import mongoose from 'mongoose'
import { CNX_STR } from '../src/config/mongodb.config.js'

export const mochaHooks = {

  async beforeAll() {
    await mongoose.connect(CNX_STR)
  },

  async afterAll() {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  }

}
