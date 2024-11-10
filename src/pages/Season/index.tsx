import React, { useEffect, useState } from "react";
import apiService from "../../api/apiService";
import { Link } from "react-router-dom";

import Loader from "../../components/loader";

// Assets
import seasonImg from "../../assets/seasons.png";
import PaginationComponent from "../../components/pagination";

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
  const paginate = (
    seasons: Season[],
    page: number,
    itemsPerPage: number
  ): Season[] => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return seasons.slice(start, end);
  };

  // Get the paginated data for the current page
  const paginatedData = paginate(seasons, currentPage, itemsPerPage);

  // handle list view
  const changeView = (selectedView: "card" | "list"): void =>
    setView(selectedView);

  if (loading) return <Loader />;

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
        <PaginationComponent
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>

      {/* List of data */}
      <div
        className={`flex items-center justify-center  flex-wrap w-full  ${
          view === "card"
            ? "gap-8"
            : "xxs:gap-4 sm:gap-[1.25rem] lg:gap-[1.5rem]  "
        } `}
      >
        {paginatedData.map((season) => (
          <div
            key={season.season}
            className={`w-full rounded border-[#FF1E00] text-[#111827] 
              ${
                view === "card"
                  ? "p-4 border-t-2 border-r-2 flex flex-col gap-4 xxs:w-[calc(100%_/_2_-_2em)] sm:w-[calc(100%_/_3_-_2em)] "
                  : "border flex items-center justify-between w-full xxs:p-1 sm:p-2 lg:p-4 bg-gray-100"
              }`}
          >
            <img
              className="xxs:w-[6rem] sm:w-[7rem] lg:w-32 "
              src={seasonImg}
              alt="season"
            />
            <p className="m-auto text-5xl font-extrabold italic text-[#FF1E00]">
              {season.season}
            </p>

            <Link
              className={`text-[#0284c7] xxs:text-[0.75rem] sm:text-[1rem] sm:ml-auto ${
                view === "card" && "ml-auto"
              } `}
              to={`/season/${season.season}`}
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
