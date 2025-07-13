import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.ts'
import type { NewUser, User } from '../../db/schema/users.ts'
import { users } from '../../db/schema/users.ts'
import type { UsersRepository } from '../users-repositories.ts'

export class DrizzleRepositories implements UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })
    return user ?? null
  }

  async findById(id: string): Promise<User | null> {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    })
    return user ?? null
  }

  async save(user: NewUser): Promise<User> {
    const [createdUser] = await db.insert(users).values(user).returning()
    return createdUser
  }

  async delete(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id))
  }

  async update(user: Partial<NewUser> & { id: string }): Promise<void> {
    const { id, ...data } = user
    await db.update(users).set(data).where(eq(users.id, id))
  }

  async listAll(): Promise<User[]> {
    const result = await db.select().from(users)
    return result
  }
}
