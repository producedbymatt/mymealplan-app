import { Meal } from "../../../types";
import { grilledChickenRecipes } from "./grilled";
import { asianChickenRecipes } from "./asian";
import { mediterraneanChickenRecipes } from "./mediterranean";
import { mexicanChickenRecipes } from "./mexican";

export const chickenRecipes: Meal[] = [
  ...grilledChickenRecipes,
  ...asianChickenRecipes,
  ...mediterraneanChickenRecipes,
  ...mexicanChickenRecipes
];