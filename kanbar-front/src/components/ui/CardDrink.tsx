import { Drink } from "@/types/Drink";
import drinkDefault from "../../../public/imgs/drink-default.png";
import { ChartNoAxesColumnIncreasing } from "lucide-react";
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
    <div className="bg-[#f1f1f1] w-[300px] h-[400px] rounded-xl shadow-lg p-4 flex flex-col items-center transition-transform duration-200 hover:scale-105 cursor-pointer mx-auto">
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
          <ChartNoAxesColumnIncreasing />{drink.difficulty}
        </span>
        <span className="text-sm text-gray-800">
          {"$".repeat(drink.price)}
        </span>
      </div>
    </div>
  );
}
