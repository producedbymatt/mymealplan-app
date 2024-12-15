import { Meal } from "../../types";
import { oatmealRecipes } from "./categories/oatmeal";
import { eggRecipes } from "./categories/eggs";
import { proteinBreakfastRecipes } from "./categories/protein";

export const breakfastRecipes: Meal[] = [
  ...oatmealRecipes,
  ...eggRecipes,
  ...proteinBreakfastRecipes
];