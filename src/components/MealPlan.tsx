import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Filter, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import MealTimeSlot from "./meal-plan/MealTimeSlot";
import FavoritesList from "./meal-plan/FavoritesList";
import { useAllFavoriteMeals } from "@/hooks/useAllFavoriteMeals";
import { useMealPlanState } from "./meal-plan/hooks/useMealPlanState";
import { scaleMeal } from "./meal-plan/utils/mealScaling";

interface MealPlanProps {
  dailyCalories?: number;
  minProtein?: number;
  maxProtein?: number;
}

const MealPlan = ({ dailyCalories = 1200, minProtein = 0, maxProtein = 999 }: MealPlanProps) => {
  const {
    mealPlan,
    setMealPlan,
    usedRecipes,
    setUsedRecipes,
    showFavoritesOnly,
    setShowFavoritesOnly,
    userId,
    generateMealOptions
  } = useMealPlanState(dailyCalories);

  const { toast } = useToast();
  const { favoriteMeals, isLoading: favoritesLoading } = useAllFavoriteMeals(userId);

  const refreshMealOptions = (timeSlotIndex: number) => {
    console.log(`Refreshing meal options for time slot ${timeSlotIndex}`);
    const caloriesPerMeal = Math.round(dailyCalories / 3);
    
    setMealPlan((currentPlan) => {
      const newPlan = [...currentPlan];
      const newOptions = generateMealOptions(
        newPlan[timeSlotIndex].time, 
        caloriesPerMeal,
        usedRecipes
      );
      
      newOptions.forEach(meal => {
        setUsedRecipes(prev => new Set([...prev, meal.name]));
      });
      
      newPlan[timeSlotIndex] = {
        ...newPlan[timeSlotIndex],
        options: newOptions,
      };
      
      return newPlan;
    });

    toast({
      title: "Meal options refreshed",
      description: "New meal suggestions have been generated.",
    });
  };

  const toggleFavoritesFilter = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
    toast({
      title: showFavoritesOnly ? "Showing all meals" : "Showing favorites only",
      description: showFavoritesOnly ? "Displaying all available meal options" : "Filtering to show your favorite meals",
    });
  };

  const getAllFavorites = () => {
    const caloriesPerMeal = Math.round(dailyCalories / 3);
    return favoriteMeals.map(meal => scaleMeal(meal, caloriesPerMeal));
  };

  if (favoritesLoading) {
    return (
      <Card className="p-6 w-full max-w-2xl mx-auto">
        <div>Loading favorites...</div>
      </Card>
    );
  }

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">Today's Meal Plan</h2>
          <p className="text-gray-600">
            {showFavoritesOnly ? 'Your favorite meals' : 'Three balanced meals throughout the day'}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleFavoritesFilter}
          className="flex items-center gap-2"
        >
          {showFavoritesOnly ? (
            <>
              <FilterX className="h-4 w-4" />
              Show All
            </>
          ) : (
            <>
              <Filter className="h-4 w-4" />
              Show Favorites
            </>
          )}
        </Button>
      </div>

      {showFavoritesOnly ? (
        <FavoritesList
          time="Favorite Meals"
          meals={getAllFavorites()}
          isLast={true}
        />
      ) : (
        mealPlan.map((slot, index) => (
          <MealTimeSlot
            key={slot.time}
            time={slot.time}
            options={slot.options}
            onRefresh={() => refreshMealOptions(index)}
            isLast={index === mealPlan.length - 1}
            showFavoritesOnly={showFavoritesOnly}
          />
        ))
      )}
    </Card>
  );
};

export default MealPlan;