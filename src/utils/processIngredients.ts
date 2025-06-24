import type { IIngredient } from "../types";

export const processIngredients = (cocktailData: any): IIngredient[] => {
  const ingredients: IIngredient[] = [];

  for (let i = 1; i <= 15; i++) {
    const name = cocktailData[`strIngredient${i}`];
    if (name) {
      ingredients.push({
        name,
        measure: cocktailData[`strMeasure${i}`]?.trim() || null,
      });
    }
  }

  return ingredients;
};
