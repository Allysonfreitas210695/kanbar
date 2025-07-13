import type { NewUser, User } from '../db/schema/users.ts'

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  save(user: NewUser): Promise<User>
  delete(id: string): Promise<void>
  update(user: Partial<NewUser>): Promise<void>
  listAll(): Promise<User[]>
}
