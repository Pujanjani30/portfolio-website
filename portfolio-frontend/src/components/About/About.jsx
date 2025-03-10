import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

function About() {
  const menuItems = [
    { path: 'introduction', label: 'Introduction' },
    { path: 'skills', label: 'Skills' },
    { path: 'education', label: 'Education' },
    { path: 'experience', label: 'Experience' },
  ];

  const location = useLocation();

  return (
    <div className="flex flex-col md:grid md:grid-cols-12 min-h-screen">
      {/* Sidebar */}
      <div className="md:col-span-2 bg-zinc-900 shadow-[4px_0_10px_-4px_rgba(0,0,0,0.5)] 
      md:h-screen sticky top-0 md:pt-7 z-50">
        <h2 className="text-xl md:text-2xl pb-3 px-5 text-white">About</h2>
        <ul className="text-blue-500">
          {menuItems.map((item) => (
            <li key={item.path} className="hover:bg-gray-800">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center w-full px-2 py-2 ${isActive || (location.pathname === '/about' && item.path === 'introduction')
                    ? 'bg-gray-900 text-blue-500 border-l-2 border-blue-500'
                    : ''
                  }`
                }
              >
                <i className="fa-solid fa-chevron-right me-2 ps-3"></i>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Dynamic Content */}
      <div className="md:col-span-10 bg-zinc-900 text-white p-5 flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default About;
