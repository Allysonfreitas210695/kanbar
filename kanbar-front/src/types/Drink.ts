export interface Drink {
  id: number;
  name: string;
  description: string;
  difficulty: "Fácil" | "Médio" | "Difícil";
  price: number;
  image: string | undefined;
}
