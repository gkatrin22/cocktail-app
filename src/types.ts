export const COCKTAIL_TYPES = ["margarita", "mojito", "ai", "kir"];

export enum DRINK {
  margarita = "margarita",
  mojito = "mojito",
  a1 = "a1",
  kir = "kir",
}

export interface IIngredient {
  name: string;
  measure: string | null;
}

export interface ICocktail {
  idDrink: string;
  strDrink: DRINK;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  ingredients: IIngredient[];
}
