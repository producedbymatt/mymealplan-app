import { Meal } from "../../types";
import { chickenRecipes } from "./chicken";
import { fishRecipes } from "./fish";
import { beefRecipes } from "./beef";
import { otherProteinRecipes } from "./other-proteins";

export const proteinRecipes: Meal[] = [
  ...chickenRecipes,
  ...fishRecipes,
  ...beefRecipes,
  ...otherProteinRecipes
];