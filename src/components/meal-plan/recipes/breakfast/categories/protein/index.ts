import { Meal } from "../../../../types";
import { proteinPancakeRecipes } from "./pancakes";
import { smoothieBowlRecipes } from "./smoothie-bowl";

export const proteinBreakfastRecipes: Meal[] = [
  ...proteinPancakeRecipes,
  ...smoothieBowlRecipes
];