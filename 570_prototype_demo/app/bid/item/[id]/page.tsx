import { notFound } from "next/navigation";
import { AUCTIONS } from "../../_lib/data";
import { BidView } from "./bid-view";

export function generateStaticParams() {
  return AUCTIONS.map((auction) => ({ id: auction.id }));
}

export default async function BidItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const auction = AUCTIONS.find((entry) => entry.id === id);

  if (!auction) notFound();

  return <BidView auction={auction} />;
}
