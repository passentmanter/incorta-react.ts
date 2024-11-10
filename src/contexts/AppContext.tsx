import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";

export interface Race {
  raceName: string;
  id?: string;
}

interface AppState {
  pinnedRaces: string[];
}

type Action =
  | { type: "PIN_RACE"; payload: string }
  | { type: "UNPIN_RACE"; payload: string };

const initialState: AppState = {
  pinnedRaces: JSON.parse(localStorage.getItem("pinnedRaces") || "[]"),
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
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
