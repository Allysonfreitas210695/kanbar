import NavBar from '@/components/ui/NavBar';
import bgJogos from '../../public/imgs/jogosbg.jpg';
import SearchBarJogos from '@/components/ui/SearchBarJogos';
import { useEffect, useState } from 'react';
import Game from '@/types/Game';
import CardGame from '@/components/ui/CardJogos';

const mockJogos: Game[] = [
  {
    id: 1,
    name: 'Dama alcolítica',
    description: 'Clássico jogo da velha, porém com uma pitada de álcool.',
    ispayed: false,
    image: '',
    participants: 2,
  },
  {
    id: 2,
    name: 'Jogo da velha',
    description: 'Clássico jogo da velha, porém com uma pitada de álcool.',
    ispayed: true,
    image: '',
    participants: 2,
  },
  {
    id: 3,
    name: 'Baralho',
    description: 'Clássico jogo de baralho, porém com uma pitada de álcool.',
    ispayed: false,
    image: '',
    participants: 4,
  },
  {
    id: 4,
    name: 'Paciência',
    description: 'Clássico jogo de paciência, porém com uma pitada de álcool.',
    ispayed: false,
    image: '',
    participants: 1,
  },
];

function Jogos() {
  const [jogos, setJogos] = useState<Game[]>([]);

  useEffect(() => {
    // Comentado: usando apenas mock por enquanto
    // get("/games")
    //   .then((res) => {
    //     const fetchedGames = Array.isArray(res.data)
    //       ? res.data
    //       : res.data.games;

    //     if (Array.isArray(fetchedGames)) {
    //       setJogos(fetchedGames);
    //     } else {
    //       console.warn("API sem dados válidos. Usando mock.");
    //       setJogos(mockJogos);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error("Erro ao carregar jogos:", err);
    //     setJogos(mockJogos);
    //   });

    // Forçando o uso do mock
    setJogos(mockJogos);
    console.log('Mock jogos carregados:', mockJogos);
  }, []);

  return (
    <div className="min-h-screen w-full">
      <header
        className="bg-red-900 min-h-[400px] bg-cover bg-center bg-no-repeat relative flex flex-col"
        style={{
          backgroundImage: `url(${bgJogos})`,
        }}
      >
        <NavBar />

        <div className="flex-1 flex items-end justify-center pb-8">
          <SearchBarJogos />
        </div>
      </header>

      <main className="bg-white py-10 flex justify-center">
        {jogos.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-[1500px]">
            {jogos.map((game) => (
              <CardGame key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Nenhum jogo encontrado.</p>
          </div>
        )}
      </main>

      <footer>teste</footer>
    </div>
  );
}

export default Jogos;
