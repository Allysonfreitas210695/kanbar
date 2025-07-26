import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Drinks from './pages/Drinks';
import Jogos from './pages/Jogos';
import Locais from './pages/Locais';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/jogos" element={<Jogos />} />
          <Route path="/locais" element={<Locais />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
