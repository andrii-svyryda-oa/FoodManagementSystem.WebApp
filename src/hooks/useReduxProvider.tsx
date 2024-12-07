"use client"; // Necessary for client-side components

import store from "@/store/store";
import { Provider } from "react-redux";

interface ReduxProviderProps {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
