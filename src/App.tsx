import { Navigate, Route, Routes } from "react-router-dom";
import CocktailPage from "./pages/CocktailPage/CocktailPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { COCKTAIL_TYPES } from "./types";

function App() {
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
