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
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');
    const openaiKey = Deno.env.get('OPENAI_API_KEY');

    if (!supabaseUrl || !supabaseKey || !openaiKey) {
      throw new Error('Missing environment variables');
    }

    const { userId } = await req.json();
    console.log('Generating greeting for user:', userId);
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('first_name')
      .eq('id', userId)
      .maybeSingle();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      throw profileError;
    }

    console.log('Profile data:', profile);

    const openai = new OpenAI({
      apiKey: openaiKey,
    });

    console.log('Generating OpenAI completion...');
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: profile?.first_name 
            ? "You are a motivational health coach. Generate a short, personalized greeting (max 2 sentences) that's encouraging and focused on health and fitness goals. Use the user's first name naturally in the greeting. Keep it casual and friendly."
            : "You are a motivational health coach. Generate a short, encouraging greeting (max 2 sentences) focused on health and fitness goals. Keep it casual and friendly, but do not use any names or generic terms like 'friend'."
        },
        {
          role: "user",
          content: profile?.first_name 
            ? `Generate a greeting for ${profile.first_name}`
            : "Generate a motivational health greeting"
        }
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const greeting = completion.choices[0].message?.content || "Let's make today count on your health journey!";
    console.log('Generated greeting:', greeting);

    return new Response(
      JSON.stringify({ greeting }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('Error in generate-greeting function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});