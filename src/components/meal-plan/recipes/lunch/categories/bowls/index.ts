import { Meal } from "../../../../types";
import { quinoaBowlRecipes } from "./quinoa";
import { asianBowlRecipes } from "./asian";

export const bowlRecipes: Meal[] = [
  ...quinoaBowlRecipes,
  ...asianBowlRecipes
];