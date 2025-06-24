import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CocktailPage from "./pages/CocktailPage/CocktailPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { useAppDispatch } from "./store/hooks";
import { fetchCocktails } from "./store/cocktailsSlice";
import { COCKTAIL_TYPES, DRINK } from "./types";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCocktails(DRINK.margarita)); // Загружаем данные по умолчанию
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/${COCKTAIL_TYPES[0]}`} replace />}
        />
        <Route path="/:type" element={<CocktailPage />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
