import ListAllCharacters from "./components/ListAllCharacters";

/* import { Link } from "react-router-dom"; */
import { CharactersProvider } from "./context/CharactersProvider";

const Characters = () => {
  return (
    <CharactersProvider>
      <ListAllCharacters />
    </CharactersProvider>
  );
};
export default Characters;
