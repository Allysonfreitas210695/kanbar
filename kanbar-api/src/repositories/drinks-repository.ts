import type { Drink } from "../db/schema/drinks.ts";

export interface DrinksRepository {
  findAll(): Promise<Drink[]>;
  findById(id: string): Promise<Drink | null>;
  favoriteDrink(data: { userId: string; drinkId: string }): Promise<void>;
  unfavoriteDrink(data: { userId: string; drinkId: string }): Promise<void>;
}
