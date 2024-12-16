import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xjkimrzzyvigshbopmif.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhqa2ltcnp6eXZpZ3NoYm9wbWlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzNzkzMTAsImV4cCI6MjA0OTk1NTMxMH0.SKqEKhcl1CYv7YKVQ6xw3gcaw9hHZz3-UFf512daXao';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);