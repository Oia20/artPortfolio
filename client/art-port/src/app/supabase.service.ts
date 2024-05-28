import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabaseUrl = 'https://ayyjntjqttcwfulpvggm.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5eWpudGpxdHRjd2Z1bHB2Z2dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwNzgyMjIsImV4cCI6MjAzMTY1NDIyMn0.dIGcbSndg9kxoM9Xt-1Z6Bi6d1tzDF-N3b-5c-xmGgA';
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  getSupabaseClient(): SupabaseClient {
    return this.supabase;
  }
}