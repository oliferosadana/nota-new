import { BarcodeEngine, QRCodeEngine } from '../lib/barcode-qr.js';
import { EscPosBuilder, ThermalPrinterDevice } from '../lib/escpos.js';
import { authService } from '../lib/auth-service';

// Castle / Benteng SVG Logo for Benthenk Komputer (Halftone / Dithered Texture)
export const BENTHENK_LOGO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" width="85" height="85">
  <defs>
    <pattern id="dither" width="3" height="3" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="0.85" fill="%23111"/>
    </pattern>
    <pattern id="dense-dither" width="2" height="2" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="0.65" fill="%23111"/>
    </pattern>
  </defs>
  <circle cx="70" cy="70" r="65" fill="none" stroke="%23111" stroke-width="2.5"/>
  <circle cx="70" cy="70" r="60" fill="url(%23dither)" stroke="%23111" stroke-width="1.5"/>
  <circle cx="70" cy="70" r="48" fill="%23ffffff" stroke="%23111" stroke-width="1.5"/>
  <ellipse cx="70" cy="100" rx="42" ry="18" fill="%23111"/>
  <ellipse cx="70" cy="98" rx="40" ry="16" fill="url(%23dense-dither)"/>
  <path d="M42 96 L42 56 L47 56 L47 48 L52 48 L52 54 L55 54 L55 48 L60 48 L60 56 L64 56 L64 38 L68 38 L68 44 L72 44 L72 38 L76 38 L76 56 L80 56 L80 48 L85 48 L85 54 L88 54 L88 48 L93 48 L93 56 L98 56 L98 96 Z" fill="%23111"/>
  <line x1="70" y1="38" x2="70" y2="28" stroke="%23111" stroke-width="1.5"/>
  <polygon points="70,28 78,32 70,36" fill="%23111"/>
  <path d="M64 96 L64 78 C64 74 76 74 76 78 L76 96 Z" fill="%23ffffff"/>
  <rect x="50" y="64" width="6" height="10" rx="2" fill="%23ffffff"/>
  <rect x="84" y="64" width="6" height="10" rx="2" fill="%23ffffff"/>
  <rect x="67" y="52" width="6" height="9" rx="2" fill="%23ffffff"/>
