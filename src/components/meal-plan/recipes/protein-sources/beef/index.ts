import { Meal } from "../../../types";
import { grilledBeefRecipes } from "./grilled";
import { stirFryBeefRecipes } from "./stir-fry";
import { beefBowlRecipes } from "./bowls";
import { beefWrapRecipes } from "./wraps";

export const beefRecipes: Meal[] = [
  ...grilledBeefRecipes,
  ...stirFryBeefRecipes,
  ...beefBowlRecipes,
  ...beefWrapRecipes
];