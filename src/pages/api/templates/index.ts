import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const { data, error } = await supabase
      .from('business_templates')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      return new Response(JSON.stringify({ templates: [], warning: error.message }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ templates: data || [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Internal server error', templates: [] }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
