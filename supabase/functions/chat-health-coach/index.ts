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

    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    console.log('OpenAI API key found:', !!openaiKey);
    
    if (!openaiKey) {
      console.error('OpenAI API key not found');
      throw new Error('OpenAI API key not found in environment variables');
    }

    const { message } = await req.json();
    console.log('Received message:', message);

    console.log('Initializing OpenAI...');
    const openai = new OpenAI({
      apiKey: openaiKey,
    });

    // Create a thread if it doesn't exist
    console.log('Creating thread...');
    const thread = await openai.beta.threads.create();
    console.log('Thread created:', thread.id);

    // Add the user's message to the thread
    console.log('Adding message to thread...');
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message
    });

    // Run the assistant
    console.log('Running assistant...');
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: "asst_pYVLKcsL2tJ8FWTDjmCqjio8",
      instructions: "You are a helpful health coach assistant. Provide clear, concise advice about nutrition, exercise, and general health topics."
    });

    // Poll for the run completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    console.log('Initial run status:', runStatus.status);

    while (runStatus.status === "queued" || runStatus.status === "in_progress") {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      console.log('Updated run status:', runStatus.status);
    }

    if (runStatus.status === "completed") {
      // Get the assistant's response
      console.log('Retrieving messages...');
      const messages = await openai.beta.threads.messages.list(thread.id);
      const lastMessage = messages.data[0];
      const assistantResponse = lastMessage.content[0].text.value;

      console.log('Assistant response:', assistantResponse);

      return new Response(
        JSON.stringify({ message: assistantResponse }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    } else {
      throw new Error(`Run ended with status: ${runStatus.status}`);
    }

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