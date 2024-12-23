import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Meal } from "@/components/meal-plan/types";

export const useFavoriteMeal = (meal: Meal) => {
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
          .eq('meal_name', meal.name);

        if (error) {
          console.error('Error loading favorite status:', error);
          toast({
            title: "Error",
            description: "Failed to load favorite status. Please try again.",
          });
          return;
        }

        // Check if we have any matching favorites
        setIsFavorite(data && data.length > 0);
        console.log('Favorite status loaded:', { isFavorite: data && data.length > 0 });
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
        return isFavorite;
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
          return isFavorite;
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
          return isFavorite;
        }
      }

      setIsFavorite(newFavoriteStatus);
      toast({
        title: newFavoriteStatus ? "Added to favorites" : "Removed from favorites",
        description: `${meal.name} has been ${newFavoriteStatus ? "added to" : "removed from"} your favorites.`,
      });
      
      return newFavoriteStatus;
    } catch (err) {
      console.error('Exception while toggling favorite:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
      return isFavorite;
    } finally {
      setIsLoading(false);
    }
  };

  return { isFavorite, isLoading, toggleFavorite };
};