import { createContext } from "react";
import { useFavorites } from "../hooks/useFavorites";

export const FavoritesContext = createContext();
export const FavoritesProvider = ({ children }) => {
    const favoritesState = useFavorites();
    const contextValue = {
        useFavorites: favoritesState
    }
    return(
        <FavoritesContext.Provider value={contextValue}>
            {children}
        </FavoritesContext.Provider>
    )
}