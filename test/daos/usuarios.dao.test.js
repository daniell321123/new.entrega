import assert from 'node:assert'

import mongoose from 'mongoose'

import { Id } from '../../src/models/Id.js'
import { usuariosDaoMongoose } from '../../src/daos/usuarios.dao.mongoose.js'

import { fetchDirectlyFromMongoDb, insertDirectlyIntoMongoDb } from './mongooseUtils.js'

// datos de prueba ----------------------------------------------------------------------------------------------

const ejemploUsuario = {
  id: Id.new(),
  nombre: 'un_nombre',
  apellido: 'un_apellido',
  email: 'un_email',
  password: 'un_password',
  rol: 'user',
  mascotas: []
}

//-----------------------------------------------------------------------------------------------------------------

describe('servicio de adopcion de mascotas', () => {

  describe('usuarios', () => {

    beforeEach(async () => {
      // console.log('borrando usuarios...') // descomentar para ver cuando sucede!
      await mongoose.connection.collection('usuarios').deleteMany({})
    })

    describe('daos', async () => {

      describe('al crear un nuevo usuario', async () => {
        it('lo almacena', async () => {
          await usuariosDaoMongoose.create(ejemploUsuario)
          const registro = await fetchDirectlyFromMongoDb(ejemploUsuario, 'usuarios')
          assert.deepStrictEqual(registro, ejemploUsuario) // compara si dos objetos tienen los mismos campos y valores internos
        })
      })

      describe('al buscar un usuario por su id', async () => {
        it('si existe lo encuentra y lo devuelve', async () => {
          await insertDirectlyIntoMongoDb(ejemploUsuario, 'usuarios')
          const registro = await usuariosDaoMongoose.readOne({ id: ejemploUsuario.id })
          assert.deepStrictEqual(registro, ejemploUsuario)
        })

        it('si no existe lanza un error', async () => {
          await assert.rejects(usuariosDaoMongoose.readOne({ id: 'xxxxxxxxxxxx' }))
        })
      })
    })
  })
})
