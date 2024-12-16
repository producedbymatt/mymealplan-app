import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xjkimrzzyvigshbopmif.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZieGNyeWR0YWt0dWJwdHhwbXVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI4NDQ1NzAsImV4cCI6MjAxODQyMDU3MH0.xpNYR_S_Q5RQpIOiXFPOyYwYgWxC3pZLNrZmj1-nVXY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);