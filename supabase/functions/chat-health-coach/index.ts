import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.1.0";

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
    const openai = new OpenAIApi(
      new Configuration({
        apiKey: openaiKey,
      })
    );

    console.log('Fetching recipes...');
    const { data: recipes, error: recipesError } = await supabaseClient
      .from('recipes')
      .select('*');

    if (recipesError) {
      console.error('Error fetching recipes:', recipesError);
      throw recipesError;
    }

    console.log('Recipes fetched successfully:', recipes?.length);

    const systemMessage = {
      role: 'system',
      content: `You are a helpful AI health coach with access to our recipe database: ${JSON.stringify(recipes)}. 
                You can help users with:
                1. Recipe suggestions and modifications
                2. General health and nutrition advice
                3. Diet-related questions
                4. Calorie and nutrient information for recipes
                Always be encouraging and supportive while keeping health and nutrition in mind.`
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
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    console.log('Received response from OpenAI');
    const aiResponse = completion.data.choices[0].message?.content || 'Sorry, I could not process your request.';

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