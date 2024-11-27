import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function AdminPanel() {
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
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-900 shadow-[4px_0_10px_-4px_rgba(0,0,0,0.5)] text-white">
        {/* Profile Section */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <img
              alt="Profile"
              src="https://via.placeholder.com/40"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <strong className="block text-sm font-medium">Admin Name</strong>
              <span className="text-xs text-gray-400">admin@example.com</span>
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
                        `block rounded-lg px-4 py-2 text-sm font-medium ${isActive
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
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-black p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPanel;
