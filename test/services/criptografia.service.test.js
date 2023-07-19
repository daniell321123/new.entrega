import assert from 'node:assert'

import { criptografiador } from '../../src/services/criptografia.service.js'

describe('servicio de criptografia', () => {
  it('encripta contraseñas correctamente', () => {
    const password = '123abc'
    const passwordHasheado = criptografiador.hashear(password)
    assert.notStrictEqual(passwordHasheado, password) // realiza !== internamente
  })
  it('compara contraseñas hasheadas correctamente', () => {
    const password = '123abc'
    const passwordHasheado = criptografiador.hashear(password)
    assert.ok(criptografiador.comparar(password, passwordHasheado))
  })
})

