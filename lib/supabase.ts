import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://syuddulwqqyuhrcwhqqs.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5dWRkdWx3cXF5dWhyY3docXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyNjM3NjksImV4cCI6MjA2MTgzOTc2OX0.N9-ajuy8iM90HVtnmMxRuLJtSCE2IISa0hkseEi-OuM';

export const supabase = createClient(supabaseUrl, supabaseKey);