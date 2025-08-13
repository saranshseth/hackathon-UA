import { mockTrips } from "@/lib/mockData";
import TripClient from "./TripClient";

interface TripPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return mockTrips.map((trip) => ({
    id: trip.id,
  }));
}

export default function TripPage({ params }: TripPageProps) {
  return <TripClient params={params} />;
}