import { Season, Race, RaceDetail } from "../types/types";

const BASE_URL = "https://ergast.com/api/f1";

const apiService = {
  // Fetch all available seasons
  getSeasons: async (): Promise<Season[]> => {
    try {
      const response = await fetch(`${BASE_URL}/seasons.json`);
      const data = await response.json();
      return data.MRData.SeasonTable.Seasons as Season[]; // Cast to Season[]
    } catch (error) {
      console.error("Error fetching seasons:", error);
      throw error;
    }
  },

  // Fetch races for a specific season
  getRacesForSeason: async (season: string): Promise<Race[]> => {
    try {
      const response = await fetch(`${BASE_URL}/${season}/races.json`);
      const data = await response.json();
      return data.MRData.RaceTable.Races as Race[]; // Cast to Race[]
    } catch (error) {
      console.error(`Error fetching races for season ${season}:`, error);
      throw error;
    }
  },

  // Fetch race details including drivers for a specific season and race round
  getRaceDetails: async (
    season: string,
    round: string | undefined
  ): Promise<RaceDetail[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/${season}/${round}/results.json`
      );
      const data = await response.json();
      return data.MRData.RaceTable.Races[0].Results as RaceDetail[]; // Cast to DriverResult[]
    } catch (error) {
      console.error(
        `Error fetching race details for season ${season}, round ${round}:`,
        error
      );
      throw error;
    }
  },
};

export default apiService;
