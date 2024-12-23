import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import apiService from "../../api/apiService";
import AnalyticsSection from "./analyticsSection";

// Types
import {
  Driver,
  Constructor,
  RaceDetail,
  ComparisonData,
  multipleComparisonData,
} from "../../types/types";

// Assets
import vrsImg from "../../assets/3ea92f9f.jpg";
import Loader from "../../components/loader";
import MultipleBarChart from "./multipleBarChart";

const titles = {
  default: "An Analysis of Formula 1’s Quickest Race Finishers",
};

const RaceDetails: React.FC = () => {
  const { season, round } = useParams<{
    season: string;
    round: string | undefined;
  }>();
  const [raceDetails, setRaceDetails] = useState<RaceDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [defaultComparisonDrivers, setDefaultComparisonDrivers] =
    useState<ComparisonData | null>(null);

  const [multipleBarChart, setMultipleBarChart] =
    useState<multipleComparisonData | null>(null);

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

        const points: number[] = [];
        const laps: number[] = [];
        const grid: number[] = [];

        for (let index = 0; index < finishedDriverList.length; index++) {
          const element = data[index];
          xAxis.push(element.Driver.givenName);
          yAxis.push(Number(element.Time.millis));

          points.push(Number(element.points));
          laps.push(Number(element.laps));
          grid.push(Number(element.grid));
        }

        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          xAxis.push(element.Driver.givenName);

          points.push(Number(element.points));
          laps.push(Number(element.laps));
          grid.push(Number(element.grid));
        }

        setDefaultComparisonDrivers({ xAxis, yAxis, title: titles.default });
        setMultipleBarChart({ xAxis, points, laps, grid });
      } catch (error) {
        console.error(`Failed to fetch races for season ${season}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchRaceDetails();
  }, [season, round]);

  if (loading || !defaultComparisonDrivers || !multipleBarChart)
    return <Loader />;

  return (
    <div className="bg-[#2B2B2B] pb-8 min-100vh">
      <img src={vrsImg} alt="vrs" />
      <div className="flex flex-col gap-16 w-[90%] m-auto bg-white xxs:p-2 sm:p-8 rounded mt-4">
        <AnalyticsSection
          raceDetails={raceDetails}
          defaultComparisonDrivers={defaultComparisonDrivers}
        />
        <MultipleBarChart multipleBarChart={multipleBarChart} />
      </div>
    </div>
  );
};

export default RaceDetails;
