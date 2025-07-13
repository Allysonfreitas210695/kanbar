import { AppError } from './kanbar-error.ts'

export class GameNotFoundError extends AppError {
  constructor() {
    super('Game não encontrado!', 404)
  }
}
