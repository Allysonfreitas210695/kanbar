import { Drink, NewDrink } from "../../db/schema/drinks.ts";
import { DrinksRepository } from "../../repositories/drinks-repository.ts";

interface UpdateDrinkUseCaseRequest {
  id: string;
  data: Partial<NewDrink>;
}

interface UpdateDrinkUseCaseResponse {
  drink: Drink;
}

export class UpdateDrinkUseCase {
  constructor(private drinkRepository: DrinksRepository) {}

  async execute({
    id,
    data,
  }: UpdateDrinkUseCaseRequest): Promise<UpdateDrinkUseCaseResponse> {
    const drink = await this.drinkRepository.update(id, data);
    return { drink };
  }
}
