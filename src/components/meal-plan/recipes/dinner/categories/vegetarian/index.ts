import { Meal } from "../../../../types";
import { curryRecipes } from "./curry";
import { stirFryRecipes } from "./stir-fry";

export const vegetarianDinnerRecipes: Meal[] = [
  ...curryRecipes,
  ...stirFryRecipes
];