</svg>`;

// Preset Templates
export const PRESETS: Record<string, any> = {
  benthenk: {
    storeName: "UD BENTHENK KOMPUTER",
    tagline: "",
    address: "Komp Balikpapan Baru Blok C No.6",
    phone: "Telp: 085251822145 | 087886935070",
    txNo: "INV/2026/09/0839",
    date: "2026-09-30",
    time: "05:13",
    cashier: "pagi",
    sales: "wiwik",
    customer: "",
    paymentMethod: "QRIS",
    payAmount: 900000,
    footer: "Barang yang sudah dibeli tidak dapat ditukar\natau dikembalikan\nTerima Kasih\nWA Admin : 085251822145",
    wifi: "",
    qr: "",
    showLogo: true,
    logoUrl: "/img/ben.jpeg",
    showBarcode: false,
    showQrcode: false,
    items: [
      { name: "MEM VENOM RX DDR4 8GB/2666", qty: 1, unit: "pcs", price: 900000 }
    ],
    catalog: [
      { name: "MEM VENOM RX DDR4 8GB/2666", unit: "pcs", price: 900000 },
      { name: "SSD NVMe 512GB PCIe Gen3", unit: "pcs", price: 420000 },
      { name: "SSD SATA 2.5 256GB", unit: "pcs", price: 235000 },
      { name: "RAM DDR4 8GB 3200MHz", unit: "pcs", price: 280000 },
      { name: "Flashdisk SanDisk 32GB 3.0", unit: "pcs", price: 65000 },
      { name: "Mouse Wireless Silent", unit: "pcs", price: 85000 },
      { name: "Keyboard Mechanical RGB", unit: "pcs", price: 275000 },
      { name: "Kabel HDMI 2.0 4K 1.5M", unit: "pcs", price: 35000 },
      { name: "Thermal Paste Arctic MX-4", unit: "pcs", price: 75000 },
      { name: "Jasa Install Ulang + Software", unit: "unit", price: 100000 }
    ]
  },
  cafe: {
    storeName: "KOPI SENJA UTAMA",
    tagline: "Artisan Coffee & Eatery",
    address: "Jl. Pahlawan No. 12, Balikpapan",
    phone: "WA: 0821-9876-5432",
    txNo: "INV/2026/10/0102",
    date: "2026-10-07",
    time: "20:30",
    cashier: "Dimas (Barista)",
    sales: "Rian",
    customer: "Meja 07 (Dine-in)",
    paymentMethod: "TUNAI",
    payAmount: 100000,
    footer: "Follow IG: @kopisenjautama\nFree Wi-Fi & Cozy Workspace",
    wifi: "WiFi: KopiSenja-5G | Pass: ngopidulu",
    qr: "https://instagram.com/kopisenjautama",
    showLogo: false,
    logoUrl: null,
    showBarcode: true,
    showQrcode: true,
    items: [
      { name: "Kopi Susu Senja Gula Aren", qty: 2, unit: "cup", price: 22000 },
      { name: "Caramel Macchiato Ice", qty: 1, unit: "cup", price: 32000 },
      { name: "Almond Butter Croissant", qty: 1, unit: "pcs", price: 28000 }
    ],
    catalog: [
      { name: "Espresso Single", unit: "cup", price: 15000 },
      { name: "Americano Ice", unit: "cup", price: 20000 },
      { name: "Kopi Susu Gula Aren", unit: "cup", price: 22000 },
      { name: "Cafe Latte", unit: "cup", price: 28000 },
      { name: "Caramel Macchiato", unit: "cup", price: 32000 },
      { name: "Matcha Latte Ice", unit: "cup", price: 30000 },
      { name: "Croissant Almond", unit: "pcs", price: 28000 },
      { name: "French Fries BBQ", unit: "pax", price: 25000 }
    ]
  },
  resto: {
    storeName: "AMANDA BROWNIES KUKUS",
    tagline: "Lezat & Lembut Khas Bandung",
    address: "Jl. Lambung Mangkurat No. 45, Samarinda",
    phone: "Telp: 0812-3456-7890",
    txNo: "INV/2026/10/0554",
    date: "2026-10-07",
    time: "19:15",
    cashier: "Rina (Kasir 01)",
    sales: "Diah",
    customer: "Bpk. Hendra (Takeaway)",
    paymentMethod: "DEBIT",
    payAmount: 160000,
    footer: "Terima kasih atas kunjungan Anda!\nKunjungi www.amandabrownies.co.id",
    wifi: "WiFi: Amanda-Guest | Pass: brownieslezat",
    qr: "https://amandabrownies.co.id",
    showLogo: false,
    logoUrl: null,
    showBarcode: true,
    showQrcode: false,
    items: [
      { name: "Brownies Original Kukus", qty: 2, unit: "box", price: 48000 },
      { name: "Brownies Cheese Cream", qty: 1, unit: "box", price: 55000 },
      { name: "Paperbag Amanda", qty: 1, unit: "pcs", price: 3000 }
    ],
    catalog: [
      { name: "Brownies Original", unit: "box", price: 48000 },
      { name: "Brownies Cheese Cream", unit: "box", price: 55000 },
      { name: "Brownies Choco Marble", unit: "box", price: 52000 },
      { name: "Brownies Tiramisu", unit: "box", price: 53000 },
      { name: "Bolen Pisang Keju", unit: "box", price: 45000 },
      { name: "Keripik Brownies", unit: "pouch", price: 18000 }
    ]
  },
  retail: {
    storeName: "MINIMARKET BERKAH JAYA",
    tagline: "Lengkap, Hemat & Bersahabat",
    address: "Ruko Sentra Niaga Blok B-12",
    phone: "Telp: 0542-876543",
    txNo: "TRX-202610-8821",
    date: "2026-10-07",
    time: "14:22",
    cashier: "Siti Rahma",
    sales: "Andi",
    customer: "Member #8812 (Ibu Dewi)",
    paymentMethod: "TUNAI",
    payAmount: 150000,
    footer: "Simpan struk ini sebagai bukti pembayaran yang sah.\nBarang diskon tidak dapat ditukar.",
    wifi: "",
    qr: "https://berkahjayamarket.com",
    showLogo: false,
    logoUrl: null,
    showBarcode: true,
    showQrcode: false,
    items: [
      { name: "Minyak Goreng Sania 2L", qty: 2, unit: "pch", price: 34500 },
      { name: "Gula Pasir Gulaku 1kg", qty: 3, unit: "bks", price: 17500 },
      { name: "Beras Pandan Wangi 5kg", qty: 1, unit: "sak", price: 74000 }
    ],
    catalog: [
      { name: "Minyak Goreng 2L", unit: "pch", price: 34500 },
      { name: "Beras Ramos 5kg", unit: "sak", price: 72000 },
      { name: "Gula Pasir 1kg", unit: "bks", price: 17500 },
      { name: "Telur Ayam 1kg", unit: "kg", price: 29000 },
      { name: "Mie Goreng Spesial", unit: "bks", price: 3100 },
      { name: "Susu UHT Full Cream 1L", unit: "kotak", price: 19500 }
    ]
  },
  laundry: {
    storeName: "FRESH CLEAN LAUNDRY",
    tagline: "Wangi, Bersih, Rapi & Higienis",
    address: "Jl. Ruhui Rahayu No. 88, Ringroad",
    phone: "WA Antar Jemput: 0813-4455-6677",
    txNo: "LD-202610-0441",
    date: "2026-10-07",
    time: "11:45",
    cashier: "Faisal",
    sales: "Kasir 02",
    customer: "Ibu Anita (0812-9988-7766)",
    paymentMethod: "TRANSFER",
    payAmount: 65000,
    footer: "Pengambilan wajib membawa nota ini.\nKomplain maksimal 1x24 jam setelah serah terima.",
    wifi: "",
    qr: "https://wa.me/6281344556677",
    showLogo: false,
    logoUrl: null,
    showBarcode: true,
    showQrcode: true,
    items: [
      { name: "Cuci Komplit Express 1 Hari", qty: 4.5, unit: "kg", price: 10000 },
      { name: "Cuci Bedcover King Size", qty: 1, unit: "pcs", price: 20000 }
    ],
    catalog: [
      { name: "Cuci Komplit Reguler", unit: "kg", price: 7000 },
      { name: "Cuci Komplit Express", unit: "kg", price: 10000 },
      { name: "Cuci Kering Lipat", unit: "kg", price: 5000 },
      { name: "Setrika Saja", unit: "kg", price: 5000 },
      { name: "Bedcover Sedang", unit: "pcs", price: 15000 },
      { name: "Bedcover King", unit: "pcs", price: 20000 }
    ]
  },
  service: {
    storeName: "AUTO SERVICE & PART",
    tagline: "Bengkel Resmi & Tune-Up Mobil/Motor",
    address: "Jl. MT Haryono No. 102",
    phone: "Telp: 0542-765432 | 0811-5544-3322",
    txNo: "WO-2026-9901",
    date: "2026-10-07",
    time: "16:05",
    cashier: "Hadi (Front Desk)",
    sales: "Mekanik: Doni",
    customer: "Bpk. Budi - KT 1234 AB",
    paymentMethod: "DEBIT",
    payAmount: 485000,
    footer: "Garansi servis 7 hari kerja.\nTerima kasih telah mempercayakan kendaraan Anda.",
    wifi: "WiFi: AutoGuest | Pass: serviscepat",
    qr: "https://autoservice.co.id",
    showLogo: false,
    logoUrl: null,
    showBarcode: true,
    showQrcode: false,
    items: [
      { name: "Oli Mesin Fully Synthetic 4L", qty: 1, unit: "galon", price: 320000 },
      { name: "Filter Oli Original", qty: 1, unit: "pcs", price: 45000 },
      { name: "Jasa Tune-Up & Ganti Oli", qty: 1, unit: "paket", price: 120000 }
    ],
    catalog: [
      { name: "Oli Mesin 4L", unit: "galon", price: 320000 },
      { name: "Filter Oli", unit: "pcs", price: 45000 },
      { name: "Jasa Tune-Up", unit: "paket", price: 120000 },
      { name: "Kampas Rem Depan", unit: "set", price: 185000 },
      { name: "Spooring & Balancing", unit: "paket", price: 150000 }
    ]
  }
};

export const state = {
  activeTemplate: 'benthenk',
  paperSize: '58mm',
  uploadedLogo: null as string | null,
  items: [] as any[],
  dbProducts: [] as any[],
  history: [] as any[]
};

export function formatRp(num: number): string {
  return Number(num || 0).toLocaleString('id-ID');
}

export function showToast(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
  const container = document.getElementById('toastContainer') || document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

export function generateTxNo(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = String(Math.floor(1000 + Math.random() * 9000));
  return `INV/${year}/${month}/${random}`;
}

export function updateReceipt() {
  const storeNameInput = document.getElementById('store-name') as HTMLInputElement;
  const storeTaglineInput = document.getElementById('store-tagline') as HTMLInputElement;
  const storeAddressInput = document.getElementById('store-address') as HTMLInputElement;
  const storePhoneInput = document.getElementById('store-phone') as HTMLInputElement;
  const txNoInput = document.getElementById('tx-no') as HTMLInputElement;
  const txDateInput = document.getElementById('tx-date') as HTMLInputElement;
  const txTimeInput = document.getElementById('tx-time') as HTMLInputElement;
  const txCashierInput = document.getElementById('tx-cashier') as HTMLInputElement;
  const txSalesInput = document.getElementById('tx-sales') as HTMLInputElement;
  const txCustomerInput = document.getElementById('tx-customer') as HTMLInputElement;
  const calcDiscountInput = document.getElementById('calc-discount') as HTMLInputElement;
  const calcTaxInput = document.getElementById('calc-tax') as HTMLInputElement;
  const calcServiceInput = document.getElementById('calc-service') as HTMLInputElement;
  const calcServiceLabelInput = document.getElementById('calc-service-label') as HTMLInputElement;
  const paymentMethodInput = document.getElementById('payment-method') as HTMLSelectElement;
  const payAmountInput = document.getElementById('pay-amount') as HTMLInputElement;
  const footerNoteInput = document.getElementById('footer-note') as HTMLTextAreaElement;
  const wifiInfoInput = document.getElementById('wifi-info') as HTMLInputElement;
  const qrTextInput = document.getElementById('qr-text') as HTMLInputElement;
  const showBarcodeCheck = document.getElementById('show-barcode') as HTMLInputElement;
  const showQrcodeCheck = document.getElementById('show-qrcode') as HTMLInputElement;

  if (!storeNameInput) return;

  const tLogo = document.getElementById('t-logo') as HTMLImageElement;
  const tStoreName = document.getElementById('t-store-name');
  const tStoreTagline = document.getElementById('t-store-tagline');
  const tStoreAddress = document.getElementById('t-store-address');
  const tStorePhone = document.getElementById('t-store-phone');
  const tTxNo = document.getElementById('t-tx-no');
  const tTxDate = document.getElementById('t-tx-date');
  const tTxTime = document.getElementById('t-tx-time');
  const tTxCashier = document.getElementById('t-tx-cashier');
  const tTxSales = document.getElementById('t-tx-sales');
  const tTxCashierRow = document.getElementById('t-tx-cashier-row');
  const tTxSalesRow = document.getElementById('t-tx-sales-row');
  const tCustomerRow = document.getElementById('t-customer-row');
  const tTxCustomer = document.getElementById('t-tx-customer');
  const tItemsContainer = document.getElementById('t-items-container');
  const tSumSubtotal = document.getElementById('t-sum-subtotal');
  const tSumDiscount = document.getElementById('t-sum-discount');
  const tRowDiscount = document.getElementById('t-row-discount');
  const tSumTax = document.getElementById('t-sum-tax');
  const tRowTax = document.getElementById('t-row-tax');
  const tSumService = document.getElementById('t-sum-service');
  const tSumServiceLabel = document.getElementById('t-sum-service-label');
  const tRowService = document.getElementById('t-row-service');
  const tSumGrandtotal = document.getElementById('t-sum-grandtotal');
  const tPayMethod = document.getElementById('t-pay-method');
  const tPayAmount = document.getElementById('t-pay-amount');
  const tSumChange = document.getElementById('t-sum-change');
  const tRowChange = document.getElementById('t-row-change');
  const tFooterText = document.getElementById('t-footer-text');
  const tWifiText = document.getElementById('t-wifi-text');
  const tBarcodeContainer = document.getElementById('t-barcode-container');
  const tQrcodeContainer = document.getElementById('t-qrcode-container');

  const sumSubtotalEl = document.getElementById('sum-subtotal');
  const sumDiscountEl = document.getElementById('sum-discount');
  const sumRowDiscountEl = document.getElementById('sum-row-discount');
  const sumTaxEl = document.getElementById('sum-tax');
  const sumRowTaxEl = document.getElementById('sum-row-tax');
  const sumServiceEl = document.getElementById('sum-service');
  const sumServiceLabelEl = document.getElementById('sum-service-label');
  const sumRowServiceEl = document.getElementById('sum-row-service');
  const sumGrandtotalEl = document.getElementById('sum-grandtotal');
  const sumChangeEl = document.getElementById('sum-change');

  if (tLogo) {
    if (state.uploadedLogo) {
      tLogo.src = state.uploadedLogo;
      tLogo.style.display = 'block';
    } else if (state.activeTemplate === 'benthenk') {
      const presetLogo = PRESETS.benthenk.logoUrl;
      tLogo.src = presetLogo || BENTHENK_LOGO_SVG;
      tLogo.style.display = 'block';
    } else {
      tLogo.style.display = 'none';
    }
  }

  if (tStoreName) tStoreName.textContent = storeNameInput.value.trim() || 'STRUK PEMBAYARAN';
  if (tStoreTagline) {
    tStoreTagline.textContent = storeTaglineInput.value.trim();
    tStoreTagline.style.display = storeTaglineInput.value.trim() ? 'block' : 'none';
  }
  if (tStoreAddress) {
    tStoreAddress.textContent = storeAddressInput.value.trim();
    tStoreAddress.style.display = storeAddressInput.value.trim() ? 'block' : 'none';
  }
  if (tStorePhone) {
    tStorePhone.textContent = storePhoneInput.value.trim();
    tStorePhone.style.display = storePhoneInput.value.trim() ? 'block' : 'none';
  }

  if (tTxNo) tTxNo.textContent = txNoInput.value.trim();
  if (tTxDate) tTxDate.textContent = txDateInput.value.trim();
  if (tTxTime) tTxTime.textContent = txTimeInput.value.trim();

  if (tTxCashier) tTxCashier.textContent = txCashierInput.value.trim();
  if (tTxCashierRow) tTxCashierRow.style.display = txCashierInput.value.trim() ? 'inline' : 'none';

  if (tTxSales) tTxSales.textContent = txSalesInput.value.trim();
  if (tTxSalesRow) tTxSalesRow.style.display = txSalesInput.value.trim() ? 'inline' : 'none';

  if (tCustomerRow && tTxCustomer) {
    if (txCustomerInput.value.trim()) {
      tTxCustomer.textContent = txCustomerInput.value.trim();
      tCustomerRow.style.display = 'grid';
    } else {
      tCustomerRow.style.display = 'none';
    }
  }

  let subtotal = 0;
  if (tItemsContainer) {
    tItemsContainer.innerHTML = '';
    state.items.forEach(item => {
      const itemTotal = Number(item.qty || 0) * Number(item.price || 0);
      subtotal += itemTotal;

      const itemDiv = document.createElement('div');
      itemDiv.className = 't-item';
      itemDiv.innerHTML = `
        <div class="t-item-name">${item.name}</div>
        <div class="t-item-calc">
          <span>${item.qty} ${item.unit || 'pcs'} x ${formatRp(item.price)}</span>
          <span class="t-item-total">${formatRp(itemTotal)}</span>
        </div>
      `;
      tItemsContainer.appendChild(itemDiv);
    });
  }

  const discount = Math.max(0, Number(calcDiscountInput.value) || 0);
  const taxPct = Math.max(0, Number(calcTaxInput.value) || 0);
  const serviceAmount = Math.max(0, Number(calcServiceInput.value) || 0);
  const serviceLabel = calcServiceLabelInput.value.trim() || 'Layanan';

  const afterDiscount = Math.max(0, subtotal - discount);
  const taxAmount = Math.round((afterDiscount * taxPct) / 100);
  const grandTotal = afterDiscount + taxAmount + serviceAmount;
  const payAmount = Number(payAmountInput.value) || 0;
  const change = Math.max(0, payAmount - grandTotal);
  const paymentMethod = paymentMethodInput.value;

  if (sumSubtotalEl) sumSubtotalEl.textContent = `Rp ${formatRp(subtotal)}`;
  if (sumDiscountEl && sumRowDiscountEl) {
    sumDiscountEl.textContent = `- Rp ${formatRp(discount)}`;
    sumRowDiscountEl.style.display = discount > 0 ? 'flex' : 'none';
  }
  if (sumTaxEl && sumRowTaxEl) {
    sumTaxEl.textContent = `+ Rp ${formatRp(taxAmount)} (${taxPct}%)`;
    sumRowTaxEl.style.display = taxPct > 0 ? 'flex' : 'none';
  }
  if (sumServiceEl && sumRowServiceEl && sumServiceLabelEl) {
    sumServiceLabelEl.textContent = `${serviceLabel}:`;
    sumServiceEl.textContent = `+ Rp ${formatRp(serviceAmount)}`;
    sumRowServiceEl.style.display = serviceAmount > 0 ? 'flex' : 'none';
  }
  if (sumGrandtotalEl) sumGrandtotalEl.textContent = `Rp ${formatRp(grandTotal)}`;
  if (sumChangeEl) sumChangeEl.textContent = `Rp ${formatRp(change)}`;

  if (tSumSubtotal) tSumSubtotal.textContent = formatRp(subtotal);
  if (tSumDiscount && tRowDiscount) {
    tSumDiscount.textContent = `- ${formatRp(discount)}`;
    tRowDiscount.style.display = discount > 0 ? 'flex' : 'none';
  }
  if (tSumTax && tRowTax) {
    tSumTax.textContent = `+ ${formatRp(taxAmount)}`;
    tRowTax.style.display = taxPct > 0 ? 'flex' : 'none';
  }
  if (tSumService && tRowService && tSumServiceLabel) {
    tSumServiceLabel.textContent = serviceLabel;
    tSumService.textContent = `+ ${formatRp(serviceAmount)}`;
    tRowService.style.display = serviceAmount > 0 ? 'flex' : 'none';
  }
  if (tSumGrandtotal) tSumGrandtotal.textContent = formatRp(grandTotal);

  if (tPayMethod) tPayMethod.textContent = paymentMethod;
  if (tPayAmount) tPayAmount.textContent = formatRp(payAmount);

  if (tRowChange && tSumChange) {
    tSumChange.textContent = formatRp(change);
    tRowChange.style.display = paymentMethod === 'TUNAI' ? 'flex' : 'none';
  }

  if (tFooterText) {
    tFooterText.textContent = footerNoteInput.value;
    tFooterText.style.display = footerNoteInput.value.trim() ? 'block' : 'none';
  }
  if (tWifiText) {
    tWifiText.textContent = wifiInfoInput.value.trim();
    tWifiText.style.display = wifiInfoInput.value.trim() ? 'block' : 'none';
  }

  if (tBarcodeContainer) {
    if (showBarcodeCheck.checked && txNoInput.value.trim()) {
      tBarcodeContainer.innerHTML = BarcodeEngine.renderSVG(txNoInput.value.trim(), state.paperSize === '80mm' ? 260 : 200, 42);
      tBarcodeContainer.style.display = 'block';
    } else {
      tBarcodeContainer.style.display = 'none';
    }
  }

  if (tQrcodeContainer) {
    if (showQrcodeCheck.checked && qrTextInput.value.trim()) {
      tQrcodeContainer.innerHTML = QRCodeEngine.generateSVG(qrTextInput.value.trim(), 90);
      tQrcodeContainer.style.display = 'block';
    } else {
      tQrcodeContainer.style.display = 'none';
    }
  }
}

export function renderFormItems() {
  const tbody = document.getElementById('items-tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  state.items.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <input type="text" class="item-input-name" data-index="${index}" value="${item.name}" placeholder="Nama barang...">
      </td>
      <td>
        <input type="number" class="item-input-qty" data-index="${index}" value="${item.qty}" min="0.1" step="any" style="text-align:center;">
      </td>
      <td>
        <input type="number" class="item-input-price" data-index="${index}" value="${item.price}" min="0" step="500">
      </td>
      <td style="font-weight: 600; text-align: right; white-space: nowrap;">
        ${formatRp(item.qty * item.price)}
      </td>
      <td style="text-align: center;">
        <button type="button" class="btn-del-item" data-index="${index}" title="Hapus item">✕</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('.item-input-name').forEach(el => {
    el.addEventListener('input', (e: any) => {
      const idx = Number(e.target.dataset.index);
      state.items[idx].name = e.target.value;
      updateReceipt();
    });
  });

  tbody.querySelectorAll('.item-input-qty').forEach(el => {
    el.addEventListener('input', (e: any) => {
      const idx = Number(e.target.dataset.index);
      state.items[idx].qty = Number(e.target.value) || 0;
      renderFormItems();
      updateReceipt();
    });
  });

  tbody.querySelectorAll('.item-input-price').forEach(el => {
    el.addEventListener('input', (e: any) => {
      const idx = Number(e.target.dataset.index);
      state.items[idx].price = Number(e.target.value) || 0;
      renderFormItems();
      updateReceipt();
    });
  });

  tbody.querySelectorAll('.btn-del-item').forEach(el => {
    el.addEventListener('click', (e: any) => {
      const idx = Number(e.target.dataset.index);
      state.items.splice(idx, 1);
      renderFormItems();
      updateReceipt();
    });
  });
}

export function loadTemplate(templateKey: string) {
  const preset = PRESETS[templateKey];
  if (!preset) return;

  state.activeTemplate = templateKey;
  state.uploadedLogo = null;
  state.items = JSON.parse(JSON.stringify(preset.items));

  (document.getElementById('store-name') as HTMLInputElement).value = preset.storeName;
  (document.getElementById('store-tagline') as HTMLInputElement).value = preset.tagline;
  (document.getElementById('store-address') as HTMLInputElement).value = preset.address;
  (document.getElementById('store-phone') as HTMLInputElement).value = preset.phone;
  (document.getElementById('tx-no') as HTMLInputElement).value = preset.txNo;
  (document.getElementById('tx-date') as HTMLInputElement).value = preset.date;
  (document.getElementById('tx-time') as HTMLInputElement).value = preset.time;
  (document.getElementById('tx-cashier') as HTMLInputElement).value = preset.cashier;
  (document.getElementById('tx-sales') as HTMLInputElement).value = preset.sales;
  (document.getElementById('tx-customer') as HTMLInputElement).value = preset.customer;
  (document.getElementById('payment-method') as HTMLSelectElement).value = preset.paymentMethod;
  (document.getElementById('pay-amount') as HTMLInputElement).value = preset.payAmount;
  (document.getElementById('footer-note') as HTMLTextAreaElement).value = preset.footer;
  (document.getElementById('wifi-info') as HTMLInputElement).value = preset.wifi;
  (document.getElementById('qr-text') as HTMLInputElement).value = preset.qr;
  (document.getElementById('show-barcode') as HTMLInputElement).checked = preset.showBarcode;
  (document.getElementById('show-qrcode') as HTMLInputElement).checked = preset.showQrcode;

  document.querySelectorAll('.template-pill[data-template]').forEach(btn => {
    if (btn.getAttribute('data-template') === templateKey) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderFormItems();
  updateReceipt();
  renderCatalogModal();
}

// Render Quick Catalog Items (Merging Database Products & Active Template)
export async function renderCatalogModal() {
  const container = document.getElementById('catalog-grid-items');
  if (!container) return;

  container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-size: 0.8rem; padding: 10px;">Memuat produk dari database...</div>';

  const preset = PRESETS[state.activeTemplate] || PRESETS.benthenk;
  
  // Combine preset catalog with custom database products
  let allCatalog: any[] = [];
  if (state.dbProducts && state.dbProducts.length > 0) {
    allCatalog = [...state.dbProducts, ...preset.catalog.filter((c: any) => !state.dbProducts.some(p => p.name.toLowerCase() === c.name.toLowerCase()))];
  } else {
    allCatalog = preset.catalog;
  }

  container.innerHTML = '';

  allCatalog.forEach((catItem: any) => {
    const card = document.createElement('div');
    card.className = 'catalog-card';
    card.style.cssText = 'background: rgba(255,255,255,0.04); border: 1px solid var(--bg-card-border); border-radius: var(--radius-sm); padding: 10px; cursor: pointer; transition: all 0.2s; position: relative;';
    
    card.innerHTML = `
      <div style="font-weight: 600; font-size: 0.82rem; color: #fff; margin-bottom: 4px;">${catItem.name}</div>
      <div style="font-size: 0.78rem; font-weight: 700; color: #34d399;">Rp ${formatRp(catItem.price)} <span style="font-size: 0.68rem; color: var(--text-dim); font-weight: 400;">/ ${catItem.unit || 'pcs'}</span></div>
      ${catItem.id ? `<button type="button" class="btn-del-prod" data-id="${catItem.id}" title="Hapus dari database" style="position: absolute; top: 6px; right: 6px; background: none; border: none; color: #f87171; font-size: 11px; cursor: pointer;">✕</button>` : ''}
    `;

    card.addEventListener('click', (e: any) => {
      if (e.target.classList.contains('btn-del-prod')) return;
      const existing = state.items.find(i => i.name.toLowerCase() === catItem.name.toLowerCase());
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({
          name: catItem.name,
          qty: 1,
          unit: catItem.unit || 'pcs',
          price: catItem.price
        });
      }
      renderFormItems();
      updateReceipt();
      showToast(`Ditambahkan ke nota: ${catItem.name}`, 'success');
    });

    // Delete product from Supabase database handler
    const delBtn = card.querySelector('.btn-del-prod');
    if (delBtn) {
      delBtn.addEventListener('click', async (e: any) => {
        e.stopPropagation();
        if (confirm(`Hapus "${catItem.name}" dari database Supabase?`)) {
          try {
            await authService.deleteProduct(catItem.id);
            state.dbProducts = state.dbProducts.filter(p => p.id !== catItem.id);
            renderCatalogModal();
            showToast('Produk dihapus dari database.', 'info');
          } catch (err: any) {
            showToast('Gagal menghapus: ' + err.message, 'error');
          }
        }
      });
    }

    container.appendChild(card);
  });
}

// Load dynamic data from Supabase
export async function loadDatabaseData() {
  try {
    // 1. Fetch store profile
    const store = await authService.getStoreSettings();
    if (store && store.store_name) {
      (document.getElementById('store-name') as HTMLInputElement).value = store.store_name || '';
      (document.getElementById('store-tagline') as HTMLInputElement).value = store.tagline || '';
      (document.getElementById('store-address') as HTMLInputElement).value = store.address || '';
      (document.getElementById('store-phone') as HTMLInputElement).value = store.phone || '';
      (document.getElementById('footer-note') as HTMLTextAreaElement).value = store.footer_note || '';
      (document.getElementById('wifi-info') as HTMLInputElement).value = store.wifi_info || '';
      (document.getElementById('qr-text') as HTMLInputElement).value = store.qr_text || '';
      (document.getElementById('show-barcode') as HTMLInputElement).checked = Boolean(store.show_barcode);
      (document.getElementById('show-qrcode') as HTMLInputElement).checked = Boolean(store.show_qrcode);
      updateReceipt();
    }

    // 2. Fetch products from database
    const products = await authService.getProducts();
    if (products && products.length > 0) {
      state.dbProducts = products;
      renderCatalogModal();
    }

    // 3. Fetch cloud transaction history
    const cloudTransactions = await authService.getTransactions();
    if (cloudTransactions && cloudTransactions.length > 0) {
      state.history = cloudTransactions.map(t => ({
        txNo: t.receipt_no,
        date: t.date_time ? t.date_time.split('T')[0] : '',
        time: t.date_time ? t.date_time.split('T')[1]?.substring(0, 5) : '',
        storeName: t.store_name,
        cashier: t.cashier_name,
        sales: t.sales_name,
        customer: t.customer_name,
        items: t.items,
        subtotal: t.subtotal,
        discount: t.discount,
        taxPct: t.tax_pct,
        serviceAmount: t.service_amount,
        grandTotal: t.total_amount,
        paymentMethod: t.payment_type,
        payAmount: t.payment_amount,
        change: t.change_amount,
        timestamp: t.created_at
      }));
    }
  } catch (err) {
    console.warn('Load database data note:', err);
  }
}

export function saveTransaction() {
  const storeName = (document.getElementById('store-name') as HTMLInputElement).value;
  const txNo = (document.getElementById('tx-no') as HTMLInputElement).value;
  const date = (document.getElementById('tx-date') as HTMLInputElement).value;
  const time = (document.getElementById('tx-time') as HTMLInputElement).value;
  const cashier = (document.getElementById('tx-cashier') as HTMLInputElement).value;
  const sales = (document.getElementById('tx-sales') as HTMLInputElement).value;
  const customer = (document.getElementById('tx-customer') as HTMLInputElement).value;
  const paymentMethod = (document.getElementById('payment-method') as HTMLSelectElement).value;
  const payAmount = Number((document.getElementById('pay-amount') as HTMLInputElement).value) || 0;

  let subtotal = 0;
  state.items.forEach(i => subtotal += (i.qty * i.price));
  const discount = Number((document.getElementById('calc-discount') as HTMLInputElement).value) || 0;
  const taxPct = Number((document.getElementById('calc-tax') as HTMLInputElement).value) || 0;
  const serviceAmount = Number((document.getElementById('calc-service') as HTMLInputElement).value) || 0;
  const grandTotal = Math.max(0, subtotal - discount) * (1 + taxPct / 100) + serviceAmount;
  const change = Math.max(0, payAmount - grandTotal);

  const record = {
    txNo,
    date,
    time,
    storeName,
    cashier,
    sales,
    customer,
    items: JSON.parse(JSON.stringify(state.items)),
    subtotal,
    discount,
    taxPct,
    serviceAmount,
    grandTotal,
    paymentMethod,
    payAmount,
    change,
    timestamp: new Date().toISOString()
  };

  state.history.unshift(record);
  if (state.history.length > 100) state.history.pop();
  try {
    localStorage.setItem('thermalpos_history', JSON.stringify(state.history));
  } catch (e) {
    console.warn('LocalStorage save warning:', e);
  }

  authService.syncTransaction(record).then(res => {
    if (res && res.success) {
      showToast(`Transaksi ${txNo} tersimpan ke Database Cloud Supabase!`, 'success');
    }
  });
}

export function renderHistoryModal() {
  const container = document.getElementById('history-list');
  const countEl = document.getElementById('history-count');
  if (!container) return;

  if (countEl) countEl.textContent = `${state.history.length} transaksi`;

  if (state.history.length === 0) {
    container.innerHTML = '<p style="text-align:center; color: var(--text-dim); padding: 20px;">Belum ada riwayat transaksi tersimpan.</p>';
    return;
  }

  container.innerHTML = '';
  state.history.forEach((h, idx) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'history-item';
    itemEl.innerHTML = `
      <div>
        <div style="font-weight: 700; color: #fff;">${h.txNo}</div>
        <div style="font-size: 0.75rem; color: var(--text-muted);">${h.date} ${h.time} • ${h.items?.length || 0} item</div>
      </div>
      <div style="text-align: right;">
        <div style="font-weight: 700; color: #10b981;">Rp ${formatRp(h.grandTotal)}</div>
        <button type="button" class="btn btn-outline btn-sm btn-load-hist" data-idx="${idx}" style="margin-top: 4px; padding: 2px 8px; font-size: 0.75rem;">Muat Struk</button>
      </div>
    `;
    container.appendChild(itemEl);
  });

  container.querySelectorAll('.btn-load-hist').forEach(btn => {
    btn.addEventListener('click', (e: any) => {
      const idx = Number(e.target.dataset.idx);
      const h = state.history[idx];
      if (!h) return;

      (document.getElementById('store-name') as HTMLInputElement).value = h.storeName || '';
      (document.getElementById('tx-no') as HTMLInputElement).value = h.txNo || '';
      (document.getElementById('tx-date') as HTMLInputElement).value = h.date || '';
      (document.getElementById('tx-time') as HTMLInputElement).value = h.time || '';
      (document.getElementById('tx-cashier') as HTMLInputElement).value = h.cashier || '';
      (document.getElementById('tx-sales') as HTMLInputElement).value = h.sales || '';
      (document.getElementById('tx-customer') as HTMLInputElement).value = h.customer || '';
      (document.getElementById('payment-method') as HTMLSelectElement).value = h.paymentMethod || 'TUNAI';
      (document.getElementById('pay-amount') as HTMLInputElement).value = h.payAmount || 0;

      state.items = JSON.parse(JSON.stringify(h.items || []));
      renderFormItems();
      updateReceipt();

      const histModal = document.getElementById('history-modal');
      if (histModal) histModal.classList.remove('open');
      showToast(`Transaksi ${h.txNo} dimuat.`, 'info');
    });
  });
}

export async function exportReceiptPNG() {
  const receiptPaper = document.getElementById('receipt-paper');
  if (!receiptPaper) return;

  showToast('Membuat gambar struk...', 'info');

  try {
    const width = receiptPaper.offsetWidth;
    const height = receiptPaper.offsetHeight;

    const canvas = document.createElement('canvas');
    canvas.width = width * 2;
    canvas.height = height * 2;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(2, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    const data = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Roboto Condensed', Arial, sans-serif; background: #fff; color: #000; padding: 12px; box-sizing: border-box;">
          ${receiptPaper.innerHTML}
        </div>
      </foreignObject>
    </svg>`;

    const img = new Image();
    const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const a = document.createElement('a');
      a.download = `Struk-${(document.getElementById('tx-no') as HTMLInputElement)?.value || 'Nota'}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
      showToast('Gambar struk berhasil diunduh!', 'success');
    };
    img.src = url;
  } catch (err: any) {
    showToast('Gagal membuat gambar: ' + err.message, 'error');
  }
}

export function buildEscPosPayload(): Uint8Array {
  const builder = new EscPosBuilder(state.paperSize as any);
  const storeName = (document.getElementById('store-name') as HTMLInputElement).value;
  const storeAddress = (document.getElementById('store-address') as HTMLInputElement).value;
  const storePhone = (document.getElementById('store-phone') as HTMLInputElement).value;
  const txNo = (document.getElementById('tx-no') as HTMLInputElement).value;
  const txDate = (document.getElementById('tx-date') as HTMLInputElement).value;
  const txTime = (document.getElementById('tx-time') as HTMLInputElement).value;
  const cashier = (document.getElementById('tx-cashier') as HTMLInputElement).value;
  const sales = (document.getElementById('tx-sales') as HTMLInputElement).value;
  const footerNote = (document.getElementById('footer-note') as HTMLTextAreaElement).value;
  const paymentMethod = (document.getElementById('payment-method') as HTMLSelectElement).value;

  builder.align('center')
    .bold(true)
    .size(2, 2)
    .line(storeName)
    .size(1, 1)
    .bold(false);

  if (storeAddress) builder.line(storeAddress);
  if (storePhone) builder.line(storePhone);

  builder.divider();

  // Meta lines
  builder.align('left');
  builder.twoColumns(txNo, '');
  builder.twoColumns(txDate, `Kasir: ${cashier}`);
  builder.twoColumns(txTime, `Sales: ${sales}`);
  builder.divider();

  // Items
  let subtotal = 0;
  state.items.forEach(item => {
    const itemTotal = item.qty * item.price;
    subtotal += itemTotal;
    builder.itemRow(item.name, `${item.qty} ${item.unit || 'pcs'}`, formatRp(item.price), formatRp(itemTotal));
  });

  builder.divider();

  // Totals
  const discount = Number((document.getElementById('calc-discount') as HTMLInputElement).value) || 0;
  const taxPct = Number((document.getElementById('calc-tax') as HTMLInputElement).value) || 0;
  const serviceAmount = Number((document.getElementById('calc-service') as HTMLInputElement).value) || 0;
  const grandTotal = Math.max(0, subtotal - discount) * (1 + taxPct / 100) + serviceAmount;
  const payAmount = Number((document.getElementById('pay-amount') as HTMLInputElement).value) || 0;
  const change = Math.max(0, payAmount - grandTotal);

  builder.twoColumns('Subtotal', formatRp(subtotal));
  if (discount > 0) builder.twoColumns('Diskon', `- ${formatRp(discount)}`);
  if (taxPct > 0) builder.twoColumns('PPN', `+ ${formatRp(Math.round(subtotal * taxPct / 100))}`);
  if (serviceAmount > 0) builder.twoColumns('Layanan', `+ ${formatRp(serviceAmount)}`);

  builder.bold(true).size(1, 2);
  builder.twoColumns('TOTAL', formatRp(grandTotal));
  builder.bold(false).size(1, 1);
  builder.divider();

  builder.twoColumns(paymentMethod, formatRp(payAmount));
  if (paymentMethod === 'TUNAI') {
    builder.twoColumns('KEMBALI', formatRp(change));
  }

  builder.divider();
  builder.align('center');
  if (footerNote) {
    footerNote.split('\n').forEach(l => builder.line(l));
  }

  builder.cut();
  return builder.getUint8Array();
}

export function initPOS() {
  loadTemplate('benthenk');

  // Load local and cloud database data
  loadDatabaseData();

  document.querySelectorAll('.template-pill[data-template]').forEach(btn => {
    btn.addEventListener('click', () => {
      const template = btn.getAttribute('data-template') || 'benthenk';
      loadTemplate(template);
      showToast(`Template diubah ke: ${template.toUpperCase()}`, 'info');
    });
  });

  const btn58 = document.getElementById('btn-paper-58mm');
  const btn80 = document.getElementById('btn-paper-80mm');
  const receiptWrap = document.getElementById('receipt-wrap');

  if (btn58 && btn80 && receiptWrap) {
    btn58.addEventListener('click', () => {
      state.paperSize = '58mm';
      btn58.classList.add('active-paper');
      btn80.classList.remove('active-paper');
      receiptWrap.className = 'thermal-paper-wrap width-58mm';
      updateReceipt();
    });

    btn80.addEventListener('click', () => {
      state.paperSize = '80mm';
      btn80.classList.add('active-paper');
      btn58.classList.remove('active-paper');
      receiptWrap.className = 'thermal-paper-wrap width-80mm';
      updateReceipt();
    });
  }

  const spacingSelector = document.getElementById('spacing-selector') as HTMLSelectElement;
  const inkSelector = document.getElementById('ink-selector') as HTMLSelectElement;
  const receiptPaper = document.getElementById('receipt-paper');

  if (spacingSelector && receiptPaper) {
    spacingSelector.addEventListener('change', () => {
      receiptPaper.classList.remove('spacing-tight', 'spacing-normal', 'spacing-loose');
      receiptPaper.classList.add(`spacing-${spacingSelector.value}`);
    });
  }

  if (inkSelector && receiptPaper) {
    inkSelector.addEventListener('change', () => {
      receiptPaper.classList.remove('ink-heavy', 'ink-dotmatrix');
      receiptPaper.classList.add(`ink-${inkSelector.value}`);
    });
  }

  const inputsToListen = [
    'store-name', 'store-tagline', 'store-address', 'store-phone',
    'tx-no', 'tx-date', 'tx-time', 'tx-cashier', 'tx-sales', 'tx-customer',
    'calc-discount', 'calc-tax', 'calc-service', 'calc-service-label',
    'payment-method', 'pay-amount', 'footer-note', 'wifi-info', 'qr-text',
    'show-barcode', 'show-qrcode'
  ];

  inputsToListen.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', updateReceipt);
      el.addEventListener('change', updateReceipt);
    }
  });

  // Save Store Settings to Database Button
  const btnSaveStoreDb = document.getElementById('btn-save-store-db');
  if (btnSaveStoreDb) {
    btnSaveStoreDb.addEventListener('click', async () => {
      try {
        btnSaveStoreDb.setAttribute('disabled', 'true');
        btnSaveStoreDb.textContent = 'Menyimpan...';

        const storeData = {
          store_name: (document.getElementById('store-name') as HTMLInputElement).value,
          tagline: (document.getElementById('store-tagline') as HTMLInputElement).value,
          address: (document.getElementById('store-address') as HTMLInputElement).value,
          phone: (document.getElementById('store-phone') as HTMLInputElement).value,
          footer_note: (document.getElementById('footer-note') as HTMLTextAreaElement).value,
          wifi_info: (document.getElementById('wifi-info') as HTMLInputElement).value,
          qr_text: (document.getElementById('qr-text') as HTMLInputElement).value,
          paper_size: state.paperSize,
          show_barcode: (document.getElementById('show-barcode') as HTMLInputElement).checked,
          show_qrcode: (document.getElementById('show-qrcode') as HTMLInputElement).checked
        };

        await authService.saveStoreSettings(storeData);
        showToast('Pengaturan profil toko berhasil disimpan ke database!', 'success');
      } catch (err: any) {
        showToast('Gagal menyimpan profil: ' + err.message, 'error');
      } finally {
        btnSaveStoreDb.removeAttribute('disabled');
        btnSaveStoreDb.innerHTML = '<span aria-hidden="true">💾</span> Simpan Profil Toko';
      }
    });
  }

  const btnExact = document.getElementById('btn-pay-exact');
  const btn50k = document.getElementById('btn-pay-50k');
  const btn100k = document.getElementById('btn-pay-100k');
  const payAmountInput = document.getElementById('pay-amount') as HTMLInputElement;

  if (btnExact) {
    btnExact.addEventListener('click', () => {
      let subtotal = 0;
      state.items.forEach(i => subtotal += (i.qty * i.price));
      const discount = Number((document.getElementById('calc-discount') as HTMLInputElement).value) || 0;
      const taxPct = Number((document.getElementById('calc-tax') as HTMLInputElement).value) || 0;
      const serviceAmount = Number((document.getElementById('calc-service') as HTMLInputElement).value) || 0;
      const grandTotal = Math.max(0, subtotal - discount) * (1 + taxPct / 100) + serviceAmount;
      payAmountInput.value = String(grandTotal);
      updateReceipt();
    });
  }

  if (btn50k) {
    btn50k.addEventListener('click', () => {
      payAmountInput.value = '50000';
      updateReceipt();
    });
  }

  if (btn100k) {
    btn100k.addEventListener('click', () => {
      payAmountInput.value = '100000';
      updateReceipt();
    });
  }

  const btnAddItem = document.getElementById('btn-add-item');
  if (btnAddItem) {
    btnAddItem.addEventListener('click', () => {
      state.items.push({ name: 'Barang Baru', qty: 1, unit: 'pcs', price: 10000 });
      renderFormItems();
      updateReceipt();
    });
  }

  const btnGenTx = document.getElementById('btn-gen-tx');
  if (btnGenTx) {
    btnGenTx.addEventListener('click', () => {
      (document.getElementById('tx-no') as HTMLInputElement).value = generateTxNo();
      updateReceipt();
    });
  }

  const btnNewOrder = document.getElementById('btn-new-order');
  if (btnNewOrder) {
    btnNewOrder.addEventListener('click', () => {
      (document.getElementById('tx-no') as HTMLInputElement).value = generateTxNo();
      const now = new Date();
      (document.getElementById('tx-date') as HTMLInputElement).value = now.toISOString().split('T')[0];
      (document.getElementById('tx-time') as HTMLInputElement).value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      updateReceipt();
      showToast('Transaksi baru dibuat!', 'success');
    });
  }

  const logoInput = document.getElementById('store-logo-input') as HTMLInputElement;
  if (logoInput) {
    logoInput.addEventListener('change', (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          state.uploadedLogo = event.target?.result as string;
          updateReceipt();
          showToast('Logo berhasil diunggah.', 'success');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  const btnPrintBrowser = document.getElementById('btn-print-browser');
  if (btnPrintBrowser) {
    btnPrintBrowser.addEventListener('click', () => {
      saveTransaction();
      window.print();
    });
  }

  const btnPrintBt = document.getElementById('btn-print-bt');
  if (btnPrintBt) {
    btnPrintBt.addEventListener('click', async () => {
      try {
        showToast('Menghubungkan ke Bluetooth Thermal Printer...', 'info');
        const payload = buildEscPosPayload();
        await ThermalPrinterDevice.printBluetooth(payload);
        saveTransaction();
        showToast('Struk terkirim ke printer Bluetooth!', 'success');
      } catch (err: any) {
        showToast('Gagal cetak Bluetooth: ' + err.message, 'error');
      }
    });
  }

  const btnPrintUsb = document.getElementById('btn-print-usb');
  if (btnPrintUsb) {
    btnPrintUsb.addEventListener('click', async () => {
      try {
        showToast('Menghubungkan ke USB / Serial Printer...', 'info');
        const payload = buildEscPosPayload();
        await ThermalPrinterDevice.printUSB(payload);
        saveTransaction();
        showToast('Struk terkirim ke printer USB / Serial!', 'success');
      } catch (err: any) {
        showToast('Gagal cetak USB / Serial: ' + err.message, 'error');
      }
    });
  }

  const btnSaveImg = document.getElementById('btn-save-image');
  if (btnSaveImg) {
    btnSaveImg.addEventListener('click', exportReceiptPNG);
  }

  const btnOpenDrawer = document.getElementById('btn-open-drawer');
  if (btnOpenDrawer) {
    btnOpenDrawer.addEventListener('click', async () => {
      try {
        const builder = new EscPosBuilder();
        builder.openCashDrawer();
        const payload = builder.getUint8Array();

        await ThermalPrinterDevice.printUSB(payload);
        showToast('Sinyal buka laci dikirim!', 'success');
      } catch (e: any) {
        showToast('Buka laci kasir: ' + e.message, 'error');
      }
    });
  }

  // Catalog Modal and Add Product Handler
  const catalogModal = document.getElementById('catalog-modal');
  const btnOpenCatalog = document.getElementById('btn-open-catalog');
  const btnCloseCatalog = document.getElementById('btn-close-catalog');
  const formAddProduct = document.getElementById('form-add-product') as HTMLFormElement;

  if (btnOpenCatalog && catalogModal) {
    btnOpenCatalog.addEventListener('click', () => {
      renderCatalogModal();
      catalogModal.classList.add('open');
    });
  }
  if (btnCloseCatalog && catalogModal) {
    btnCloseCatalog.addEventListener('click', () => catalogModal.classList.remove('open'));
  }

  if (formAddProduct) {
    formAddProduct.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = (document.getElementById('new-prod-name') as HTMLInputElement).value;
      const price = Number((document.getElementById('new-prod-price') as HTMLInputElement).value) || 0;
      const unit = (document.getElementById('new-prod-unit') as HTMLInputElement).value || 'pcs';

      try {
        const newProduct = await authService.addProduct({ name, price, unit });
        if (newProduct) {
          state.dbProducts.unshift(newProduct);
        } else {
          state.dbProducts.unshift({ name, price, unit });
        }
        formAddProduct.reset();
        (document.getElementById('new-prod-unit') as HTMLInputElement).value = 'pcs';
        renderCatalogModal();
        showToast(`Produk "${name}" tersimpan ke database!`, 'success');
      } catch (err: any) {
        showToast('Gagal menambah produk: ' + err.message, 'error');
      }
    });
  }

  const historyModal = document.getElementById('history-modal');
  const btnOpenHistory = document.getElementById('btn-open-history');
  const btnCloseHistory = document.getElementById('btn-close-history');
  const btnClearHistory = document.getElementById('btn-clear-history');

  if (btnOpenHistory && historyModal) {
    btnOpenHistory.addEventListener('click', () => {
      renderHistoryModal();
      historyModal.classList.add('open');
    });
  }
  if (btnCloseHistory && historyModal) {
    btnCloseHistory.addEventListener('click', () => historyModal.classList.remove('open'));
  }
  if (btnClearHistory) {
    btnClearHistory.addEventListener('click', () => {
      if (confirm('Yakin ingin menghapus seluruh riwayat transaksi lokal?')) {
        state.history = [];
        localStorage.removeItem('thermalpos_history');
        renderHistoryModal();
        showToast('Riwayat berhasil dihapus.', 'info');
      }
    });
  }

  const authModal = document.getElementById('auth-modal');
  const btnAuthAction = document.getElementById('btn-auth-action');
  const btnCloseAuth = document.getElementById('btn-close-auth');
  const tabBtnLogin = document.getElementById('tab-btn-login');
  const tabBtnRegister = document.getElementById('tab-btn-register');
  const tabBtnConfig = document.getElementById('tab-btn-config');
  const formLogin = document.getElementById('form-login') as HTMLFormElement;
  const formRegister = document.getElementById('form-register') as HTMLFormElement;
  const formConfig = document.getElementById('form-config') as HTMLFormElement;
  const authAlert = document.getElementById('auth-alert');

  function setAuthTab(tab: 'login' | 'register' | 'config') {
    [tabBtnLogin, tabBtnRegister, tabBtnConfig].forEach(btn => btn?.classList.remove('active'));
    [formLogin, formRegister, formConfig].forEach(form => {
      if (form) form.style.display = 'none';
    });
    if (authAlert) authAlert.style.display = 'none';

    if (tab === 'login') {
      tabBtnLogin?.classList.add('active');
      if (formLogin) formLogin.style.display = 'grid';
    } else if (tab === 'register') {
      tabBtnRegister?.classList.add('active');
      if (formRegister) formRegister.style.display = 'grid';
    } else {
      tabBtnConfig?.classList.add('active');
      if (formConfig) formConfig.style.display = 'grid';
    }
  }

  if (tabBtnLogin) tabBtnLogin.addEventListener('click', () => setAuthTab('login'));
  if (tabBtnRegister) tabBtnRegister.addEventListener('click', () => setAuthTab('register'));
  if (tabBtnConfig) tabBtnConfig.addEventListener('click', () => setAuthTab('config'));

  if (btnAuthAction && authModal) {
    btnAuthAction.addEventListener('click', async () => {
      if (authService.getCurrentUser()) {
        if (confirm('Apakah Anda ingin keluar dari akun?')) {
          await authService.logout();
          window.location.href = '/login';
        }
      } else {
        window.location.href = '/login';
      }
    });
  }

  if (btnCloseAuth && authModal) {
    btnCloseAuth.addEventListener('click', () => authModal.classList.remove('open'));
  }

  if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = (document.getElementById('login-email') as HTMLInputElement).value;
      const password = (document.getElementById('login-password') as HTMLInputElement).value;
      const submitBtn = document.getElementById('btn-submit-login') as HTMLButtonElement;

      try {
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Memproses...'; }
        await authService.login(email, password);
        showToast('Login berhasil!', 'success');
        authModal?.classList.remove('open');
      } catch (err: any) {
        if (authAlert) {
          authAlert.style.display = 'block';
          authAlert.style.background = 'rgba(239, 68, 68, 0.15)';
          authAlert.style.color = '#f87171';
          authAlert.textContent = err.message;
        }
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<span aria-hidden="true">🔓</span> Masuk ke Akun'; }
      }
    });
  }

  if (formRegister) {
    formRegister.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = (document.getElementById('reg-name') as HTMLInputElement).value;
      const email = (document.getElementById('reg-email') as HTMLInputElement).value;
      const password = (document.getElementById('reg-password') as HTMLInputElement).value;
      const confirmPass = (document.getElementById('reg-confirm-password') as HTMLInputElement).value;
      const submitBtn = document.getElementById('btn-submit-register') as HTMLButtonElement;

      if (password !== confirmPass) {
        if (authAlert) {
          authAlert.style.display = 'block';
          authAlert.style.background = 'rgba(239, 68, 68, 0.15)';
          authAlert.style.color = '#f87171';
          authAlert.textContent = 'Konfirmasi kata sandi tidak cocok.';
        }
        return;
      }

      try {
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Mendaftarkan...'; }
        const storeName = (document.getElementById('store-name') as HTMLInputElement)?.value || 'UD BENTHENK KOMPUTER';
        await authService.register(email, password, name, storeName);
        showToast('Pendaftaran berhasil!', 'success');
        authModal?.classList.remove('open');
      } catch (err: any) {
        if (authAlert) {
          authAlert.style.display = 'block';
          authAlert.style.background = 'rgba(239, 68, 68, 0.15)';
          authAlert.style.color = '#f87171';
          authAlert.textContent = err.message;
        }
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<span aria-hidden="true">✨</span> Daftarkan Akun Baru'; }
      }
    });
  }
}
