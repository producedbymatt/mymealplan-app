import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase configuration');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Require authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const supabaseClient = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !userData?.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }
    const lovableKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableKey) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const body = await req.json();
    const rawMessage = typeof body?.message === 'string' ? body.message : '';
    const message = rawMessage.trim().slice(0, 2000);
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const rawHistory = Array.isArray(body?.messageHistory) ? body.messageHistory : [];
    const messageHistory = rawHistory
      .filter((m: any) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-20)
      .map((m: any) => ({ role: m.role as 'user' | 'assistant', content: m.content.slice(0, 2000) }));

    const { data: recipes, error: recipesError } = await supabaseClient
      .from('recipes')
      .select('*');

    if (recipesError) {
      console.error('Error fetching recipes:', recipesError);
      throw recipesError;
    }

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

IMPORTANT: This exact format must be followed for ALL food and calorie-related questions, whether it's a single ingredient or a complex meal.`
    };

    const messages = [
      systemMessage,
      ...messageHistory,
      { role: 'user', content: message },
    ];

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error('AI gateway error:', aiResponse.status, errText);
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit reached. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits in Lovable settings.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        );
      }
      return new Response(
        JSON.stringify({ error: 'AI service unavailable' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const aiData = await aiResponse.json();
    const replyText = aiData.choices?.[0]?.message?.content || 'Sorry, I could not process your request.';

    return new Response(
      JSON.stringify({ message: replyText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('Error in chat-health-coach function:', error);
    return new Response(
      JSON.stringify({ error: 'There was an error processing your request' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});

});
