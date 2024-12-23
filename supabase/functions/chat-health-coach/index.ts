import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.1.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, userMetrics, messageHistory } = await req.json()

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const openai = new OpenAIApi(
      new Configuration({
        apiKey: Deno.env.get('OPENAI_API_KEY'),
      })
    )

    // Fetch all recipes from the database
    const { data: recipes } = await supabaseClient
      .from('recipes')
      .select('*')

    // Prepare the system message with context
    const systemMessage = {
      role: 'system',
      content: `You are a helpful AI health coach. You have access to the user's metrics: ${JSON.stringify(userMetrics)} 
                and all available recipes in the database: ${JSON.stringify(recipes)}. 
                You can help users with:
                1. Identifying and tracking health goals
                2. Recipe modifications and substitutions
                3. Calorie estimations for custom recipes
                4. Scaling recipes for different serving sizes
                Always be encouraging and supportive while keeping health and nutrition in mind.`
    }

    // Prepare the conversation history
    const messages = [
      systemMessage,
      ...messageHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: message },
    ]

    // Get response from OpenAI
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    })

    const aiResponse = completion.data.choices[0].message?.content || 'Sorry, I could not process your request.'

    return new Response(
      JSON.stringify({ message: aiResponse }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error(error)
    return new Response(
      JSON.stringify({ error: 'There was an error processing your request' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})