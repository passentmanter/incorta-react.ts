import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";

export interface Race {
  raceName: string;
  // Add any other race properties as needed
  id?: string;
}

interface AppState {
  selectedSeason: string | null;
  races: Race[];
  pinnedRaces: string[];
  viewMode: "list" | "card";
  currentRoute: string;
  raceDetails: Record<string, any>;
}

type Action =
  | { type: "SET_SELECTED_SEASON"; payload: string }
  | { type: "SET_RACES"; payload: Race[] }
  | { type: "PIN_RACE"; payload: string }
  | { type: "UNPIN_RACE"; payload: string }
  | { type: "SET_VIEW_MODE"; payload: "list" | "card" }
  | { type: "SET_CURRENT_ROUTE"; payload: string }
  | { type: "SET_RACE_DETAILS"; payload: Record<string, any> };

const initialState: AppState = {
  selectedSeason: null,
  races: [],
  pinnedRaces: JSON.parse(localStorage.getItem("pinnedRaces") || "[]"),
  viewMode: "list",
  currentRoute: "/",
  raceDetails: {},
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_SELECTED_SEASON":
      return { ...state, selectedSeason: action.payload };
    case "SET_RACES":
      return { ...state, races: action.payload };
    case "PIN_RACE":
      if (!state.pinnedRaces.find((race) => race === action.payload)) {
        const updatedPinned = [...state.pinnedRaces, action.payload];
        localStorage.setItem("pinnedRaces", JSON.stringify(updatedPinned));
        return { ...state, pinnedRaces: updatedPinned };
      }
      return state;
    case "UNPIN_RACE":
      const filteredPinned = state.pinnedRaces.filter(
        (race) => race !== action.payload
      );
      localStorage.setItem("pinnedRaces", JSON.stringify(filteredPinned));
      return { ...state, pinnedRaces: filteredPinned };
    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.payload };
    case "SET_CURRENT_ROUTE":
      return { ...state, currentRoute: action.payload };
    case "SET_RACE_DETAILS":
      return { ...state, raceDetails: action.payload };
    default:
      return state;
  }
}

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextProps {
  state: AppState;
  dispatch: Dispatch<Action>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
