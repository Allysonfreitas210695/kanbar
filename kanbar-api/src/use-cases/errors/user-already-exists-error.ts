import { AppError } from './kanbar-error.ts'

export class UserAlreadyExistsError extends AppError {
  constructor() {
    super('Usuário com esse email já existe.', 409)
  }
}
