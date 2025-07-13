import { AppError } from './kanbar-error.ts'

export class InvalidCredentialsError extends AppError {
  constructor() {
    super('Credenciais inválidas.', 401)
  }
}
