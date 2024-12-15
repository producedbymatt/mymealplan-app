import { Meal } from "../../types";
import { oatmealAndBowls } from "./categories/oatmeal-and-bowls";
import { proteinBased } from "./categories/protein-based";
import { smoothiesAndParfaits } from "./categories/smoothies-and-parfaits";
import { toastAndSandwiches } from "./categories/toast-and-sandwiches";
import { savoryBowls } from "./categories/savory-bowls";
import { bakedGoods } from "./categories/baked-goods";

export const breakfastRecipes: Meal[] = [
  ...oatmealAndBowls,
  ...proteinBased,
  ...smoothiesAndParfaits,
  ...toastAndSandwiches,
  ...savoryBowls,
  ...bakedGoods
];