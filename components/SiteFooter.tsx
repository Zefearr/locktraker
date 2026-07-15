import Link from "next/link";
export default async function SiteFooter() {
  const currentYear = new Date().getFullYear();
  return (

    <footer className="w-full border-t border-zinc-800 bg-[#0a0d11e6] text-zinc-400 py-8 px-4 mt-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-6">


        <div className="flex flex-col gap-2">
          <Link href="/" className="text-white font-bold tracking-wider hover:text-orange-500 transition-colors">
            STATDL<span className="text-orange-900">.EU</span>
          </Link>
          <p className="text-sm">
            &copy; {currentYear} StatDL. All rights reserved.
          </p>
        </div>


        <div className="flex gap-8 text-sm">
          <div className="flex flex-col gap-2">
            <span className="text-zinc-200 font-medium">Database</span>
            <Link href="/heroes" className="hover:text-white transition-colors">Heroes</Link>
            <Link href="/builds" className="hover:text-white transition-colors">Builds</Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-zinc-200 font-medium">Project</span>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>

          </div>
        </div>
      </div>


      <div className="max-w-6xl mx-auto border-t border-zinc-900 my-6" />


      <div className="max-w-6xl mx-auto text-xs text-zinc-600 leading-relaxed flex flex-col gap-2">
        <p>
          <strong>Disclaimer:</strong> This website is an independent community fan project. It is not affiliated with,
          authorized, endorsed, or sponsored by Valve Corporation. Deadlock, the Deadlock logo, Valve, and the Valve logo
          are trademarks or registered trademarks of Valve Corporation. All in-game assets, imagery, and lore references
          belong to their respective owners.
        </p>
        <p>
          All player builds, tier lists, and strategies hosted on this platform represent subjective community opinions and
          individual user contributions, not official gameplay meta or recommendations.
        </p>
      </div>
    </footer>
  )
}