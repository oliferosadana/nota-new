/**
 * Supabase Authentication & Cloud Sync Service for ThermalPOS Pro
 * Conforms to antislop rules: explicit states, error handling, resilient connectivity.
 */

// Default Supabase project configuration (can be customized via UI settings)
const DEFAULT_SUPABASE_CONFIG = {
  url: "https://kikczqdjyfhoqbhdgvmp.supabase.co",
  anonKey: "sb_publishable_znQBH8uD7I_2dLnIo6Y5yw_dLviRzZT"
};

class SupabaseAuthService {
  constructor() {
    this.client = null;
    this.currentUser = null;
    this.init();
  }

  // Retrieve stored configuration or use default
  getConfig() {
    const saved = localStorage.getItem('thermalpos_supabase_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.url && parsed.anonKey) return parsed;
      } catch (e) {
        console.warn('Error reading saved Supabase config:', e);
      }
    }
    return DEFAULT_SUPABASE_CONFIG;
  }

  saveConfig(url, anonKey) {
    if (!url || !anonKey) {
      throw new Error('URL dan Anon Key Supabase tidak boleh kosong.');
    }
    const cleanUrl = url.trim().replace(/\/+$/, '');
    const cleanKey = anonKey.trim();
    localStorage.setItem('thermalpos_supabase_config', JSON.stringify({
      url: cleanUrl,
      anonKey: cleanKey
    }));
    this.init();
  }

  resetConfig() {
    localStorage.removeItem('thermalpos_supabase_config');
    this.init();
  }

  init() {
    const config = this.getConfig();
    if (window.supabase && config.url && config.anonKey) {
      try {
        this.client = window.supabase.createClient(config.url, config.anonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        });
        this.setupAuthListener();
      } catch (err) {
        console.error('Inisialisasi Supabase gagal:', err);
      }
    }
  }

  setupAuthListener() {
    if (!this.client) return;
    this.client.auth.onAuthStateChange((event, session) => {
      this.currentUser = session ? session.user : null;
      this.updateUIState();
      if (event === 'SIGNED_IN' && session?.user) {
        // Auto-fill cashier name if present in user metadata
        const cashierInput = document.getElementById('tx-cashier');
        const userMetaName = session.user.user_metadata?.full_name || session.user.user_metadata?.cashier_name;
        if (cashierInput && userMetaName && (!cashierInput.value || cashierInput.value === 'pagi' || cashierInput.value === 'Kasir 01')) {
          cashierInput.value = userMetaName;
          if (typeof window.updateCalculation === 'function') {
            window.updateCalculation();
          }
        }
      }
    });
  }

  async checkInitialSession() {
    if (!this.client) return null;
    try {
      const { data: { session }, error } = await this.client.auth.getSession();
      if (error) throw error;
      this.currentUser = session ? session.user : null;
      this.updateUIState();
      return this.currentUser;
    } catch (err) {
      console.warn('Gagal memuat sesi Supabase awal:', err.message);
      this.currentUser = null;
      this.updateUIState();
      return null;
    }
  }

  async login(email, password) {
    if (!this.client) {
      throw new Error('Koneksi Supabase belum terkonfigurasi dengan benar.');
    }
    if (!email || !password) {
      throw new Error('Email dan kata sandi wajib diisi.');
    }

    const { data, error } = await this.client.auth.signInWithPassword({
      email: email.trim(),
      password: password
    });

    if (error) {
      // Map error to human-friendly Indonesian messages
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('Email atau kata sandi yang Anda masukkan salah.');
      }
      if (error.message.includes('Email not confirmed')) {
        throw new Error('Email belum dikonfirmasi. Silakan periksa kotak masuk email Anda.');
      }
      throw new Error(error.message);
    }

    this.currentUser = data.user;
    this.updateUIState();
    return data;
  }

  async register(email, password, fullName = '') {
    if (!this.client) {
      throw new Error('Koneksi Supabase belum terkonfigurasi dengan benar.');
    }
    if (!email || !password) {
      throw new Error('Email dan kata sandi wajib diisi.');
    }
    if (password.length < 6) {
      throw new Error('Kata sandi minimal terdiri dari 6 karakter.');
    }

    const { data, error } = await this.client.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        data: {
          full_name: fullName.trim() || 'Kasir',
          cashier_name: fullName.trim() || 'Kasir'
        }
      }
    });

    if (error) {
      if (error.message.includes('User already registered')) {
        throw new Error('Email ini sudah terdaftar. Silakan gunakan menu Masuk.');
      }
      throw new Error(error.message);
    }

    this.currentUser = data.user;
    this.updateUIState();
    return data;
  }

  async logout() {
    if (!this.client) return;
    try {
      const { error } = await this.client.auth.signOut();
      if (error) throw error;
    } catch (err) {
      console.warn('Logout error:', err);
    } finally {
      this.currentUser = null;
      this.updateUIState();
    }
  }

  async resetPassword(email) {
    if (!this.client) {
      throw new Error('Koneksi Supabase belum terkonfigurasi.');
    }
    if (!email) {
      throw new Error('Silakan masukkan email Anda untuk reset kata sandi.');
    }
    const { data, error } = await this.client.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: window.location.origin
    });
    if (error) throw new Error(error.message);
    return data;
  }

  updateUIState() {
    const authBtn = document.getElementById('btn-auth-action');
    const userBadge = document.getElementById('auth-user-badge');
    const userEmailSpan = document.getElementById('auth-user-email');

    if (!authBtn) return;

    if (this.currentUser) {
      const email = this.currentUser.email || 'Pengguna';
      const displayName = this.currentUser.user_metadata?.full_name || email.split('@')[0];
      
      if (userBadge) {
        userBadge.style.display = 'inline-flex';
      }
      if (userEmailSpan) {
        userEmailSpan.textContent = displayName;
        userEmailSpan.title = email;
      }
      
      authBtn.innerHTML = '<span>🚪</span> Keluar';
      authBtn.classList.remove('btn-primary');
      authBtn.classList.add('btn-outline');
      authBtn.setAttribute('aria-label', `Keluar dari akun ${email}`);
    } else {
      if (userBadge) {
        userBadge.style.display = 'none';
      }
      authBtn.innerHTML = '<span>🔒</span> Masuk / Akun';
      authBtn.classList.remove('btn-outline');
      authBtn.classList.add('btn-primary');
      authBtn.setAttribute('aria-label', 'Buka menu masuk atau pendaftaran');
    }
  }

  // Save transaction to cloud Supabase table if available
  async syncTransactionToCloud(txData) {
    if (!this.client || !this.currentUser) return { synced: false, reason: 'unauthenticated' };
    try {
      const { error } = await this.client
        .from('pos_transactions')
        .insert([{
          user_id: this.currentUser.id,
          tx_no: txData.txNo,
          tx_date: txData.date || null,
          tx_time: txData.time || null,
          cashier: txData.cashier || null,
          sales: txData.sales || null,
          customer: txData.customer || null,
          grand_total: txData.grandTotal || 0,
          items_json: txData.items || [],
          created_at: new Date().toISOString()
        }]);

      if (error) {
        console.warn('Cloud sync note (tabel pos_transactions mungkin belum dibuat):', error.message);
        return { synced: false, reason: error.message };
      }
      return { synced: true };
    } catch (e) {
      console.warn('Gagal sinkronisasi transaksi ke cloud:', e);
      return { synced: false, reason: e.message };
    }
  }
}

window.SupabaseAuth = new SupabaseAuthService();
