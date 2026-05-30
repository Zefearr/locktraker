"use client";
import Image from "next/image";
import Link from "next/link";
import logo from '../img/mainlogo.svg';
import { usePathname } from "next/navigation";


const Navbar = () => {

  const pathname = usePathname();
  const getLinkStyle = (path: string) => {
    const baseStyle = "p-4 px-6 rounded-lg transition-all";
    const activeStyle = "bg-white/10  shadow-lg";
    const inactiveStyle = "hover:text-white hover:bg-white/10";
    return `${baseStyle} ${pathname === path ? activeStyle : inactiveStyle}`;
  };

  return (
    <div className="py-12 relative flex items-center justify-around border-b overflow-hidden">

      <ul className="flex flex-col md:flex-row items-center gap-5 text-2xl">
        <li ><Link className={getLinkStyle('/heroes')} href="/heroes">TierList</Link></li>
        <li ><Link className={getLinkStyle('/players')} href="/players">Players</Link></li>
        <Link href="/" className="px-10">
          <Image loading="eager" src={logo} alt="deadlock tracker" width={100} />
        </Link>
        <li ><Link className={getLinkStyle('/items')} href="/items " prefetch={false}>Items</Link></li>
        <li ><Link className={getLinkStyle('/about')} href="/builds">Builds</Link></li>
      </ul>

    </div>

  );
}

export default Navbar;     