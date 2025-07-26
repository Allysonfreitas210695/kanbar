import { Search, CupSoda } from 'lucide-react';

function SearchBarDrink() {
  return (
    <div className="relative w-sm mx-auto mt-20">
      <div className="absolute inset-y-0 left-0 flex items-center bg-gray-300 px-3 rounded-l-md text-gray-700">
        <CupSoda className="w-5 h-5 mr-1" />
        <span className="text-sm font-bold">Drinks</span>
      </div>

      <input
        className="bg-[#FAF9F6] w-full py-2 px-4 pl-28 pr-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-bluring-blue-500 text-gray-500"
        type="search"
        placeholder="Buscar receitas de drinks"
      />

      <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-600 hover:text-gray-800">
        <Search className="w-5 h-5" />
      </div>
    </div>
  );
}

export default SearchBarDrink;
