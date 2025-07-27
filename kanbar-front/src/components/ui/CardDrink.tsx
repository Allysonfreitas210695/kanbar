import { Drink } from "@/types/Drink";
import drinkDefault from "../../../public/imgs/drink-default.png";

interface CardDrinkProps {
  drink: Drink;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Fácil":
      return "text-green-600";
    case "Médio":
      return "text-yellow-600";
    case "Difícil":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

export default function CardDrink({ drink }: CardDrinkProps) {
  return (
    <div className="border rounded-xl shadow-sm p-4 flex flex-col items-center hover:shadow-lg transition">
      <img
        src={drink.image || drinkDefault}
        alt={drink.name}
        className="h-40 object-contain mb-4"
      />
      <h2 className="text-xl font-semibold text-center">{drink.name}</h2>
      <p className="text-sm text-gray-600 text-center my-2">
        {drink.description}
      </p>
      <div className="flex items-center justify-between w-full mt-auto pt-2">
        <span
          className={`text-sm font-semibold ${getDifficultyColor(drink.difficulty)}`}
        >
          {drink.difficulty}
        </span>
        <span className="text-sm text-gray-800">
          {"$".repeat(drink.price)}
        </span>
      </div>
    </div>
  );
}
