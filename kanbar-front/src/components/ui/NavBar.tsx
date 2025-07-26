import { User } from 'lucide-react';
import logo from '../../../public/imgs/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'INÍCIO', path: '/' },
    { name: 'DRINKS', path: '/drinks' },
    { name: 'JOGOS', path: '/jogos' },
    { name: 'LOCAIS', path: '/locais' },
  ];

  return (
    <nav className="absolute top-0 left-0 z-50 w-full flex items-center justify-between px-15 py-[16px] text-white">
      <div className="w-[140px] h-[40] cursor-pointer" onClick={() => navigate('/')}>
        <img src={logo} alt="Logo do Kanbar" className="w-full h-auto" />
      </div>

      <ul className="hidden md:flex space-x-10 font-bold text-xl tracking-wider">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`cursor-pointer relative transition-all ${
                isActive
                  ? 'after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-white'
                  : 'hover:opacity-80'
              }`}
            >
              {item.name}
            </li>
          );
        })}
      </ul>

      <div className=" md:flex items-center space-x-2">
        <User size={30} className="text-white" />
      </div>
    </nav>
  );
}

export default NavBar;
