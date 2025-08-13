import { mockTrips } from "@/lib/mockData";
import ProductClient from "./ProductClient";

interface ProductPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return mockTrips.map((trip) => ({
    id: trip.id,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductClient params={params} />;
}