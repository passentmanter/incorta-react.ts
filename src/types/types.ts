// types.ts
export interface Driver {
  givenName: string;
  familyName: string;
  nationality: string;
  driverId: string;
}

export interface Constructor {
  nationality: string;
}

export interface RaceDetail {
  Driver: Driver;
  Constructor: Constructor;
  position: number;
  Time?: { millis: string };
  points: number;
  laps: number;
  status: string;
}

export interface ComparisonData {
  xAxis: string[];
  yAxis: number[];
  title: string;
}

export interface Season {
  season: string;
  url: string;
}


export interface Race {
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