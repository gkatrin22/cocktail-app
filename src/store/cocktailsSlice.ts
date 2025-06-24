import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DRINK, type ICocktail } from "../types";
import { processIngredients } from "../utils/processIngredients";

interface CocktailsState {
  cocktails: ICocktail[];
  cachedCocktails: Record<string, ICocktail[]>;
  currentCocktail: string;
  error: string | null;
  loading: boolean;
}

const initialState: CocktailsState = {
  cocktails: [],
  cachedCocktails: {},
  currentCocktail: DRINK.margarita,
  error: null,
  loading: false,
};

export const fetchCocktails = createAsyncThunk(
  "cocktails/fetchByType",
  async (type: string, { getState, rejectWithValue }) => {
    let controller: AbortController | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    try {
      const state = getState() as { cocktails: CocktailsState };

      if (state.cocktails.cachedCocktails[type]) {
        return state.cocktails.cachedCocktails[type];
      }

      controller = new AbortController();
      timeoutId = setTimeout(() => controller?.abort(), 30000);

      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${type}`,
        {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.drinks ? data.drinks : [];
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error occurred");
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }
  }
);

const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState,
  reducers: {
    setCurrentCocktail: (state, action) => {
      state.currentCocktail = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCocktails.fulfilled, (state, action) => {
        const type = action.meta.arg;
        state.loading = false;

        if (action.payload.length > 0) {
          const cocktailsWithIngredients = action.payload.map(
            (cocktail: any) => ({
              ...cocktail,
              ingredients: processIngredients(cocktail),
            })
          );

          state.cachedCocktails[type] = cocktailsWithIngredients;
          state.cocktails = cocktailsWithIngredients;

          if (!state.currentCocktail && cocktailsWithIngredients.length > 0) {
            state.currentCocktail = cocktailsWithIngredients[0].idDrink;
          }
        }
      })
      .addCase(fetchCocktails.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch cocktails";
      });
  },
});

export const { setCurrentCocktail, clearError } = cocktailsSlice.actions;
export default cocktailsSlice.reducer;
