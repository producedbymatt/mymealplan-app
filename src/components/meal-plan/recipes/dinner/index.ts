import { Meal } from "../../types";
import { vegetarianDinnerRecipes } from "./categories/vegetarian";
import { chickenDinnerRecipes } from "./categories/chicken";
import { steakDinnerRecipes } from "./categories/steak";
import { fishDinnerRecipes } from "./categories/fish";

export const dinnerRecipes: Meal[] = [
  ...vegetarianDinnerRecipes,
  ...chickenDinnerRecipes,
  ...steakDinnerRecipes,
  ...fishDinnerRecipes
];