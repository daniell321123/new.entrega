import mongoose from 'mongoose'

// funciones auxiliares para interactuar directamente con la base de datos ----------------------------------------
export async function insertDirectlyIntoMongoDb(documentoParaGuardar, coleccion) {
  await mongoose.connection.collection(coleccion).insertOne(documentoParaGuardar)
  delete documentoParaGuardar._id
}
export function fetchDirectlyFromMongoDb(criterio, coleccion) {
  return mongoose.connection.collection(coleccion).findOne(criterio, { projection: { _id: 0 } })
}
