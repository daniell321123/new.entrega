import assert from 'node:assert'

import mongoose from 'mongoose'

import { Id } from '../../src/models/Id.js'
import { mascotasDaoMongoose } from '../../src/daos/mascotas.dao.mongoose.js'

import { fetchDirectlyFromMongoDb, insertDirectlyIntoMongoDb } from './mongooseUtils.js'

// datos de prueba ----------------------------------------------------------------------------------------------

const ejemploMascota = {
  id: Id.new(),
  nombre: 'un_nombre',
  especie: 'un_especie',
  fechaNacimiento: new Date(),
  foto: 'una_foto'
}

//-----------------------------------------------------------------------------------------------------------------

describe('servicio de adopcion de mascotas', () => {
  describe('mascotas', () => {

    beforeEach(async () => {
      // console.log('borrando mascotas...') // descomentar para ver cuando sucede!
      await mongoose.connection.collection('mascotas').deleteMany({})
    })

    describe('daos', async () => {
      describe('al crear una nueva mascota', async () => {
        it('la almacena', async () => {

          await mascotasDaoMongoose.create(ejemploMascota)

          const registro = await fetchDirectlyFromMongoDb({ id: ejemploMascota.id }, 'mascotas')
          assert.deepStrictEqual(registro, ejemploMascota) // compara si dos objetos tienen los mismos campos y valores internos
        })
      })

      describe('al buscar una mascota por su id', async () => {
        it('si existe la encuentra y la devuelve', async () => {

          await insertDirectlyIntoMongoDb(ejemploMascota, 'mascotas')

          const registro = await mascotasDaoMongoose.readOne({ id: ejemploMascota.id })
          assert.deepStrictEqual(registro, ejemploMascota) // compara si dos objetos tienen los mismos campos y valores internos
        })

        it('si no existe lanza un error', async () => {
          await assert.rejects(mascotasDaoMongoose.readOne({ id: 'xxxxxxxxxxxx' }))
        })
      })
    })
  })
})
