import { Meal } from "../../../types";
import { grilledChickenRecipes } from "./grilled";
import { stirFryChickenRecipes } from "./stir-fry";
import { chickenBowlRecipes } from "./bowls";

export const chickenRecipes: Meal[] = [
  ...grilledChickenRecipes,
  ...stirFryChickenRecipes,
  ...chickenBowlRecipes,
];