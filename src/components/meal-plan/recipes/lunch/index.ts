import { Meal } from "../../types";
import { saladLunchRecipes } from "./categories/salads";
import { sandwichLunchRecipes } from "./categories/sandwiches";
import { bowlLunchRecipes } from "./categories/bowls";
import { wrapLunchRecipes } from "./categories/wraps";
import { asianLunchRecipes } from "./categories/asian";

export const lunchRecipes: Meal[] = [
  ...asianLunchRecipes,
  ...saladLunchRecipes,
  ...sandwichLunchRecipes,
  ...bowlLunchRecipes,
  ...wrapLunchRecipes
];