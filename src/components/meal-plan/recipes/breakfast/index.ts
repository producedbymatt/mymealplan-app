import { Meal } from "../../types";
import { oatmealAndBowls } from "./categories/oatmeal-and-bowls";
import { proteinBased } from "./categories/protein-based";
import { toastAndSandwiches } from "./categories/toast-and-sandwiches";
import { smoothiesAndParfaits } from "./categories/smoothies-and-parfaits";

export const breakfastRecipes: Meal[] = [
  ...oatmealAndBowls,
  ...proteinBased,
  ...toastAndSandwiches,
  ...smoothiesAndParfaits
];