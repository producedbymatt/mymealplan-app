import { Meal } from "../../types";
import { sandwichRecipes } from "./categories/sandwiches";
import { bowlRecipes } from "./categories/bowls";
import { saladRecipes } from "./categories/salads";

export const lunchRecipes: Meal[] = [
  ...sandwichRecipes,
  ...bowlRecipes,
  ...saladRecipes
];