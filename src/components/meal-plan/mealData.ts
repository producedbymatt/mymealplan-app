import { breakfastRecipes } from "./recipes/breakfast";
import { lunchRecipes } from "./recipes/lunch";
import { dinnerRecipes } from "./recipes/dinner";
import { Meal } from "./types";

export const getMealOptionsForTime = (time: string): Meal[] => {
  if (time.includes("AM")) {
    return breakfastRecipes;
  } else if (time.includes("12:00 PM")) {
    return lunchRecipes;
  } else {
    return dinnerRecipes;
  }
};