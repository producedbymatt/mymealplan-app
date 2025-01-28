export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      calorie_logs: {
        Row: {
          calories: number
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          calories: number
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          calories?: number
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      meal_logs: {
        Row: {
          calories: number
          created_at: string
          id: string
          meal_name: string
          user_id: string
        }
        Insert: {
          calories: number
          created_at?: string
          id?: string
          meal_name: string
          user_id: string
        }
        Update: {
          calories?: number
          created_at?: string
          id?: string
          meal_name?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: []
      }
      progress_photos: {
        Row: {
          created_at: string | null
          id: string
          photo_url: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          photo_url: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          photo_url?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      recipes: {
        Row: {
          calories: number
          carbs: number
          category: string | null
          cook_time: string
          created_at: string | null
          difficulty_level: string | null
          fat: number
          id: string
          ingredients: Json
          instructions: Json
          is_favorite: boolean | null
          meal_type: string
          name: string
          prep_time: string
          protein: number
          tags: string[] | null
        }
        Insert: {
          calories: number
          carbs: number
          category?: string | null
          cook_time: string
          created_at?: string | null
          difficulty_level?: string | null
          fat: number
          id?: string
          ingredients: Json
          instructions: Json
          is_favorite?: boolean | null
          meal_type: string
          name: string
          prep_time: string
          protein: number
          tags?: string[] | null
        }
        Update: {
          calories?: number
          carbs?: number
          category?: string | null
          cook_time?: string
          created_at?: string | null
          difficulty_level?: string | null
          fat?: number
          id?: string
          ingredients?: Json
          instructions?: Json
          is_favorite?: boolean | null
          meal_type?: string
          name?: string
          prep_time?: string
          protein?: number
          tags?: string[] | null
        }
        Relationships: []
      }
      user_favorite_recipes: {
        Row: {
          created_at: string | null
          recipe_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          recipe_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          recipe_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorite_recipes_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_metrics: {
        Row: {
          activity_level:
            | Database["public"]["Enums"]["activity_level_type"]
            | null
          created_at: string
          current_weight: number
          gender: string | null
          height: number
          id: string
          recommended_calories: number | null
          target_days: number | null
          target_weight: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          activity_level?:
            | Database["public"]["Enums"]["activity_level_type"]
            | null
          created_at?: string
          current_weight: number
          gender?: string | null
          height: number
          id?: string
          recommended_calories?: number | null
          target_days?: number | null
          target_weight?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          activity_level?:
            | Database["public"]["Enums"]["activity_level_type"]
            | null
          created_at?: string
          current_weight?: number
          gender?: string | null
          height?: number
          id?: string
          recommended_calories?: number | null
          target_days?: number | null
          target_weight?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      weight_logs: {
        Row: {
          created_at: string
          id: string
          user_id: string | null
          weight: number
        }
        Insert: {
          created_at?: string
          id?: string
          user_id?: string | null
          weight: number
        }
        Update: {
          created_at?: string
          id?: string
          user_id?: string | null
          weight?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      activity_level_type:
        | "sedentary"
        | "lightly_active"
        | "moderately_active"
        | "very_active"
        | "extra_active"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
