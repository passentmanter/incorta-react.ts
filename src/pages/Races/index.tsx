import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../../api/apiService";

// Component
import ListView from "./listView";
import CardView from "./cardView";
import Loader from "../../components/loader";
import PaginationComponent from "../../components/pagination";
import ViewChanger from "../../components/viewChanger";

interface Race {
  round: string;
  raceName: string;
  circuit: string;
  date: string;
  season: string;
  url: string;
  Circuit: {
    Location: { country: string; lat: string; locality: string; long: string };
    circuitId: string;
    circuitName: string;
    url: string;
  };
}

const RaceList: React.FC = () => {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { season } = useParams<{ season: string }>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(races.length / itemsPerPage);

  const [view, setView] = useState<"card" | "list">("card");

  const fetchRaces = async () => {
    if (!season) return;
    try {
      const data: Race[] = await apiService.getRacesForSeason(season);

      // Retrieve the pinned drivers' IDs from local storage
      const pinnedDrivers: string[] = JSON.parse(
        localStorage.getItem("pinnedRaces") || "[]"
      );

      // Sort drivers with pinned ones at the top
      const sortedDrivers = data.sort((a, b) => {
        const isAPinned = pinnedDrivers.includes(a.raceName);
        const isBPinned = pinnedDrivers.includes(b.raceName);

        if (isAPinned && !isBPinned) return -1;
        if (!isAPinned && isBPinned) return 1;
        return 0;
      });

      setRaces(sortedDrivers);
    } catch (error) {
      console.error(`Failed to fetch races for season ${season}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRaces();
  }, [season]);

  // Function to get the data for the current page
  const paginate = (races: Race[], page: number, itemsPerPage: number) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return races.slice(start, end);
  };

  // Get the paginated data for the current page
  const paginatedData = paginate(races, currentPage, itemsPerPage);

  // handle list view
  const changeView = (selectedView: "card" | "list") => setView(selectedView);

  // loading view
  if (loading) return <Loader />;

  return (
    <div className="m-auto flex flex-col items-center justify-center xxs:w-[90vw] xxs:py-[1.25em] xxs:gap-[1.25em] sm:w-[85vw] sm:py-[3.25em] sm:gap-[3.25em] lg:w-[80vw] lg:py-[3.75em] lg:gap-[3.75em] ">
      <div className="w-full flex justify-between">
        {/* View Toggle*/}
        <ViewChanger changeView={changeView} />

        {/* Pagination */}
        <PaginationComponent
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>

      {/* List of data */}

      <div className="flex items-center justify-center gap-4 flex-wrap w-full">
        {paginatedData.map((race) => (
          <div
            key={race.round}
            className={`border rounded flex flex-col gap-1 ${
              view === "card"
                ? "flex flex-col gap-1 xxs:w-full  lg:w-[calc(100%_/_3_-_1em)]"
                : "flex w-full"
            }`}
          >
            {view === "card" ? (
              <CardView race={race} season={season!} fetchRaces={fetchRaces} />
            ) : (
              <ListView race={race} season={season!} fetchRaces={fetchRaces} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaceList;
