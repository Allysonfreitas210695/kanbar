import { AppError } from './kanbar-error.ts'

export class DrinkNotFoundError extends AppError {
  constructor() {
    super('Drink não encontrado!', 404)
  }
}
