import { Meal } from "../../types";
import { oatmealRecipes } from "./oatmeal";
import { eggRecipes } from "./eggs";
import { proteinBreakfastRecipes } from "./protein";

export const breakfastRecipes: Meal[] = [
  ...oatmealRecipes,
  ...eggRecipes,
  ...proteinBreakfastRecipes
];