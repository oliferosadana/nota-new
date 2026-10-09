import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, password, fullName, storeName } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({
        error: 'Email dan kata sandi wajib diisi.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (password.length < 6) {
      return new Response(JSON.stringify({
        error: 'Kata sandi minimal 6 karakter.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        data: {
          full_name: fullName || 'Kasir',
          store_name: storeName || 'UD BENTHENK KOMPUTER'
        }
      }
    });

    if (error) {
      return new Response(JSON.stringify({
        error: error.message
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      user: data.user,
      session: data.session,
      message: data.session ? 'Pendaftaran berhasil dan otomatis masuk.' : 'Pendaftaran berhasil. Silakan periksa email Anda untuk verifikasi.'
    }), {
      status: 200,
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
