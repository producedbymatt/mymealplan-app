import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Recipe {
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
}

interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  recipe: Recipe;
}

interface MealTimeSlot {
  time: string;
  options: Meal[];
}

// Additional meal options pool with recipes
const mealOptionsPool: Meal[] = [
  {
    name: "Greek Yogurt Bowl",
    calories: 320,
    protein: 20,
    carbs: 40,
    fat: 12,
    recipe: {
      ingredients: [
        "1 cup Greek yogurt",
        "1/2 cup mixed berries",
        "1/4 cup granola",
        "1 tbsp honey",
        "1 tbsp chia seeds"
      ],
      instructions: [
        "Add Greek yogurt to a bowl",
        "Top with mixed berries",
        "Sprinkle granola and chia seeds",
        "Drizzle with honey"
      ],
      prepTime: "5 minutes",
      cookTime: "0 minutes"
    }
  },
  {
    name: "Tuna Avocado Salad",
    calories: 390,
    protein: 28,
    carbs: 20,
    fat: 24,
    recipe: {
      ingredients: [
        "1 can tuna, drained",
        "1 ripe avocado",
        "1/4 cup red onion, diced",
        "1 tbsp lemon juice",
        "Salt and pepper to taste",
        "Mixed greens"
      ],
      instructions: [
        "Drain tuna and place in a bowl",
        "Mash avocado and mix with tuna",
        "Add diced red onion and lemon juice",
        "Season with salt and pepper",
        "Serve over mixed greens"
      ],
      prepTime: "10 minutes",
      cookTime: "0 minutes"
    }
  },
  {
    name: "Chicken Stir-Fry",
    calories: 410,
    protein: 32,
    carbs: 45,
    fat: 16,
    recipe: {
      ingredients: [
        "200g chicken breast, diced",
        "2 cups mixed vegetables",
        "2 tbsp soy sauce",
        "1 tbsp olive oil",
        "1 cup brown rice"
      ],
      instructions: [
        "Cook brown rice according to package instructions",
        "Heat oil in a large pan",
        "Cook diced chicken until golden",
        "Add vegetables and stir-fry",
        "Add soy sauce and serve over rice"
      ],
      prepTime: "15 minutes",
      cookTime: "20 minutes"
    }
  },
  {
    name: "Mediterranean Bowl",
    calories: 440,
    protein: 22,
    carbs: 58,
    fat: 18,
    recipe: {
      ingredients: [
        "1 cup quinoa",
        "1 cup chickpeas",
        "Cherry tomatoes",
        "Cucumber",
        "Feta cheese",
        "Olive oil",
        "Lemon juice"
      ],
      instructions: [
        "Cook quinoa according to package instructions",
        "Combine with chickpeas and chopped vegetables",
        "Top with crumbled feta",
        "Drizzle with olive oil and lemon juice"
      ],
      prepTime: "10 minutes",
      cookTime: "15 minutes"
    }
  },
  {
    name: "Tofu Veggie Bowl",
    calories: 360,
    protein: 20,
    carbs: 48,
    fat: 14,
    recipe: {
      ingredients: [
        "200g firm tofu",
        "2 cups mixed vegetables",
        "1 cup brown rice",
        "2 tbsp soy sauce",
        "1 tbsp sesame oil"
      ],
      instructions: [
        "Press and cube tofu",
        "Cook brown rice",
        "Stir-fry tofu until golden",
        "Add vegetables and sauce",
        "Serve over rice"
      ],
      prepTime: "15 minutes",
      cookTime: "20 minutes"
    }
  },
];

