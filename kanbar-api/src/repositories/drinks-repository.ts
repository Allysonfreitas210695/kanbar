import type { Drink, NewDrink } from "../db/schema/drinks.ts";

export interface DrinksRepository {
  create(data: NewDrink): Promise<Drink>;
  findAll(): Promise<Drink[]>;
  findById(id: string): Promise<Drink | null>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<NewDrink>): Promise<Drink>;
  favoriteDrink(data: { userId: string; drinkId: string }): Promise<void>;
  unfavoriteDrink(data: { userId: string; drinkId: string }): Promise<void>;
}
