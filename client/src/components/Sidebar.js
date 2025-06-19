import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  // Only show sidebar if user is logged in
  if (!user) return null;

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Generate Ideas', href: '/generate', icon: '💡' },
    { name: 'Saved Ideas', href: '/saved', icon: '💾' },
    { name: 'Content Calendar', href: '/calendar', icon: '📅' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={`flex items-center p-3 text-base font-normal rounded-lg ${location.pathname === item.href ? 'bg-blue-100 text-blue-600' : 'text-gray-900 hover:bg-gray-100'}`}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
