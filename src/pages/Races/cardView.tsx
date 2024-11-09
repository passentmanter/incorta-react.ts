import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAppContext } from "../../contexts/AppContext";

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

interface CardViewProps {
  race: Race;
  season: string;
  fetchRaces: () => Promise<void>;
}

const CardView: React.FC<CardViewProps> = ({ race, season, fetchRaces }) => {
  const { state, dispatch } = useAppContext();

  // Check if a race is pinned based on its name
  const isRacePinned = (name: string): boolean => {
    return state.pinnedRaces.some((r) => r === name);
  };

  // Handle pinning/unpinning a race
  const handlePinRace = (race: Race): void => {
    if (isRacePinned(race.raceName)) {
      dispatch({ type: "UNPIN_RACE", payload: race.raceName });
    } else {
      dispatch({ type: "PIN_RACE", payload: race.raceName });
    }
    fetchRaces();
  };

  return (
    <>
      <div className="flex gap-1 items-center text-[#111827] xxs:p-1 sm:p-2 lg:p-4">
        <i
          className="pi pi-flag-fill"
          style={{ color: "", fontStyle: "italic" }}
        ></i>
        <h2 className="text-xl font-bold">{race.raceName}</h2>
        <i
          onClick={() => handlePinRace(race)}
          className="pi pi-thumbtack responsive__icon "
          style={{
            color: isRacePinned(race.raceName) ? "red" : "gray",
            marginLeft: "auto",
            cursor: "pointer",
          }}
        ></i>
      </div>
      <hr />
      <div className="xxs:p-2 sm:p-4 lg:p-[1.25rem]">
        <div className="flex gap-2">
          <p className="text-[#FF1E00] font-semibold">Circuit Name:</p>
          {race.Circuit.circuitName}
        </div>
        <div className="flex gap-2">
          <p className="text-[#FF1E00] font-semibold">Date:</p>
          <p className="font-font-medium">
            {moment(race.date).format("MMMM DD, YYYY")}
          </p>
        </div>
      </div>
      <Link
        className="m-auto mb-4 text-[#0284c7] underline-offset-1"
        to={`/incorta-react.ts/season/${season}/race/${race.round}`}
      >
        Show details
      </Link>
    </>
  );
};

export default CardView;
