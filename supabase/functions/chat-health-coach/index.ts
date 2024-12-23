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

    console.log('Initializing OpenAI client...');
    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiKey) {
      throw new Error('OpenAI API key not found');
    }

    const openai = new OpenAI({
      apiKey: openaiKey,
    });

    console.log('Creating or retrieving thread...');
    const { message, messageHistory } = await req.json();

    // Create a thread if it doesn't exist
    const thread = await openai.beta.threads.create();
    console.log('Thread created:', thread.id);

    // Add the user's message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message
    });
    console.log('Added user message to thread');

    // Run the assistant
    console.log('Running assistant...');
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: "asst_pYVLKcsL2tJ8FWTDjmCqjio8",
      instructions: `You are a virtual health coach designed to help users achieve their health and fitness goals. 
      Always provide accurate, evidence-based information on nutrition, exercise, calorie counting, and weight management strategies. 
      Your tone should be motivational, supportive, and concise.

      Key Guidelines:
      1. User's Goals First: Always tailor advice to the user's specific goals (weight loss, gain, or maintenance)
      2. Accuracy Matters: Use precise, research-backed information. Avoid speculation
      3. Stay Concise: Provide clear, actionable responses in a few sentences unless more detail is requested
      4. Motivational Tone: Encourage and celebrate small wins
      5. Safety First: Recommend professional consultation for medical concerns
      6. Recipe Assistance: Provide/modify recipes with calorie counts and macros when possible
      7. Focus on Feasibility: Suggest practical and sustainable strategies
      8. Clear Communication: Avoid jargon unless requested

      Interaction Style:
      - Greet warmly and acknowledge progress/effort
      - Answer directly, offer follow-ups if needed
      - Stay positive and solution-focused
      - Proactively offer relevant tips/resources

      When suggesting recipes:
      1. Include complete nutritional information
      2. Provide full preparation instructions when asked
      3. Suggest alternatives or modifications when appropriate
      4. Consider dietary restrictions and preferences

      Always maintain a supportive and professional tone while focusing on evidence-based advice.`
    });

    // Poll for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    while (runStatus.status !== "completed") {
      if (runStatus.status === "failed") {
        throw new Error("Assistant run failed");
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    // Get the assistant's response
    const messages = await openai.beta.threads.messages.list(thread.id);
    const lastMessage = messages.data[0];
    const assistantResponse = lastMessage.content[0].text.value;

    console.log('Assistant response received');

    return new Response(
      JSON.stringify({ message: assistantResponse }),
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