import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Button } from './components/ui/Button';
import Home from './pages/Home';
import Drinks from './pages/Drinks';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route
            path="/jogos"
            element={
              <h1 className="text-white">
                <Button>jogos</Button>
              </h1>
            }
          />
          <Route
            path="/locais"
            element={
              <h1 className="text-white">
                <Button>locais</Button>
              </h1>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
