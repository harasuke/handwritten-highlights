import React, { createContext, useEffect, useRef } from "react";

interface HighlightContextValue {
  registerCallback: (callback: () => void) => () => void;
}
export const HighlightContext = createContext<HighlightContextValue | null>(null);

interface HighlightProviderProps {
  children: React.ReactNode;
}
export const HighlightProvider = ({ children }: HighlightProviderProps) => {
  const callbackRefs = useRef<Set<() => void>>(new Set());

  const registerCallback = (callback: () => void) => {
    callbackRefs.current.add(callback);
    return () => callbackRefs.current.delete(callback); // cleanup
  };

  useEffect(() => {
    const handleResize = () => {
      for (const callback of callbackRefs.current ?? []) {
        callback();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <HighlightContext.Provider value={{ registerCallback }}>
      {children}
    </HighlightContext.Provider>
  );
};
