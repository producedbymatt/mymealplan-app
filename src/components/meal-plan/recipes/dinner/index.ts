import { Meal } from "../../types";
import { steakRecipes } from "./meat/steak";
import { chickenRecipes } from "./meat/chicken";
import { fishRecipes } from "./seafood/fish";
import { vegetarianDinnerRecipes } from "./vegetarian";

export const dinnerRecipes: Meal[] = [
  ...steakRecipes,
  ...chickenRecipes,
  ...fishRecipes,
  ...vegetarianDinnerRecipes
];