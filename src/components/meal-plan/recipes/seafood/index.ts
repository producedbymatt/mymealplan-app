import { Meal } from "../../types";
import { tunaRecipes } from "./tuna";
import { shrimpRecipes } from "./shrimp";
import { mixedSeafoodRecipes } from "./mixed";
import { pokeRecipes } from "./poke";

export const seafoodRecipes: Meal[] = [
  ...tunaRecipes,
  ...shrimpRecipes,
  ...mixedSeafoodRecipes,
  ...pokeRecipes
];