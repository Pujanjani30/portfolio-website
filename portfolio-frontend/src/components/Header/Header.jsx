import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-zinc-800 text-white">
      <nav>
        <ul className="flex">
          <li><NavLink to="/home" className={({ isActive }) => isActive ? "bg-zinc-900 text-amber-500 border-t-2 border-amber-500 block px-3 py-2" : "block px-3 py-2"}>home.html</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? "bg-zinc-900 text-amber-500 border-t-2 border-amber-500 block px-3 py-2" : "block px-3 py-2"}>about.css</NavLink></li>
          <li><NavLink to="/projects" className={({ isActive }) => isActive ? "bg-zinc-900 text-amber-500 border-t-2 border-amber-500 block px-3 py-2" : "block px-3 py-2"}>projects.js</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
