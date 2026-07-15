import { getBuildByBuildId } from "@/services/buildService";
import { notFound } from "next/navigation";
import { flattenItems } from "@/services/itemService";
import { fetchAllItemsNested } from "@/services/itemService";
import BuildSingle from "@/components/BuildSingle";
import { Metadata } from "next";
import { truncateText } from "@/components/helpers";



interface PageProps {
  params: Promise<{ buildId: number }>;
  searchParams: Promise<{ t?: string }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {

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

  if (!buildId) {
    return {
      title: 'No such build | Deadlock Stats ',
      description: 'This build does not exist.',
    };
  }

  return {
    title: `${currentBuild.hero_build?.name} deadlock item build `,
    description: `${truncateText(currentBuild.hero_build?.description, 24)}`,

    openGraph: {
      title: `${currentBuild.hero_build?.name}`,
      description: `${truncateText(currentBuild.hero_build?.description, 24)} `,
      images: [
        {
          url: `/public/singleBuild.webp`,
          width: 609,
          height: 366,
          alt: `${currentBuild.hero_build?.name} Deadlock build `,
        },
      ],
    },
  };
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
