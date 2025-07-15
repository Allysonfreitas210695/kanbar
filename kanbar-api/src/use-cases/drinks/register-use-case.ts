import { Drink, NewDrink } from "../../db/schema/drinks.ts";
import { DrinksRepository } from "../../repositories/drinks-repository.ts";

interface CreateDrinkUseCaseRequest {
  data: NewDrink;
}

interface CreateDrinkUseCaseResponse {
  drink: Drink;
}

export class RegisterDrinkUseCase {
  constructor(private drinkRepository: DrinksRepository) {}

  async execute({
    data,
  }: CreateDrinkUseCaseRequest): Promise<CreateDrinkUseCaseResponse> {
    const drink = await this.drinkRepository.create(data);
    return { drink };
  }
}
