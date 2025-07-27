import { useEffect, useState } from "react";
import NavBar from "@/components/ui/NavBar";
import SearchBarDrink from "@/components/ui/SearchBarDrink";
import CardDrink from "@/components/ui/CardDrink";
import { Drink } from "@/types/Drink";
import bgDrink from "@/../public/imgs/drinkbg.jpg";

const mockDrinks: Drink[] = [
  {
    id: 1,
    name: "Caipirinha",
    description: "Clássico brasileiro com limão e cachaça.",
    difficulty: "Fácil",
    price: 2,
    image: "", // Vazio para testar imagem default
  },
  {
    id: 2,
    name: "Mojito",
    description: "Hortelã, rum e toque cítrico refrescante.",
    difficulty: "Médio",
    price: 3,
    image: "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg",
  },
];

function Drinks() {
  const [drinks, setDrinks] = useState<Drink[]>([]);

  useEffect(() => {
    // Comentado: usando apenas mock por enquanto
    // get("/drinks")
    //   .then((res) => {
    //     const fetchedDrinks = Array.isArray(res.data)
    //       ? res.data
    //       : res.data.drinks;

    //     if (Array.isArray(fetchedDrinks)) {
    //       setDrinks(fetchedDrinks);
    //     } else {
    //       console.warn("API sem dados válidos. Usando mock.");
    //       setDrinks(mockDrinks);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error("Erro ao carregar drinks:", err);
    //     setDrinks(mockDrinks);
    //   });

    // Forçando o uso do mock
    setDrinks(mockDrinks);
    console.log("Mock drinks carregados:", mockDrinks);
  }, []);

  return (
    <div className="min-h-screen w-full">
      <header
        className="bg-red-900 min-h-[400px] bg-cover bg-center bg-no-repeat relative flex flex-col"
        style={{ backgroundImage: `url(${bgDrink})` }}
      >
        <NavBar />
        <div className="flex-1 flex items-end justify-center pb-8">
          <SearchBarDrink />
        </div>
      </header>

      <main className="bg-white py-10 px-4 md:px-12">
        {drinks.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum drink disponível no momento.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {drinks.map((drink) => (
              <CardDrink key={drink.id} drink={drink} />
            ))}
          </div>
        )}
      </main>

      <footer>{/* Conteúdo opcional */}</footer>
    </div>
  );
}

export default Drinks;
