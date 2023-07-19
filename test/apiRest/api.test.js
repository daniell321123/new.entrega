import assert from 'node:assert'

import supertest from 'supertest'
import { usuariosDaoMongoose } from '../../src/daos/usuarios.dao.mongoose.js'

//-----------------------------------------------------------------------------------------------------------------

const httpClient = supertest('http://localhost:8080')

describe.only('api rest', () => {

  describe('/api/usuarios', () => {

    beforeEach(async () => {
      await usuariosDaoMongoose.deleteMany({})
    })

    afterEach(async () => {
      await usuariosDaoMongoose.deleteMany({})
    })

    describe('POST', () => {
      describe('cuando envio peticion con datos correctos', () => {
        it('crea usuario, devuelve 201', async () => {

          const datosUsuario = {
            nombre: 'pepe',
            apellido: 'loco',
            email: 'pepe@loco',
            password: 'abc123',
          }

          const resultadoEsperado = {
            nombreCompleto: `${datosUsuario.nombre} ${datosUsuario.apellido}`,
            email: datosUsuario.email
          }

          const response = await httpClient.post('/api/usuarios').send(datosUsuario)

          assert.strictEqual(response.statusCode, 201)
          assert.deepStrictEqual(response.body, resultadoEsperado)
        })
      })
    })
  })

  describe('GET', () => {
    describe('cuando envio peticion y hay usuarios', () => {
      it('devuelve la coleccion de usuarios y codigo 200', async () => {

        const usuarioEnLaDB = {
          id: 'uniddementira',
          nombre: 'pepe',
          apellido: 'loco',
          email: 'pepe@loco',
          password: 'abc123',
          rol: 'user',
          mascotas: []
        }
        await usuariosDaoMongoose.create(usuarioEnLaDB)

        const response = await httpClient.get('/api/usuarios')

        assert.strictEqual(response.statusCode, 200)
        assert.deepStrictEqual(response.body, [usuarioEnLaDB])

      })
    })
  })
})
