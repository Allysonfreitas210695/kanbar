import Game from '@/types/Game';
import gameDefault from '../../../public/imgs/game-default.jpg';
import { Users } from 'lucide-react';

interface CardGameProps {
  game: Game;
}

function CardGame({ game }: CardGameProps) {
  return (
    <div className="bg-[#f7f7f7] w-[700px] h-[400px] rounded-xl shadow-lg p-4 flex flex-col items-start transition-transform duration-200 hover:scale-105 cursor-pointer mx-auto">
      <div className="w-full h-40 mb-4 rounded overflow-hidden flex items-center justify-center bg-gray-200">
        <img
          src={game.image || gameDefault}
          alt={game.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-xl font-semibold text-justify">{game.name}</h2>
      <p className="text-sm text-gray-600 text-justify my-2">
        {game.description}
      </p>
      <div className="flex items-center justify-between w-full mt-auto pt-2">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded ${
            game.ispayed ? 'bg-red-900 text-white' : 'bg-[#ADCC42] text-white'
          }`}
        >
          {game.ispayed ? 'Pago' : 'Grátis'}
        </span>
        <span className="text-sm text-gray-800 flex items-center gap-1">
          <Users size={16} /> {game.participants}
        </span>
      </div>
    </div>
  );
}

export default CardGame;
