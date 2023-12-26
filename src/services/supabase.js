
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://jeewzwvsmxrsewsdphff.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZXd6d3ZzbXhyc2V3c2RwaGZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM0MTQ0NzQsImV4cCI6MjAxODk5MDQ3NH0.AOgfETjrg28eiUHD0DyxNEqEivMj0wXAYtwWCce269M";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;