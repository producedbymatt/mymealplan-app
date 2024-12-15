import { Meal } from "../../../types";
import { fishRecipes } from "./fish";
import { shrimpRecipes } from "./shrimp";

export const seafoodRecipes: Meal[] = [
  ...fishRecipes,
  ...shrimpRecipes
];