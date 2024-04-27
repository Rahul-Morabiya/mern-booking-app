import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";

const Home = () => {
  const { data: hotels } = useQuery("fetchQuery", () => apiClient.fetchHotels());

  // Check if hotels is an array before using slice
  const topRowHotels = Array.isArray(hotels) ? hotels.slice(0, 2) : [];
  const bottomRowHotels = Array.isArray(hotels) ? hotels.slice(2) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Latest Destinations</h2>
      <p className="mb-6">Explore the most recent destinations added by our hosts.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {topRowHotels.map((hotel, index) => (
          <div key={index} className="transform transition duration-300 hover:scale-105">
            <LatestDestinationCard hotel={hotel} />
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {bottomRowHotels.map((hotel, index) => (
          <div key={index} className="transform transition duration-300 hover:scale-105">
            <LatestDestinationCard hotel={hotel} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
