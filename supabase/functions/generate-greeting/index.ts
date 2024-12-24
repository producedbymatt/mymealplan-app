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
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get user's first name from profiles
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('first_name')
      .eq('id', userId)
      .single();

    if (profileError) {
      throw profileError;
    }

    const firstName = profile?.first_name || 'friend';

    const openai = new OpenAI({
      apiKey: openaiKey,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a motivational health coach. Generate a short, personalized greeting (max 2 sentences) that's encouraging and focused on health and fitness goals. Use the user's first name naturally in the greeting. Keep it casual and friendly."
        },
        {
          role: "user",
          content: `Generate a greeting for ${firstName}`
        }
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const greeting = completion.choices[0].message?.content || `Welcome back, ${firstName}!`;

    return new Response(
      JSON.stringify({ greeting }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});