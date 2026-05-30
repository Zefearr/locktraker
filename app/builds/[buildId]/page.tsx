import { getBuildByBuildId } from "@/services/buildService";
import { notFound } from "next/navigation";
import { flattenItems } from "@/services/itemService";
import { fetchAllItemsNested } from "@/services/itemService";
import BuildSingle from "@/components/BuildSingle";


interface PageProps {
  params: Promise<{ buildId: number }>;
  searchParams: Promise<{ t?: string }>;
}

export default async function HeroBuildDetails({ params, searchParams }: PageProps) {

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const buildId = Number(resolvedParams.buildId);
  const targetTimestamp = resolvedSearchParams.t ? Number(resolvedSearchParams.t) : null;

  const rawData = await getBuildByBuildId(buildId);
  const buildVersions = (rawData as unknown as any[]) || [];


  const currentBuild = buildVersions.find((version) => {
    const currentTs = version?.hero_build?.last_updated_timestamp;

    if (targetTimestamp && currentTs) {
      return Number(currentTs) === targetTimestamp;
    }

    return false;
  }) || buildVersions[0];

  const nestedItems = await fetchAllItemsNested()
  if (!nestedItems) return null;

  if (!currentBuild) {
    notFound();
  }
  const itemsMap = flattenItems(nestedItems);


  return (
    <div>
      <BuildSingle build={currentBuild} itemsMap={itemsMap} />
    </div>
  );
}
