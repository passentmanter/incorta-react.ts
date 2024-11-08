import React, { useEffect, useState } from "react";
import apiService from "../../api/apiService";
import { Link } from "react-router-dom";

// Assets
import seasonImg from "../../assets/seasons.png";
import loadingGif from "../../assets/da832510129901b5af57fce40d583724.gif";

// Define types for the season object and API response
interface Season {
  season: string;
}

const SeasonList: React.FC = () => {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(seasons.length / itemsPerPage);

  const [view, setView] = useState<"card" | "list">("card");

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const data: Season[] = await apiService.getSeasons();
        setSeasons(data);
      } catch (error) {
        console.error("Failed to fetch seasons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSeasons();
  }, []);

  // Function to get the data for the current page
  const paginate = (seasons: Season[], page: number, itemsPerPage: number): Season[] => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return seasons.slice(start, end);
  };

  // Get the paginated data for the current page
  const paginatedData = paginate(seasons, currentPage, itemsPerPage);

  // handle list view 
  const changeView = (selectedView: "card" | "list"): void => setView(selectedView);

  if (loading)
    return (
      <div className="flex justify-center items-center w-full h-[80vh]">
        <img className="w-[20vw]" src={loadingGif} alt="loading..." />
      </div>
    );

  return (
    <div className="w-[80vw] m-auto py-[5em] flex flex-col gap-16 items-center justify-center">
      <div className="w-full flex justify-between">
        {/* View selection */}
        <div className="flex gap-2">
          <i
            onClick={() => changeView("list")}
            className="custom-target-icon pi pi-server"
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
          ></i>

          <i
            onClick={() => changeView("card")}
            className="pi pi-th-large"
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
          ></i>
        </div>

        {/* Pagination */}
        <div className="flex gap-8">
          <button
            className={`${currentPage !== 1 && "cursor-pointer"}`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <i className="pi pi-chevron-circle-left" style={{ fontSize: "1.5rem" }}></i>
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
            <i className="pi pi-chevron-circle-right" style={{ fontSize: "1.5rem" }}></i>
          </button>
        </div>
      </div>

      {/* List of data */}
      <div className="flex items-center justify-center gap-8 flex-wrap w-full">
        {paginatedData.map((season) => (
          <div
            key={season.season}
            className={`rounded border-[#FF1E00] p-4 text-[#111827] 
              ${
                view === "card"
                  ? "border-t-2 border-r-2 flex flex-col gap-4 min-w-[calc(100%_/_3_-_2em)]"
                  : "border flex w-full"
              }`}
          >
            <img className="w-32" src={seasonImg} alt="season" />
            <p className="m-auto text-5xl font-extrabold italic text-[#FF1E00]">
              {season.season}
            </p>

            <Link
              className={`text-[#0284c7] ${view === "card" && "ml-auto"}`}
              to={`/incorta-react.ts/season/${season.season}`}
            >
              Show races
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonList;
