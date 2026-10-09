import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const prerender = false;

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
        warning: 'Unauthenticated or offline mode. Returning empty sync list.',
        transactions: []
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      return new Response(JSON.stringify({
        warning: 'Supabase table not found or query error: ' + error.message,
        transactions: []
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ transactions: data || [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({
      error: err.message || 'Internal server error',
      transactions: []
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const authHeader = request.headers.get('Authorization');
    let user = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      const { data } = await supabase.auth.getUser(token);
      user = data.user;
    }

    if (!user) {
      return new Response(JSON.stringify({
        success: true,
        offline: true,
        message: 'Disimpan di memori lokal (pengguna tamu / luring).'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const transactionData = {
      user_id: user.id,
      receipt_no: body.receipt_no,
      date_time: body.date_time || new Date().toISOString(),
      store_name: body.store_name,
      customer_name: body.customer_name || 'Pelanggan Umum',
      cashier_name: body.cashier_name || 'Admin Kasir',
      items: body.items,
      total_amount: body.total_amount,
      payment_type: body.payment_type,
      payment_amount: body.payment_amount,
      change_amount: body.change_amount
    };

    const { data, error } = await supabase
      .from('transactions')
      .insert([transactionData])
      .select();

    if (error) {
      return new Response(JSON.stringify({
        success: false,
        warning: 'Gagal sinkron ke Cloud Supabase: ' + error.message,
        savedLocally: true
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      transaction: data ? data[0] : transactionData
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({
      error: err.message || 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
