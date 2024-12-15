import { Meal } from "../../../../types";
import { classicOatmealRecipes } from "./classic";
import { overnightOatRecipes } from "./overnight";

export const oatmealRecipes: Meal[] = [
  ...classicOatmealRecipes,
  ...overnightOatRecipes
];