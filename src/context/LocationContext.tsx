
import { createContext, useContext, useState } from "react";

import { locations } from "#constants";

// Shared type for all location/folder/file objects
export type LocationItem = {
    id: number;
    name: string;
    icon: string;
    kind: string;
    type?: string;
    fileType?: string;
    position?: string;
    windowPosition?: string;
    imageUrl?: string;
    href?: string;
    description?: string[];
    children?: LocationItem[];
};

const DEFAULT_LOCATION: LocationItem = locations.work;

interface LocationContextInterface {
        activeLocation: LocationItem;
        setActiveLocation: (location: LocationItem) => void;
        resetActiveLocation: () => void;
}

const LocationContext = createContext<LocationContextInterface | undefined>(undefined);

export const useLocationContext = () => {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error("useLocationContext must be used within a LocationProvider.");
    }
    return context;
};

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {

    const [activeLocation, setActiveLocationState] = useState<LocationItem>(DEFAULT_LOCATION);

    const setActiveLocation = (location: LocationItem = DEFAULT_LOCATION) => {
        setActiveLocationState(location);
    };

    const resetActiveLocation = () => {
        setActiveLocationState(DEFAULT_LOCATION);
    };

    return (
        <LocationContext.Provider value={{ activeLocation, setActiveLocation, resetActiveLocation }}>
            {children}
        </LocationContext.Provider>
    );
};