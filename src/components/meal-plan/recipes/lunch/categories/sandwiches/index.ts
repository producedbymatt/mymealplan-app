import { Meal } from "../../../../types";
import { turkeyRecipes } from "./turkey";
import { veggieRecipes } from "./veggie";

export const sandwichRecipes: Meal[] = [
  ...turkeyRecipes,
  ...veggieRecipes
];