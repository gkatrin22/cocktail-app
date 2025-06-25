import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCocktails, setCurrentCocktail } from "../../store/cocktailsSlice";
import Navigation from "../../components/navigation/Navigation";
import CocktailCard from "../../components/cocktail-card/CocktailCard";
import { COCKTAIL_TYPES } from "../../types";
import "./CocktailPage.scss";

const CocktailPage = () => {
  const { type } = useParams<{ type?: string }>();
  const dispatch = useAppDispatch();
  const { cachedCocktails } = useAppSelector(
    (state) => state.cocktails
  );

  useEffect(() => {
    if (type && COCKTAIL_TYPES.includes(type)) {
      if (!cachedCocktails[type]) {
        dispatch(fetchCocktails(type));
      }
      dispatch(setCurrentCocktail(type));
    }
  }, [type, dispatch, cachedCocktails]);

  if (!type || !COCKTAIL_TYPES.includes(type)) {
    return <Navigate to="/404" replace />;
  }

  const filteredCocktails = cachedCocktails[type] || [];

  return (
    <div className="cocktail-page">
      <Navigation />
      <div className="cocktail-page__cocktail-card">
        {filteredCocktails.map((item) => (
          <CocktailCard key={item.idDrink} cocktail={item} />
        ))}
      </div>
    </div>
  );
};

export default CocktailPage;
