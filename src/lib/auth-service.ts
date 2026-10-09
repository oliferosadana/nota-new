import { supabase } from './supabase';

export interface UserProfile {
  id: string;
  email?: string;
  fullName?: string;
  storeName?: string;
}

export class AuthService {
  private currentUser: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  async init() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      this.currentUser = session?.user || null;
      this.updateUIState();

      supabase.auth.onAuthStateChange((_event, session) => {
        this.currentUser = session?.user || null;
        this.updateUIState();
      });
    } catch (err) {
      console.warn('Supabase session init warning:', err);
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  async getAuthToken(): Promise<string> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session?.access_token || '';
    } catch (e) {
      return '';
    }
  }

  async login(email: string, password: string) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Gagal masuk akun.');
    }

    if (data.session) {
      await supabase.auth.setSession(data.session);
    }
    this.currentUser = data.user;
    this.updateUIState();
    return data;
  }

  async register(email: string, password: string, fullName: string, storeName: string) {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, fullName, storeName })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Pendaftaran gagal.');
    }

    if (data.session) {
      await supabase.auth.setSession(data.session);
    }
    this.currentUser = data.user;
    this.updateUIState();
    return data;
  }

  async logout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Logout warning:', err);
    } finally {
      this.currentUser = null;
      this.updateUIState();
    }
  }

  updateUIState() {
    if (typeof document === 'undefined') return;

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

      authBtn.innerHTML = '<span aria-hidden="true">🚪</span> Keluar';
      authBtn.classList.remove('btn-primary');
      authBtn.classList.add('btn-outline');
      authBtn.setAttribute('aria-label', `Keluar dari akun ${email}`);
    } else {
      if (userBadge) {
        userBadge.style.display = 'none';
      }
      authBtn.innerHTML = '<span aria-hidden="true">🔒</span> Masuk / Akun';
      authBtn.classList.remove('btn-outline');
      authBtn.classList.add('btn-primary');
      authBtn.setAttribute('aria-label', 'Buka menu masuk atau pendaftaran');
    }
  }

  // Database: Store Settings
  async getStoreSettings() {
    const token = await this.getAuthToken();
    if (!token) return null;
    try {
      const res = await fetch('/api/store', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      return data.store;
    } catch (e) {
      console.warn('Get store settings error:', e);
      return null;
    }
  }

  async saveStoreSettings(storeData: any) {
    const token = await this.getAuthToken();
    if (!token) throw new Error('Harap login terlebih dahulu.');

    const res = await fetch('/api/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(storeData)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Gagal menyimpan data toko.');
    return data.store;
  }

  // Database: Products / Inventory
  async getProducts() {
    const token = await this.getAuthToken();
    try {
      const res = await fetch('/api/products', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      return data.products || [];
    } catch (e) {
      console.warn('Get products error:', e);
      return [];
    }
  }

  async addProduct(productData: { name: string; price: number; unit?: string; category?: string }) {
    const token = await this.getAuthToken();
    if (!token) throw new Error('Harap login terlebih dahulu.');

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Gagal menambahkan produk.');
    return data.product;
  }

  async deleteProduct(productId: string) {
    const token = await this.getAuthToken();
    if (!token) throw new Error('Harap login terlebih dahulu.');

    const res = await fetch(`/api/products?id=${productId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Gagal menghapus produk.');
    return true;
  }

  // Database: Business Templates
  async getTemplates() {
    try {
      const res = await fetch('/api/templates');
      const data = await res.json();
      return data.templates || [];
    } catch (e) {
      console.warn('Get templates error:', e);
      return [];
    }
  }

  // Database: Transactions
  async getTransactions() {
    const token = await this.getAuthToken();
    if (!token) return [];
    try {
      const res = await fetch('/api/transactions', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      return data.transactions || [];
    } catch (e) {
      return [];
    }
  }

  async syncTransaction(txData: any) {
    if (!this.currentUser) return { synced: false, offline: true };

    try {
      const token = await this.getAuthToken();

      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          receipt_no: txData.txNo,
          date_time: `${txData.date}T${txData.time}:00`,
          store_name: txData.storeName,
          customer_name: txData.customer,
          cashier_name: txData.cashier,
          items: txData.items,
          total_amount: txData.grandTotal,
          payment_type: txData.paymentMethod,
          payment_amount: txData.payAmount,
          change_amount: txData.change
        })
      });

      return await res.json();
    } catch (err: any) {
      console.warn('Sync transaction to server failed:', err);
      return { synced: false, error: err.message };
    }
  }
}

export const authService = new AuthService();
