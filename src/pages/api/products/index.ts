import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

const supabaseUrl = import.meta.env.SUPABASE_URL || 'https://kikczqdjyfhoqbhdgvmp.supabase.co';
const supabaseSecret = import.meta.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SECRET_KEY || '';
const adminClient = createClient(supabaseUrl, supabaseSecret || import.meta.env.SUPABASE_ANON_KEY || '');

// GET Products
export const GET: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get('Authorization');
    let user = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      const { data } = await supabase.auth.getUser(token);
      user = data.user;
    }

    if (!user) {
      // Allow viewing store products from database even in guest mode
      const { data, error } = await adminClient
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });

      return new Response(JSON.stringify({ products: data || [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (error) {
      return new Response(JSON.stringify({ error: error.message, products: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ products: data || [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Internal server error', products: [] }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// CREATE New Product
export const POST: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get('Authorization');
    let user = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      const { data } = await supabase.auth.getUser(token);
      user = data.user;
    }

    const body = await request.json();
    if (!body.name || body.price === undefined) {
      return new Response(JSON.stringify({ error: 'Nama dan harga produk wajib diisi.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const clientToUse = user ? supabase : adminClient;
    const targetUserId = user ? user.id : '77ff8554-ffc1-4c0a-a125-5afff71944ff';

    const { data, error } = await clientToUse
      .from('products')
      .insert([{
        user_id: targetUserId,
        name: body.name.trim(),
        price: Number(body.price) || 0,
        unit: body.unit || 'pcs',
        category: body.category || 'Umum',
        stock: Number(body.stock) || 100,
        sku: body.sku || ''
      }])
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, product: data }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// DELETE Product
export const DELETE: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get('Authorization');
    let user = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      const { data } = await supabase.auth.getUser(token);
      user = data.user;
    }

    const url = new URL(request.url);
    const productId = url.searchParams.get('id');

    if (!productId) {
      return new Response(JSON.stringify({ error: 'Product ID required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const clientToUse = user ? supabase : adminClient;
    let query = clientToUse.from('products').delete().eq('id', productId);
    if (user) {
      query = query.eq('user_id', user.id);
    }

    const { error } = await query;

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
