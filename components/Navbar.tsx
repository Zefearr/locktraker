"use client";
import Image from "next/image";
import Link from "next/link";
import logo from '../img/mainlogo.svg';
import { usePathname } from "next/navigation";
import { useState } from "react";


const Navbar = () => {

  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  const closeMenu = () => {
    setIsOpen(false);
  };

  const getLinkStyle = (path: string) => {
    const baseStyle = "p-4 py-4 md:py-2 px-8  transition-all";
    const activeStyle = "bg-white/10  shadow-lg";
    const inactiveStyle = "hover:text-white hover:bg-white/10";
    return `${baseStyle} ${pathname === path ? activeStyle : inactiveStyle}`;
  };

  const OpenedMenu = `opacity-100 z-100`;
  const ClosedMenu = `opacity-0 -z-100 md:z-100 md:opacity-100`;

  return (
    <div className="relative flex items-center justify-around mb-8">
      <div className="fixed z-101 right-5 top-5 md:hidden ">
        <button
          onClick={toggleMenu}
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-center space-y-1.5 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span
            className={`block origin-left h-1 w-full absolute left-0 top-0 bg-gray-400 transition-all duration-300 ease-out ${isOpen ? 'rotate-45 scale-x-125' : ''
              } `}
          />
          <span
            className={`block origin-center absolute top-3.5  h-1 w-full bg-gray-400 transition-all duration-300 ease-out ${isOpen ? '-rotate-y-90 ' : ''
              }`}
          />
          <span
            className={`block origin-left  h-1 w-full absolute left-0 bottom-0 bg-gray-400 transition-all duration-300 ease-out ${isOpen ? ' -rotate-45 scale-x-125' : ''
              }`}
          />
        </button>
      </div>

      <ul className={`fixed shadow-sm shadow-mauve-500/20  top-0 md:relative flex flex-col md:flex-row
       items-center text-[1rem] py-4 gap-x-4 gap-y-6 md:gap-y-0 [&>li]:text-left [&>li]:block [&>li]:w-full
        md:[&>li]:inline-block md:[&>li]:w-auto bg-deadlock-city w-full justify-center
       uppercase tracking-wider md:bg-[url('/navbar_pattern5.webp')] bg-top-left bg-contain
        ${isOpen ? OpenedMenu : ClosedMenu}`}>
        <li className="text-center block w-full px-6  ">
          <Link href="/" className="">
            <Image className="" priority src={logo} alt="Deadlock stats" width={100} />
          </Link>
        </li>
        <li ><Link className={`w-full block ${getLinkStyle('/heroes')}`} href="/heroes">TierList</Link></li>
        <li ><Link className={`w-full block ${getLinkStyle('/leaderboard')}`} href="/leaderboard">Leaderboard</Link></li>

        {/* <li ><Link className={getLinkStyle('/items')} href="/items " prefetch={false}>Items</Link></li> */}
        <li ><Link className={`w-full block ${getLinkStyle('/builds')}`} href="/builds">Builds</Link></li>
        <li ><Link className={`w-full block ${getLinkStyle('/about')}`} href="/about " prefetch={false}>About</Link></li>
      </ul >

    </div >

  );
}

export default Navbar;     