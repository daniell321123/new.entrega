import { randomUUID } from 'crypto'

export class Id {
  static new() {
    return randomUUID()
  }
}