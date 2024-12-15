import { Meal } from "../../types";
import { sandwichRecipes } from "./sandwiches";
import { bowlRecipes } from "./bowls";
import { saladRecipes } from "./salads";

export const lunchRecipes: Meal[] = [
  ...sandwichRecipes,
  ...bowlRecipes,
  ...saladRecipes
];