const initialMealPlan: MealTimeSlot[] = [
  {
    time: "12:00 PM - 2:00 PM",
    options: [
      {
        name: "Grilled Chicken Salad",
        calories: 350,
        protein: 35,
        carbs: 15,
        fat: 20,
        recipe: {
          ingredients: [
            "200g chicken breast",
            "Mixed salad greens",
            "Cherry tomatoes",
            "Cucumber",
            "Balsamic vinaigrette"
          ],
          instructions: [
            "Grill chicken breast until cooked through",
            "Chop vegetables",
            "Combine all ingredients in a bowl",
            "Drizzle with vinaigrette"
          ],
          prepTime: "10 minutes",
          cookTime: "15 minutes"
        }
      },
      {
        name: "Quinoa Buddha Bowl",
        calories: 400,
        protein: 15,
        carbs: 65,
        fat: 15,
        recipe: {
          ingredients: [
            "1 cup quinoa",
            "1 sweet potato",
            "1 cup kale",
            "1/2 avocado",
            "Tahini dressing"
          ],
          instructions: [
            "Cook quinoa according to package",
            "Roast sweet potato cubes",
            "Massage kale with olive oil",
            "Assemble bowl and top with dressing"
          ],
          prepTime: "15 minutes",
          cookTime: "25 minutes"
        }
      },
      {
        name: "Turkey Wrap",
        calories: 380,
        protein: 25,
        carbs: 45,
        fat: 18,
        recipe: {
          ingredients: [
            "2 slices turkey breast",
            "Whole wheat wrap",
            "Lettuce",
            "Tomato",
            "Mustard"
          ],
          instructions: [
            "Lay out wrap",
            "Add turkey and vegetables",
            "Add condiments",
            "Roll tightly and slice"
          ],
          prepTime: "5 minutes",
          cookTime: "0 minutes"
        }
      },
    ],
  },
  {
    time: "4:00 PM - 6:00 PM",
    options: [
      {
        name: "Baked Salmon with Vegetables",
        calories: 450,
        protein: 40,
        carbs: 25,
        fat: 25,
        recipe: {
          ingredients: [
            "200g salmon fillet",
            "Broccoli",
            "Carrots",
            "Lemon",
            "Olive oil"
          ],
          instructions: [
            "Preheat oven to 400°F",
            "Season salmon with herbs",
            "Arrange vegetables around salmon",
            "Bake for 15-20 minutes"
          ],
          prepTime: "10 minutes",
          cookTime: "20 minutes"
        }
      },
      {
        name: "Vegetarian Stir-Fry",
        calories: 380,
        protein: 18,
        carbs: 55,
        fat: 15,
        recipe: {
          ingredients: [
            "Mixed vegetables",
            "Brown rice",
            "Tofu",
            "Soy sauce",
            "Ginger"
          ],
          instructions: [
            "Cook rice according to package",
            "Stir-fry vegetables",
            "Add tofu and sauce",
            "Serve hot over rice"
          ],
          prepTime: "15 minutes",
          cookTime: "20 minutes"
        }
      },
      {
        name: "Lean Beef with Sweet Potato",
        calories: 420,
        protein: 35,
        carbs: 40,
        fat: 20,
        recipe: {
          ingredients: [
            "150g lean beef",
            "1 sweet potato",
            "Green beans",
            "Garlic",
            "Olive oil"
          ],
          instructions: [
            "Cook sweet potato",
            "Sear beef to desired doneness",
            "Steam green beans",
            "Plate and serve"
          ],
          prepTime: "10 minutes",
          cookTime: "25 minutes"
        }
      },
    ],
  },
];

const MealPlan = () => {
  const [mealPlan, setMealPlan] = useState<MealTimeSlot[]>(initialMealPlan);
  const { toast } = useToast();

  const refreshMealOptions = (timeSlotIndex: number) => {
    console.log(`Refreshing meal options for time slot ${timeSlotIndex}`);
    
    setMealPlan((currentPlan) => {
      const newPlan = [...currentPlan];
      const newOptions = [...mealOptionsPool]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
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

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Today's Meal Plan</h2>
      <p className="text-gray-600 mb-6">
        Following intermittent fasting schedule (12 PM - 6 PM eating window)
      </p>
      {mealPlan.map((slot, index) => (
        <div key={slot.time} className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold">{slot.time}</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refreshMealOptions(index)}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Options
            </Button>
          </div>
          <div className="grid gap-4">
            {slot.options.map((meal, mealIndex) => (
              <Accordion type="single" collapsible key={mealIndex}>
                <AccordionItem value={`item-${mealIndex}`}>
                  <AccordionTrigger className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="flex-1 text-left">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{meal.name}</h4>
                        <Badge variant="secondary">{meal.calories} cal</Badge>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>Protein: {meal.protein}g</span>
                        <span>Carbs: {meal.carbs}g</span>
                        <span>Fat: {meal.fat}g</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2">
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold mb-2">Preparation Time</h5>
                        <p className="text-sm text-gray-600">
                          Prep: {meal.recipe.prepTime} | Cook: {meal.recipe.cookTime}
                        </p>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Ingredients</h5>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {meal.recipe.ingredients.map((ingredient, i) => (
                            <li key={i}>{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">Instructions</h5>
                        <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                          {meal.recipe.instructions.map((instruction, i) => (
                            <li key={i}>{instruction}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
          {index < mealPlan.length - 1 && <Separator className="mt-6" />}
        </div>
      ))}
    </Card>
  );
};

export default MealPlan;