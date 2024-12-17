import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Meal } from "./types";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

interface MealOptionProps {
  meal: Meal;
  showFavoritesOnly?: boolean;
}

const MealOption = ({ meal, showFavoritesOnly }: MealOptionProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadFavoriteStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          setIsLoading(false);
          return;
        }

        console.log('Checking favorite status for:', {
          user_id: session.user.id,
          meal_name: meal.name
        });

        const { data, error } = await supabase
          .from('favorite_meals')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('meal_name', meal.name)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // No data found - not a favorite
            setIsFavorite(false);
          } else {
            console.error('Error loading favorite status:', error);
            toast({
              title: "Error",
              description: "Failed to load favorite status. Please try again.",
            });
          }
        } else {
          console.log('Favorite status loaded:', data);
          setIsFavorite(!!data);
        }
      } catch (err) {
        console.error('Exception while loading favorite status:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavoriteStatus();
  }, [meal.name, toast]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast({
          title: "Please log in",
          description: "You need to be logged in to save favorites.",
        });
        return;
      }

      const newFavoriteStatus = !isFavorite;
      setIsLoading(true);

      if (newFavoriteStatus) {
        console.log('Adding favorite:', {
          user_id: session.user.id,
          meal_name: meal.name,
          meal_data: meal
        });

        const { error } = await supabase
          .from('favorite_meals')
          .insert({
            user_id: session.user.id,
            meal_name: meal.name,
            meal_data: meal
          });

        if (error) {
          console.error('Error saving favorite:', error);
          toast({
            title: "Error",
            description: "Failed to save favorite. Please try again.",
          });
          return;
        }
      } else {
        console.log('Removing favorite:', {
          user_id: session.user.id,
          meal_name: meal.name
        });

        const { error } = await supabase
          .from('favorite_meals')
          .delete()
          .eq('user_id', session.user.id)
          .eq('meal_name', meal.name);

        if (error) {
          console.error('Error removing favorite:', error);
          toast({
            title: "Error",
            description: "Failed to remove favorite. Please try again.",
          });
          return;
        }
      }

      setIsFavorite(newFavoriteStatus);
      toast({
        title: newFavoriteStatus ? "Added to favorites" : "Removed from favorites",
        description: `${meal.name} has been ${newFavoriteStatus ? "added to" : "removed from"} your favorites.`,
      });
    } catch (err) {
      console.error('Exception while toggling favorite:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showFavoritesOnly && !isFavorite) {
    return null;
  }

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
          <div className="flex-1 text-left">
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium break-words">{meal.name}</h4>
                  <Heart
                    className={`h-5 w-5 cursor-pointer transition-colors flex-shrink-0 ${
                      isLoading ? "opacity-50" : ""
                    } ${
                      isFavorite
                        ? "fill-red-500 stroke-red-500"
                        : "stroke-gray-400 hover:stroke-red-500"
                    }`}
                    onClick={toggleFavorite}
                  />
                </div>
              </div>
              <Badge variant="secondary" className="whitespace-nowrap flex-shrink-0">
                {meal.calories} cal
              </Badge>
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
  );
};

export default MealOption;