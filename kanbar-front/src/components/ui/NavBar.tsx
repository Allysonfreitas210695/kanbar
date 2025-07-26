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
    <nav className="w-full flex items-center justify-between px-6 py-4 text-white ">
      <div
        className="flex items-center w-[140px] h-[40px] cursor-pointer mx-3"
        onClick={() => navigate('/')}
      >
        <img src={logo} alt="Logo do Kanbar" className="h-full object-contain" />
      </div>

      <ul className="hidden md:flex items-center space-x-10 font-bold text-xl tracking-wider">
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

      <div className="flex items-center space-x-2 mx-3 ">
        <User size={30} className="text-white" />
      </div>
    </nav>
  );
}

export default NavBar;
