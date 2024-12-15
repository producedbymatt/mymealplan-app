import { Meal } from "../../types";
import { oatmealAndGrainRecipes } from "./categories/oatmeal-and-grains";
import { proteinBasedRecipes } from "./categories/protein-based";
import { eggDishRecipes } from "./categories/egg-dishes";

export const breakfastRecipes: Meal[] = [
  ...oatmealAndGrainRecipes,
  ...proteinBasedRecipes,
  ...eggDishRecipes,
];
