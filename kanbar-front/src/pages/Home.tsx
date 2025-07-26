import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import NavBar from '@/components/ui/NavBar';
import mojitoGlass from '../../public/imgs/mojito-glass.png';
import highballGlass from '../../public/imgs/highball-glass.png';
import daiquiriGlass from '../../public/imgs/daiquiri-glass.png';

const drinks = [
  {
    name: 'MOJITO',
    color: '#B6CC34',
    description:
      'O mojito é um drink com mais de 100 anos de história e tem um sabor refrescante para os dias de verão. Um drink que se encaixa perfeitamente com almoços em dias mais quentes ou até mesmo happy hours com os amigos.',
    difficulty: 'Fácil',
    price: '$$$',
    glass: mojitoGlass,
  },
  {
    name: 'DAIQUIRI',
    color: '#B31B15',
    description:
      'O tradicional drink Daiquiri nasceu em Cuba e tem uma longa e interessante história. Ele, inclusive, acabou se espalhando por todas as partes do mundo em meados dos anos 40.',
    difficulty: 'Fácil',
    price: '$$$',
    glass: daiquiriGlass,
  },
  {
    name: 'HIGHBALL',
    color: '#F59D13',
    description:
      'O Highball é um drink bem difundido na Europa e na Ásia. Sua versão tropical com Johnnie Walker Black Label, água de coco, laranja e água tônica, traz sabor e refrescância ao drink.',
    difficulty: 'Médio',
    price: '$$$',
    glass: highballGlass,
  },
];

function Home() {
  const [currentDrink, setCurrentDrink] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      nextDrink();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentDrink]);

  const nextDrink = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentDrink((prev) => (prev + 1) % drinks.length);
      setIsTransitioning(false);
    }, 150);
  };

  const prevDrink = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentDrink((prev) => (prev - 1 + drinks.length) % drinks.length);
      setIsTransitioning(false);
    }, 150);
  };

  const goToDrink = (index: any) => {
    if (index === currentDrink || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentDrink(index);
      setIsTransitioning(false);
    }, 150);
  };

  const current = drinks[currentDrink];

  return (
    <div
      className="min-h-screen w-screen transition-all duration-700 ease-in-out relative overflow-hidden"
      style={{ backgroundColor: current.color }}
    >
      <NavBar />

      <div className="relative z-10 flex items-center min-h-[calc(100vh-120px)] px-8">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto">
          {/* Text Content - Left Side */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1
              className={`text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-wider mb-6 transition-all duration-500 ${
                isTransitioning ? 'opacity-70' : 'opacity-100'
              }`}
              style={{ lineHeight: '0.9' }}
            >
              {current.name}
            </h1>
            
            <div
              className={`transition-all duration-500 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <p className="text-white/90 text-base leading-relaxed mb-6">
                {current.description}
              </p>

              <div className="flex items-center space-x-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Pref.:</span>
                  <span className="text-lg">{current.price}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{current.difficulty}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Glass Image - Right Side */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src={current.glass}
              alt={current.name}
              className={`w-64 md:w-80 lg:w-96 transition-opacity duration-500 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {drinks.map((_, index) => (
            <button
              key={index}
              onClick={() => goToDrink(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentDrink ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;