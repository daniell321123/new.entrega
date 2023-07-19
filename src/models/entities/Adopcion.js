import { Id } from '../Id.js'

export class Adopcion {
  constructor({ id = Id.new(), idDuenio, idMascota }) {
    this.id = id
    this.idDuenio = idDuenio
    this.idMascota = idMascota
  }
}
