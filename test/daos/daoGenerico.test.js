import assert from 'node:assert'

import mongoose from 'mongoose'

import { DaoMongoose } from '../../src/daos/DaoMongoose.js'

// esquema de pruebas -------------------------------------------------------------------------------------------

const testSchema = new mongoose.Schema({
  property1: { type: String, required: true },
  property2: Number
})
const testModel = mongoose.model('datosDePruebas', testSchema)


// datos de prueba ----------------------------------------------------------------------------------------------

const testData = {
  property1: 'un nombre',
  property2: 1
}

const testDataIncompleto = {
  property2: 1
}

//-----------------------------------------------------------------------------------------------------------------

describe('dao mongoose (genérico)', () => {

  beforeEach(async () => {
    await mongoose.connection.collection('datosDePruebas').deleteMany({})
  })

  describe('create', () => {
    describe('cuando llamo al create con un objeto con el esquema correspondiente', () => {
      it('lo guarda y devuelve el mismo objeto sin agregarle ningun campo ni métodos', async () => {
        const dao = new DaoMongoose(testModel)
        const pojo = await dao.create(testData)
        assert.ok(!pojo._id, 'no debería tener _id')
        assert.ok(pojo.property1, 'debería tener property1')
        assert.ok(pojo.property2, 'debería tener property2')
      })
    })

    describe('cuando llamo al create con un objeto con un esquema distinto al esperado', () => {
      it('lanza un error', async () => {
        const dao = new DaoMongoose(testModel)
        await assert.rejects(
          dao.create(testDataIncompleto),
          mongoose.Error.ValidationError
        )
      })
    })
  })

  describe('readMany', () => {
    describe('cuando llamo al readMany con un criterio vacío', () => {
      it('devuelve todos los objetos de la colección sin _id ni métodos', () => {
        // prueba!
      })
    })
  })
})
