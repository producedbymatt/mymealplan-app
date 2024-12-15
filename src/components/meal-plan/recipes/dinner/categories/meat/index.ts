import { Meal } from "../../../types";
import { chickenRecipes } from "./chicken";
import { steakRecipes } from "./steak";

export const meatRecipes: Meal[] = [
  ...chickenRecipes,
  ...steakRecipes
];