import { Meal } from "../../types";
import { vegetarianBowls } from "./bowls";
import { vegetarianStirFry } from "./stir-fry";
import { vegetarianCurry } from "./curry";
import { vegetarianBuddhaBowl } from "./buddha-bowl";

export const vegetarianRecipes: Meal[] = [
  ...vegetarianBowls,
  ...vegetarianStirFry,
  ...vegetarianCurry,
  ...vegetarianBuddhaBowl
];