import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import OpenAI from "https://esm.sh/openai@4.28.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Request method:', req.method);
    console.log('Request headers:', Object.fromEntries(req.headers.entries()));

    console.log('Initializing Supabase client...');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase configuration');
      throw new Error('Missing Supabase configuration');
    }

    console.log('Supabase URL found:', !!supabaseUrl);
    console.log('Supabase Key found:', !!supabaseKey);

    const supabaseClient = createClient(supabaseUrl, supabaseKey);
    console.log('Supabase client initialized');

    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    console.log('OpenAI API key found:', !!openaiKey);
    
    if (!openaiKey) {
      console.error('OpenAI API key not found');
      throw new Error('OpenAI API key not found in environment variables');
    }

    const { message, messageHistory } = await req.json();
    console.log('Request payload received:', { 
      messageReceived: !!message,
      historyLength: messageHistory?.length 
    });

    console.log('Initializing OpenAI...');
    const openai = new OpenAI({
      apiKey: openaiKey,
      defaultHeaders: {
        'OpenAI-Beta': 'assistants=v2'
      }
    });

    console.log('Fetching recipes...');
    const { data: recipes, error: recipesError } = await supabaseClient
      .from('recipes')
      .select('*');

    if (recipesError) {
      console.error('Error fetching recipes:', recipesError);
      throw recipesError;
    }

    console.log('Recipes fetched successfully:', recipes?.length);

    const formattedRecipes = recipes.map(recipe => ({
      name: recipe.name,
      type: recipe.meal_type,
      category: recipe.category,
      nutritionalInfo: {
        calories: recipe.calories,
        protein: recipe.protein,
        carbs: recipe.carbs,
        fat: recipe.fat
      },
      timing: {
        prepTime: recipe.prep_time,
        cookTime: recipe.cook_time
      },
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      difficultyLevel: recipe.difficulty_level
    }));

    const systemMessage = {
      role: 'system',
      content: `You are a virtual health coach designed to help users achieve their health and fitness goals. Your responses must be accurate, evidence-based, and focused on nutrition, exercise, calorie counting, and weight management strategies. Your tone should be motivational, supportive, and concise.

Key Guidelines to Follow:
1. User's Goals First: Always tailor advice to the user's specific goals (weight loss, gain, or maintenance).
2. Accuracy Matters: Use precise, research-backed information. Avoid speculation.
3. Stay Concise: Provide clear, actionable responses in a few sentences unless more detail is requested.
4. Motivational Tone: Encourage users and celebrate their progress, even small wins.
5. Safety First: Advise within safe practices; recommend professional consultation for medical concerns.
6. Recipe Assistance: Modify recipes to match dietary needs. Always include calories and macros.
7. Focus on Feasibility: Suggest practical, sustainable strategies for the user's lifestyle.
8. Clear Communication: Use simple language unless technical details are requested.

VERY IMPORTANT: When users ask about calories in ANY food or meal:
1. ALWAYS format your response exactly like this, starting with "Based on your description, your" followed by the food/meal name in single quotes, then "contains approximately X calories":

Based on your description, your 'Food/Meal Name' contains approximately X calories.

2. Then, if applicable, ALWAYS provide the caloric breakdown with each component on a new line:
Here's the breakdown:

- Component 1: X calories
- Component 2: X calories
(etc.)

3. ALWAYS end with EXACTLY this question: "Would you like to log this meal? If you need any tips or modifications, feel free to ask!" followed by an appropriate emoji.

Example response:
Based on your description, your 'Grilled Chicken Sandwich' contains approximately 450 calories.

Here's the breakdown:
- Whole wheat bread: 140 calories
- Grilled chicken breast: 165 calories
- Lettuce: 5 calories
- Tomato: 10 calories
- Mayo: 100 calories
- Cheese: 30 calories

Would you like to log this meal? If you need any tips or modifications, feel free to ask! 🥪

IMPORTANT: This exact format must be followed for ALL food and calorie-related questions, whether it's a single ingredient or a complex meal.`
    };

    const messages = [
      systemMessage,
      ...messageHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    console.log('Sending request to OpenAI...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    console.log('Received response from OpenAI');
    const aiResponse = completion.choices[0].message?.content || 'Sorry, I could not process your request.';

    return new Response(
      JSON.stringify({ message: aiResponse }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error in chat-health-coach function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'There was an error processing your request',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});