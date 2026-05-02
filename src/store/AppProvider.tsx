"use client";

import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  type Dispatch,
} from "react";
import type { User } from "@/types";

// ── State shape ───────────────────────────────────────────────

interface AppState {
  user: User | null;
  theme: "light" | "dark";
  /** Add more global state slices here */
}

const initialState: AppState = {
  user: null,
  theme: "dark",
};

// ── Actions ───────────────────────────────────────────────────

type Action =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_THEME"; payload: "light" | "dark" }
  | { type: "RESET" };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_USER":  return { ...state, user: action.payload };
    case "SET_THEME": return { ...state, theme: action.payload };
    case "RESET":     return initialState;
    default:          return state;
  }
}

// ── Context ───────────────────────────────────────────────────

const StoreContext = createContext<{
  state: AppState;
  dispatch: Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within <AppProvider>");
  return ctx;
}
