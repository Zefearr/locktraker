"use client";
import Image from "next/image";
import Link from "next/link";
import logo from '../img/weather.svg';
import { usePathname } from "next/navigation";
import Button from "./ui/Button";

const Navbar = () => {

  const pathname = usePathname();
  const getLinkStyle = (path: string) => {
    const baseStyle = "p-4 px-6 rounded-lg transition-all";
    const activeStyle = "bg-white/10  shadow-lg";
    const inactiveStyle = "hover:text-white hover:bg-white/10";
    return `${baseStyle} ${pathname === path ? activeStyle : inactiveStyle}`;
  };

  return (
    <div className="py-8 px-7 text-red flex justify-between">
      <Link href="/">
        <Image loading="eager" src={logo} alt="deadlock tracker" width={120} />
      </Link>
      <ul className="flex flex-row items-center gap-5 font-aldrich text-2xl">
        <li ><Link className={getLinkStyle('/heroes')} href="/heroes">TierList</Link></li>
        <li ><Link className={getLinkStyle('/players')} href="/players">Players</Link></li>
        <li ><Link className={getLinkStyle('/items')} href="/items">Items</Link></li>
        <li ><Link className={getLinkStyle('/about')} href="/about">Builds</Link></li>
      </ul>

    </div>

  );
}

export default Navbar;     