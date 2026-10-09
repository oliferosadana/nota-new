import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const prerender = false;

// GET Store Settings
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
      return new Response(JSON.stringify({
        store: null,
        message: 'Unauthenticated or guest mode.'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data, error } = await supabase
      .from('store_settings')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      return new Response(JSON.stringify({ store: null, warning: error.message }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ store: data || null }), {
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

// UPSERT Store Settings
export const POST: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get('Authorization');
    let user = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      const { data } = await supabase.auth.getUser(token);
      user = data.user;
    }

    if (!user) {
      return new Response(JSON.stringify({ error: 'Harap masuk akun untuk menyimpan profil toko ke database.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const payload = {
      user_id: user.id,
      store_name: body.store_name,
      tagline: body.tagline || '',
      address: body.address || '',
      phone: body.phone || '',
      logo_url: body.logo_url || '/img/ben.jpeg',
      footer_note: body.footer_note || '',
      wifi_info: body.wifi_info || '',
      qr_text: body.qr_text || '',
      paper_size: body.paper_size || '58mm',
      show_barcode: Boolean(body.show_barcode),
      show_qrcode: Boolean(body.show_qrcode),
      updated_at: new Date().toISOString()
    };

    // Check if store record already exists
    const { data: existing } = await supabase
      .from('store_settings')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    let result;
    if (existing && existing.id) {
      result = await supabase
        .from('store_settings')
        .update(payload)
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from('store_settings')
        .insert([payload])
        .select()
        .single();
    }

    if (result.error) {
      return new Response(JSON.stringify({ error: result.error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, store: result.data }), {
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
