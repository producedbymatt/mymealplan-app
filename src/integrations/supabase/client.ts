// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xjkimrzzyvigshbopmif.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhqa2ltcnp6eXZpZ3NoYm9wbWlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzNzkzMTAsImV4cCI6MjA0OTk1NTMxMH0.SKqEKhcl1CYv7YKVQ6xw3gcaw9hHZz3-UFf512daXao";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);