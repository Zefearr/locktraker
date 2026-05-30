import BuildsList from "@/components/HeroBuilds";
import { getAllBuilds } from "@/services/buildService";
import { flattenItems } from "@/services/itemService";
import { fetchAllItemsNested } from "@/services/itemService";

interface PageProps {
  // params: Promise<{ name: string, id: number }>;
  searchParams: Promise<{ limit?: string; sort?: string; order?: string }>;
}

export default async function Builds({ searchParams }: PageProps) {

  const resolvedSearchParams = await searchParams;

  const currentLimit = Number(resolvedSearchParams.limit) || 12;
  const currentSort = resolvedSearchParams.sort || 'recent';
  const currentOrder = resolvedSearchParams.order || 'desc'; // Читаем order

  const [buildsData, nestedItems] = await Promise.all([

    getAllBuilds(currentLimit, currentSort, currentOrder),
    fetchAllItemsNested()
  ])
  if (!nestedItems) return null;

  const itemsMap = flattenItems(nestedItems);


  return (

    <BuildsList builds={buildsData || []} itemsMap={itemsMap} currentLimit={currentLimit} currentSort={currentSort} currentOrder={currentOrder} />



  );
}

