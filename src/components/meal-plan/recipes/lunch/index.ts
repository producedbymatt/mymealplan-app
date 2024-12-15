import { Meal } from "../../types";
import { asianLunchRecipes } from "./categories/asian";
import { mediterraneanLunchRecipes } from "./categories/mediterranean";
import { sandwichLunchRecipes } from "./categories/sandwiches";

export const lunchRecipes: Meal[] = [
  ...asianLunchRecipes,
  ...mediterraneanLunchRecipes,
  ...sandwichLunchRecipes
];