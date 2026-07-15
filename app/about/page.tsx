import Link from "next/link"


export default async function AboutPage() {


  return (
    <div className="relative min-h-[800px] p-6 overflow-hidden">
      <p className="text-[1rem] relative text-shadow-xs text-shadow-gray-900 mb-4 text-gray-300 tracking-wider font-thin"><span className="font-semibold text-[2rem] tracking-wider text-amber-200 text-shadow-xs text-shadow-amber-100  pr-2 uppercase">Disclaimer:</span> This website is an independent community fan project.
        It is not affiliated with, authorized, endorsed, or sponsored by Valve Corporation.
        Deadlock, the Deadlock logo, Valve, and the Valve logo are trademarks or registered trademarks of Valve Corporation.
        All in-game assets, imagery, and lore references belong to their respective owners.
        All player builds, tier lists, and strategies hosted on this platform represent subjective community opinions and individual user contributions,
        not official gameplay meta or recommendations. </p>
      <p className="text-gray-300 text-lg mb-4">API Data provided by <Link className="text-orange-800" href={'https://deadlock-api.com/'}>deadlock-api.com/</Link> </p>
      <p className=" text-gray-300 "><span className="font-bold">Deadlock</span> currently has no official release date. For more information, check out the <Link className="font-bold text-gray-200" href={'https://store.steampowered.com/app/1422450/Deadlock/'}>Deadlock Steam page</Link>.

      </p>
    </div>
  )
}