import { Meal } from "../../types";
import { meatRecipes } from "./categories/meat";
import { seafoodRecipes } from "./categories/seafood";
import { vegetarianDinnerRecipes } from "./categories/vegetarian";

export const dinnerRecipes: Meal[] = [
  ...meatRecipes,
  ...seafoodRecipes,
  ...vegetarianDinnerRecipes
];