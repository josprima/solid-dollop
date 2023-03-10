import { SCREEN_WIDTH } from '@constants/common';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';

const menus = [
  {
    label: 'Products',
    href: '/products',
  },
  {
    label: 'Carts',
    href: '/carts',
  },
];

function SideBar() {
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(document.body.clientWidth > SCREEN_WIDTH.laptop);
  }, []);

  return (
    <div
      className={`bg-primary relative transition-all ${
        isOpen ? 'w-48' : 'w-0'
      }`}
    >
      <div className="w-full h-full overflow-hidden">
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className={`block p-4 text-white text hover:text-slate-200 hover:bg-violet-800 ${
              pathname === menu.href && 'bg-violet-800'
            }`}
          >
            {menu.label}
          </Link>
        ))}
      </div>

      <button
        onClick={toggleSideBar}
        type="button"
        className="absolute top-0 -right-10 p-3 bg-slate-200 rounded-r-lg text-center fill-primary"
      >
        <FiMenu />
      </button>
    </div>
  );
}

export default SideBar;
