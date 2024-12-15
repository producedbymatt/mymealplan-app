import { Meal } from "../../types";
import { vegetarianDinnerRecipes } from "./vegetarian";
import { chickenRecipes } from "./meat/chicken";
import { steakRecipes } from "./meat/steak";
import { fishRecipes } from "./seafood/fish";

export const dinnerRecipes: Meal[] = [
  ...vegetarianDinnerRecipes,
  ...chickenRecipes,
  ...steakRecipes,
  ...fishRecipes
];