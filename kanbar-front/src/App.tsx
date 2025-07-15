import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Button } from './components/ui/Button';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-white">
                <Button>Home</Button>
              </h1>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
