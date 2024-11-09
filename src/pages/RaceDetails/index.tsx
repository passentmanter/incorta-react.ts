import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../../api/apiService";
import AnalyticsSection from "./analyticsSection";

import vrsImg from "../../assets/3ea92f9f.jpg";
import Loader from "../../components/loader";

const titles = {
  default: "An Analysis of Formula 1’s Quickest Race Finishers",
};

interface Driver {
  givenName: string;
  familyName: string;
  nationality: string;
  driverId: string;
}

interface Constructor {
  nationality: string;
}

interface RaceDetail {
  Driver: Driver;
  Constructor: Constructor;
  position: number;
  Time?: { millis: string };
  points: number;
  laps: number;
  status: string;
}

interface ComparisonData {
  xAxis: string[];
  yAxis: number[];
  title: string;
}

const RaceDetails: React.FC = () => {
  const { season, round } = useParams<{
    season: string;
    round: string | undefined;
  }>();
  const [raceDetails, setRaceDetails] = useState<RaceDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [defaultComparisonDrivers, setDefaultComparisonDrivers] =
    useState<ComparisonData | null>(null);

  useEffect(() => {
    const fetchRaceDetails = async () => {
      if (!season || !round) return;

      try {
        const data: any = await apiService.getRaceDetails(season, round);
        setRaceDetails(data);

        const finishedDriverList = data.filter(
          (d: RaceDetail) => d.status === "Finished"
        );

        const xAxis: string[] = [];
        const yAxis: number[] = [];
        for (let index = 0; index < finishedDriverList.length; index++) {
          const element = data[index];
          xAxis.push(element.Driver.givenName);
          yAxis.push(Number(element.Time.millis));
        }

        setDefaultComparisonDrivers({ xAxis, yAxis, title: titles.default });
      } catch (error) {
        console.error(`Failed to fetch races for season ${season}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchRaceDetails();
  }, [season, round]);

  if (loading || !defaultComparisonDrivers) return <Loader />;

  return (
    <div className="bg-[#2B2B2B] pb-8 min-100vh">
      <img src={vrsImg} alt="vrs" />
      <div className="flex flex-col gap-16 w-[90%] m-auto bg-white xxs:p-2 sm:p-8 rounded mt-4">
        <AnalyticsSection
          raceDetails={raceDetails}
          defaultComparisonDrivers={defaultComparisonDrivers}
        />
      </div>
    </div>
  );
};

export default RaceDetails;
