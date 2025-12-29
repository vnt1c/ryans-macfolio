import { createContext, useContext, useState } from "react";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants/index.js"
import type { WindowKey, WindowConfig } from "#constants/index.js"

// Defines the shape of the window management context value
interface WindowContextInterface {
    windows: WindowConfig;
    openWindow: (windowKey: WindowKey, data?: any) => void;
    closeWindow: (windowKey: WindowKey) => void;
    focusWindow: (windowKey: WindowKey) => void;
};

// Create the context
const WindowContext = createContext<WindowContextInterface | undefined>(undefined);

// Safety wrapper for ussing WindowContext
export const useWindowContext = () => {
    const context = useContext(WindowContext);
    if (context === undefined) {
        throw new Error("useWindowContext must be used within a WindowProvider.");
    }
    return context;
}

export const WindowProvider = ({ children }: { children: React.ReactNode }) => {
    const [windows, setWindows] = useState({...WINDOW_CONFIG});
    const [nextZIndex, setNextZIndex] = useState(INITIAL_Z_INDEX + 1);

    const openWindow = (windowKey: WindowKey, data = null) => {
        setWindows((prevWindows) => ({
            ...prevWindows,
            [windowKey]: {
                ...prevWindows[windowKey],
                isOpen: true,
                zIndex: nextZIndex,
                data: data ?? prevWindows[windowKey].data
            }
        }));
        setNextZIndex(prev => prev + 1);
    };

    const closeWindow = (windowKey: WindowKey) => {
    setWindows((prevWindows) => ({
      ...prevWindows,
      [windowKey]: {
        ...prevWindows[windowKey],
        isOpen: false,
        zIndex: INITIAL_Z_INDEX,
        data: null
      }
    }));
  };

  const focusWindow = (windowKey: WindowKey) => {
    setWindows((prevWindows) => ({
      ...prevWindows,
      [windowKey]: {
        ...prevWindows[windowKey],
        zIndex: nextZIndex
      }
    }));
    setNextZIndex(prev => prev + 1);
  };

  return (
    <WindowContext.Provider value={{ windows, openWindow, closeWindow, focusWindow }}>
      {children}
    </WindowContext.Provider>
  )
}