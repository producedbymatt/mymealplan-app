import { chickenRecipes } from "./recipes/protein-sources/chicken";
import { fishRecipes } from "./recipes/protein-sources/fish";
import { beefRecipes } from "./recipes/protein-sources/beef";
import { otherProteinRecipes } from "./recipes/protein-sources/other-proteins";
import { vegetarianRecipes } from "./recipes/vegetarian";
import { seafoodRecipes } from "./recipes/seafood";
import { Meal } from "./types";

export const mealOptionsPool: Meal[] = [
  ...chickenRecipes,
  ...fishRecipes,
  ...beefRecipes,
  ...otherProteinRecipes,
  ...vegetarianRecipes,
  ...seafoodRecipes
];