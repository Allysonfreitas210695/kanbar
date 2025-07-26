import NavBar from '@/components/ui/NavBar';
import SearchBarDrink from '@/components/ui/SearchBarDrink';
import bgDrink from '../../public/imgs/drinkbg.jpg'

function Drinks() {
  return (
    <div className="min-h-screen w-full">
      <header 
        className="bg-red-900 min-h-[400px] bg-cover bg-center bg-no-repeat relative flex flex-col"
        style={{
          backgroundImage: `url(${bgDrink})`
        }}
      >
        <NavBar />
        
        {/* Container para centralizar o SearchBar */}
        <div className="flex-1 flex items-end justify-center pb-8">
          <SearchBarDrink />
        </div>
      </header>
      
      <main className='bg-white my-5'>
        teste
      </main>
      
      <footer>teste</footer>
    </div>
  );
}

export default Drinks;