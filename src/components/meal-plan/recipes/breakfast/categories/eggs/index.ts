import { Meal } from "../../../../types";
import { breakfastBurritoRecipes } from "./breakfast-burrito";
import { avocadoToastRecipes } from "./avocado-toast";

export const eggRecipes: Meal[] = [
  ...breakfastBurritoRecipes,
  ...avocadoToastRecipes
];