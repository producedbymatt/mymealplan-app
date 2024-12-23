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

    // Format recipes for better AI understanding and consistent display
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

Interaction Style:
- Start with a warm greeting and acknowledge any progress or effort
- Answer questions directly and offer follow-up clarification if needed
- Maintain a positive, judgment-free tone focused on solutions
- Proactively offer relevant tips or resources

When suggesting recipes from our database, always format them consistently:

**[Recipe Name]**

*Nutritional Information:*
• Calories: [calories] cal
• Protein: [protein]g
• Carbs: [carbs]g
• Fat: [fat]g

*Timing:*
• Prep Time: [prep_time]
• Cook Time: [cook_time]

*Ingredients:*
• [ingredient 1]
• [ingredient 2]
• [ingredient 3]
• [ingredient 4]

*Instructions:*
1. [instruction 1]
2. [instruction 2]
3. [instruction 3]
4. [instruction 4]

Available recipes: ${JSON.stringify(formattedRecipes, null, 2)}

You can help users with:
1. Recipe suggestions based on meal type, category, or nutritional requirements
2. Detailed recipe instructions and ingredients
3. Nutritional information for specific recipes
4. General health and nutrition advice
5. Diet-related questions

Remember to:
• Consider the user's preferences and requirements
• Include complete nutritional information
• Provide full preparation instructions when asked
• Suggest alternatives or modifications when appropriate

IMPORTANT: When formatting instructions, always use numbered lists with each step on its own line, starting with "1. " for the first step, "2. " for the second step, etc. Never combine steps into a single line.`
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