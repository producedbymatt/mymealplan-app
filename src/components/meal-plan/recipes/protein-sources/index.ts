import { Meal } from "../../types";
import { chickenRecipes } from "./chicken";
import { beefRecipes } from "./beef";
import { fishRecipes } from "./fish";
import { otherProteinRecipes } from "./other-proteins";

export const proteinRecipes: Meal[] = [
  ...chickenRecipes,
  ...beefRecipes,
  ...fishRecipes,
  ...otherProteinRecipes
];