import type { NewUser, User } from '../db/schema/users.ts'
import type { UsersRepository } from '../repositories/users-repositories.ts'
import { hashPassword } from '../utils/hash-password.ts'

import { UserAlreadyExistsError } from './errors/user-already-exists-error.ts'

interface CreateUserInput {
  name: string
  email: string
  password: string
}

interface CreateUserOutput {
  user: User
}

export class UsersRegisterUseCase {
  private usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({
    name,
    email,
    password,
  }: CreateUserInput): Promise<CreateUserOutput> {
    const existingUser = await this.usersRepository.findByEmail(email)

    if (existingUser) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await hashPassword(password)

    const newUser: NewUser = {
      name,
      email,
      passwordHash,
    }

    const user = (await this.usersRepository.save(newUser)) as User
    return { user }
  }
}
