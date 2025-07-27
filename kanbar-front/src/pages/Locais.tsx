import NavBar from '@/components/ui/NavBar';
import bgLocais from '../../public/imgs/locaisbg.jpg';
import SearchBarLocais from '@/components/ui/SearchBarLocais';
import { useEffect, useState } from 'react';
import Location from '@/types/Location';
import CardLocais from '@/components/ui/CardLocais';

const mockLocais: Location[] = [
  {
    id: 1,
    name: 'Boteco na Trave',
    address: 'Rua João Cordeiro, 123',
    city: 'Pau dos Ferros - RN',
    horario: 'Das 18:00 às 00:00',
    phone: '(84) 99999-9999',
    price: 40,
    image: '',
    isopen: false,
  },
  {
    id: 2,
    name: "Mulato's Restaurante",
    address: 'Av. Getúlio Vargas, 1633',
    city: 'Pau dos Ferros - RN',
    horario: 'Das 17:00 às 23:30',
    phone: '(84) 99888-8888',
    price: 25,
    image: '',
    isopen: true,
  },
];

function Locais() {
  const [locais, setLocais] = useState<Location[]>([]);

  useEffect(() => {
    // Comentado: usando apenas mock por enquanto
    // get("/locations")
    //   .then((res) => {
    //     const fetchedLocations = Array.isArray(res.data)
    //       ? res.data
    //       : res.data.locations;

    //     if (Array.isArray(fetchedLocations)) {
    //       setLocais(fetchedLocations);
    //     } else {
    //       console.warn("API sem dados válidos. Usando mock.");
    //       setLocais(mockLocais);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error("Erro ao carregar locais:", err);
    //     setLocais(mockLocais);
    //   });

    // Forçando o uso do mock
    setLocais(mockLocais);
    console.log('Mock locais carregados:', mockLocais);
  }, []);

  return (
    <div className="min-h-screen w-full">
      <header
        className="bg-red-900 min-h-[400px] bg-cover bg-center bg-no-repeat relative flex flex-col"
        style={{
          backgroundImage: `url(${bgLocais})`,
        }}
      >
        <NavBar />

        <div className="flex-1 flex items-end justify-center pb-8">
          <SearchBarLocais />
        </div>
      </header>

      <main className="bg-white py-10 flex justify-center">
        {locais.length > 0 ? (
          <div className="flex flex-col items-center gap-10 w-full">
            {locais.map((location) => (
              <CardLocais key={location.id} location={location} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Nenhum local encontrado.</p>
          </div>
        )}
      </main>

      <footer>teste</footer>
    </div>
  );
}

export default Locais;
