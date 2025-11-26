import { FavoritesProvider } from "./context";
import FavoritesCharacters from "./components/FavoritesCharacters"
const Favorites = () => {
  return (
    <FavoritesProvider>
      <FavoritesCharacters />
    </FavoritesProvider>
  );
};
export default Favorites;