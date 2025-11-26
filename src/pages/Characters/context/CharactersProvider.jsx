import { createContext } from "react";
import { useCharacters } from "../hooks/useCharacters";

export const CharactersContext = createContext();

export const CharactersProvider = ({ children }) => {
    const charactersState = useCharacters();
    const contextValue = {
        useCharacters: charactersState
    }
    return(
        <CharactersContext.Provider value={contextValue}>
            {children}
        </CharactersContext.Provider>
    )
}