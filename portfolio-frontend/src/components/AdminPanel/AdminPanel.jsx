import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { logout } from "../../api/index.js";

function AdminPanel() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "home", label: "Home" },
    {
      category: "About",
      items: [
        { path: "about/introduction", label: "Introduction" },
        { path: "about/education", label: "Education" },
        { path: "about/skills", label: "Skills" },
        { path: "about/experience", label: "Experience" },
        { path: "about/certificates", label: "Certificates" },
      ],
    },
    { path: "projects", label: "Projects" },
    { path: "logs", label: "Logs" },
  ];

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-zinc-900 shadow-[4px_0_10px_-4px_rgba(0,0,0,0.5)] text-white">
        {/* Profile Section */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div>
              <strong className="block text-sm font-medium">{user?.user_fullname || 'Name'}</strong>
              <span className="text-xs text-gray-400">{user?.user_email || 'Email'}</span>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <nav className="mt-4">
          <ul className="text-amber-500">
            {menuItems.map((item, index) => {
              if (item.category) {
                // Render collapsible categories
                return (
                  <li key={index} className="group">
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-800 hover:text-gray-300">
                        <span className="text-sm font-medium">{item.category}</span>
                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </summary>
                      <ul className="mt-2 space-y-1 px-4">
                        {item.items.map((subItem) => (
                          <li key={subItem.path}>
                            <NavLink
                              to={subItem.path}
                              className={({ isActive }) =>
                                `block rounded-lg px-4 py-2 text-sm font-medium ${isActive
                                  ? "bg-zinc-800 text-white"
                                  : "text-gray-500 hover:bg-gray-800 hover:text-gray-300"
                                }`
                              }
                            >
                              {subItem.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                );
              } else {
                // Render standalone menu items
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `block rounded-lg px-4 py-2 text-sm font-medium 
                         ${isActive || (location.pathname === '/admin' && item.path === 'home')
                          ? "bg-zinc-800 text-white"
                          : "text-gray-500 hover:bg-gray-800 hover:text-gray-300"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              }
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="mt-6 w-full text-center">
          <button
            className="px-9 text-white py-2"
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
          >
            <i className="fa-solid fa-right-from-bracket me-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-black p-6 overflow-x-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPanel;
