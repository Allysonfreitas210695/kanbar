export default interface Game {
  id: number;
  name: string;
  description: string;
  ispayed: boolean;
  image: string | undefined;
  participants: number;
}
