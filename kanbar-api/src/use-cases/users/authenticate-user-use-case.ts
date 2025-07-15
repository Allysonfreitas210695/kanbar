import type { User } from "../../db/schema/users.ts";
import type { UsersRepository } from "../../repositories/users-repositories.ts";
import { comparePassword } from "../../utils/compare-password.ts";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error.ts";

interface AuthenticateUserInput {
  email: string;
  password: string;
}

interface AuthenticateUserOutput {
  user: User;
}

export class AuthenticateUserUseCase {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    email,
    password,
  }: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await comparePassword(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
