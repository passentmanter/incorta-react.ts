import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../../api/apiService";

// Component
import ListView from "./listView";
import CardView from "./cardView";

// Assets
import loadingGif from "../../assets/da832510129901b5af57fce40d583724.gif";

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

  useEffect(() => {
    const fetchRaces = async () => {
      if (!season) return;
      try {
        const data: Race[] = await apiService.getRacesForSeason(season);
        setRaces(data);
      } catch (error) {
        console.error(`Failed to fetch races for season ${season}:`, error);
      } finally {
        setLoading(false);
      }
    };
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
  if (loading)
    return (
      <div className="flex justify-center items-center w-full h-[80vh] ">
        <img className="w-[20vw]" src={loadingGif} alt="loading..." />
      </div>
    );

  return (
    <div className="m-auto flex flex-col items-center justify-center xxs:w-[90vw] xxs:py-[1.25em] xxs:gap-[1.25em] sm:w-[85vw] sm:py-[3.25em] sm:gap-[3.25em] lg:w-[80vw] lg:py-[3.75em] lg:gap-[3.75em] ">
      <div className="w-full flex justify-between">
        {/* View Toggle*/}
        <div className="flex gap-2">
          <i
            onClick={() => changeView("list")}
            className="custom-target-icon pi pi-server responsive__icon"
            style={{ cursor: "pointer" }}
          ></i>

          <i
            onClick={() => changeView("card")}
            className="pi pi-th-large responsive__icon"
            style={{ cursor: "pointer" }}
          ></i>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center xxs:gap-2 sm:gap-4 lg:gap-[1.5rem]">
          <button
            className={`${currentPage !== 1 && "cursor-pointer"}`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <i className="pi pi-chevron-circle-left responsive__icon"></i>
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`${currentPage !== totalPages && "cursor-pointer"}`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <i className="pi pi-chevron-circle-right responsive__icon"></i>
          </button>
        </div>
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
              <CardView race={race} season={season!} />
            ) : (
              <ListView race={race} season={season!} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaceList;
