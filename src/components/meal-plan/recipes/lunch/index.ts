import { Meal } from "../../types";
import { asianLunchRecipes } from "./categories/asian";
import { mediterraneanLunchRecipes } from "./categories/mediterranean";
import { sandwichLunchRecipes } from "./categories/sandwiches";
import { saladLunchRecipes } from "./categories/salads";
import { bowlLunchRecipes } from "./categories/bowls";
import { wrapLunchRecipes } from "./categories/wraps";

export const lunchRecipes: Meal[] = [
  ...asianLunchRecipes,
  ...mediterraneanLunchRecipes,
  ...sandwichLunchRecipes,
  ...saladLunchRecipes,
  ...bowlLunchRecipes,
  ...wrapLunchRecipes
];