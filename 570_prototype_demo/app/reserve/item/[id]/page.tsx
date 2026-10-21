import { notFound } from "next/navigation";
import { ITEMS } from "../../_lib/items";
import { ItemFlow } from "../../_components/item-flow";

// The item id comes from the URL; let this route block instead of
// streaming a shell that would flash the wrong product.
export const instant = false;

export function generateStaticParams() {
  return ITEMS.map((item) => ({ id: item.id }));
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = ITEMS.find((entry) => entry.id === id);

  if (!item) notFound();

  return <ItemFlow item={item} />;
}
