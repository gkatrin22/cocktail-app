import { LazyLoadImage } from "react-lazy-load-image-component";
import type { ICocktail } from "../../types";
import "./CocktailCard.scss";

type TCocktailCard = {
  cocktail: ICocktail;
};

const CocktailCard = ({ cocktail }: TCocktailCard) => {
  const {
    strDrink,
    strCategory,
    strAlcoholic,
    strGlass,
    strInstructions,
    ingredients,
    strDrinkThumb,
  } = cocktail;

  return (
    <div className="cocktail-card">
      <div className="cocktail-card__title">{strDrink}</div>

      <div className="cocktail-card__info">
        <div className="cocktail-card__info--text">
          <div className="cocktail-card__info--text__base">
            <span>{strCategory}</span>
            <span>{strAlcoholic}</span>
            <span>{strGlass}</span>
          </div>
          <div className="cocktail-card__info--text__instructions">
            <h3>Instructions:</h3>
            <p>{strInstructions}</p>
          </div>
          <div className="cocktail-card__info--text__ingredients">
            <h3>List of ingredients:</h3>
            <ul>
              {ingredients?.map((ing, i) => (
                <li key={i}>
                  {ing.name} - {ing.measure || "to taste"}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="cocktail-card__info--view">
          <LazyLoadImage
            src={strDrinkThumb}
            alt={strDrink}
            effect="blur"
            placeholderSrc="/placeholder.jpg"
            className="cocktail-card__info--view__image"
          />
        </div>
      </div>
    </div>
  );
};

export default CocktailCard;
