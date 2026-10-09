/**
 * Thermal POS Pro - Application Engine
 * Optimized for Thermal Printers (58mm & 80mm) with Benthenk Komputer Template
 */

// Castle / Benteng SVG Logo for Benthenk Komputer (Halftone / Dithered Texture)
const BENTHENK_LOGO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" width="85" height="85">
  <defs>
    <pattern id="dither" width="3" height="3" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="0.85" fill="%23111"/>
    </pattern>
    <pattern id="dense-dither" width="2" height="2" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="0.65" fill="%23111"/>
    </pattern>
  </defs>
  <!-- Outer circle border -->
  <circle cx="70" cy="70" r="65" fill="none" stroke="%23111" stroke-width="2.5"/>
  <!-- Dithered ring -->
  <circle cx="70" cy="70" r="60" fill="url(%23dither)" stroke="%23111" stroke-width="1.5"/>
  <circle cx="70" cy="70" r="48" fill="%23ffffff" stroke="%23111" stroke-width="1.5"/>
  
  <!-- Castle silhouette inside -->
  <!-- Ground mound -->
  <ellipse cx="70" cy="100" rx="42" ry="18" fill="%23111"/>
  <ellipse cx="70" cy="98" rx="40" ry="16" fill="url(%23dense-dither)"/>
  
  <!-- Castle Fortress Wall and Towers -->
  <path d="M42 96 L42 56 L47 56 L47 48 L52 48 L52 54 L55 54 L55 48 L60 48 L60 56 L64 56 L64 38 L68 38 L68 44 L72 44 L72 38 L76 38 L76 56 L80 56 L80 48 L85 48 L85 54 L88 54 L88 48 L93 48 L93 56 L98 56 L98 96 Z" fill="%23111"/>
  <!-- Center Flag -->
  <line x1="70" y1="38" x2="70" y2="28" stroke="%23111" stroke-width="1.5"/>
  <polygon points="70,28 78,32 70,36" fill="%23111"/>
  
  <!-- Windows & Arch Gate -->
  <path d="M64 96 L64 78 C64 74 76 74 76 78 L76 96 Z" fill="%23ffffff"/>
  <rect x="50" y="64" width="6" height="10" rx="2" fill="%23ffffff"/>
  <rect x="84" y="64" width="6" height="10" rx="2" fill="%23ffffff"/>
  <rect x="67" y="52" width="6" height="9" rx="2" fill="%23ffffff"/>
</svg>`;

// Preset Templates
const PRESETS = {
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
    logoUrl: "./img/ben.jpeg",
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
    address: "Jl. Ahmad Yani No. 88, Samarinda",
    phone: "Telp: 0541-765432",
    txNo: "INV/2026/10/0890",
    date: "2026-10-07",
    time: "18:45",
    cashier: "Siti Rahma",
    sales: "Putri",
    customer: "Pelanggan Umum",
    paymentMethod: "TUNAI",
    payAmount: 200000,
    footer: "Barang yang sudah dibeli tidak dapat ditukar/dikembalikan.\nLayanan Konsumen: 0800-1-BERKAH",
    wifi: "",
    qr: "",
    showLogo: false,
    logoUrl: null,
    showBarcode: true,
    showQrcode: false,
    items: [
      { name: "Beras Premium 5kg", qty: 1, unit: "sak", price: 74000 },
      { name: "Minyak Goreng 2L", qty: 2, unit: "pch", price: 34500 },
      { name: "Gula Pasir 1kg", qty: 2, unit: "kg", price: 17500 }
    ],
    catalog: [
      { name: "Beras Premium 5kg", unit: "sak", price: 74000 },
      { name: "Minyak Goreng 2L", unit: "pch", price: 34500 },
      { name: "Gula Pasir 1kg", unit: "kg", price: 17500 },
      { name: "Telur 1 Tray", unit: "tray", price: 58000 },
      { name: "Indomie Goreng (Dus)", unit: "dus", price: 115000 },
      { name: "Air Mineral 600ml", unit: "btl", price: 4000 }
    ]
  },
  laundry: {
    storeName: "KILAU LAUNDRY EXPRESS",
    tagline: "Bersih, Wangi & Rapi 24 Jam",
    address: "Jl. M. Yamin No. 10B, Samarinda",
    phone: "WA Antar Jemput: 0852-1122-3344",
    txNo: "INV/2026/10/0312",
    date: "2026-10-07",
    time: "14:20",
    cashier: "Budi Santoso",
    sales: "Lina",
    customer: "Ibu Maya (0813-9988-7766)",
    paymentMethod: "TRANSFER",
    payAmount: 75000,
    footer: "Pengambilan nota wajib dibawa.\nKomplain max 1x24 jam setelah serah terima.",
    wifi: "",
    qr: "https://wa.me/6285211223344",
    showLogo: false,
    logoUrl: null,
    showBarcode: true,
    showQrcode: false,
    items: [
      { name: "Cuci Komplit Reguler", qty: 5, unit: "kg", price: 8000 },
      { name: "Cuci Bedcover King", qty: 1, unit: "pcs", price: 35000 }
    ],
    catalog: [
      { name: "Cuci Komplit Reguler", unit: "kg", price: 8000 },
      { name: "Cuci Express 6 Jam", unit: "kg", price: 14000 },
      { name: "Setrika Saja", unit: "kg", price: 5000 },
      { name: "Bedcover King Size", unit: "pcs", price: 35000 }
    ]
  },
  service: {
    storeName: "PRIMA MOTOR WORKSHOP",
    tagline: "Bengkel Resmi & Service Center",
    address: "Jl. Juanda No. 99, Samarinda",
    phone: "Telp: 0541-789012 / WA: 0819-0011-2233",
    txNo: "INV/2026/10/0177",
    date: "2026-10-07",
    time: "11:10",
    cashier: "Eko Pratama",
    sales: "Dedi",
    customer: "Bpk. Aris (KT 4521 WZ - Vario 160)",
    paymentMethod: "TUNAI",
    payAmount: 200000,
    footer: "Garansi servis 1 minggu.\nTerima kasih atas kepercayaan Anda!",
    wifi: "",
    qr: "",
    showLogo: false,
    logoUrl: null,
    showBarcode: true,
    showQrcode: false,
    items: [
      { name: "Jasa Servis Lengkap + CVT", qty: 1, unit: "jasa", price: 75000 },
      { name: "Oli Mesin Matic Full Sintetik", qty: 1, unit: "btl", price: 65000 },
      { name: "Oli Gardan / Transmisi", qty: 1, unit: "btl", price: 20000 }
    ],
    catalog: [
      { name: "Jasa Servis Ringan", unit: "jasa", price: 50000 },
      { name: "Jasa Servis Lengkap", unit: "jasa", price: 75000 },
      { name: "Oli Mesin Matic", unit: "btl", price: 65000 },
      { name: "Kampas Rem Depan", unit: "set", price: 45000 }
    ]
  }
};

// Global App State
const AppState = {
  currentTemplate: 'benthenk',
  paperWidth: '58mm',
  currentLogoData: BENTHENK_LOGO_SVG,
  items: [],
  currentCatalog: []
};

// Utility formatters (matching dot separator: 150.000)
const formatNumber = (num) => {
  const val = Math.round(Number(num) || 0);
  return val.toLocaleString('id-ID');
};

const formatRp = (num) => {
  return formatNumber(num);
};

const getNowDate = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};

const getNowTime = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
};

const generateTxId = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const rand = String(Math.floor(100 + Math.random() * 900)).padStart(4, '0');
  return `INV/${y}/${m}/${rand}`;
};

// Toast Notification
function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  toast.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Initialization on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  loadTemplate('benthenk');
  bindEvents();
  renderHistoryCount();
  if (window.SupabaseAuth) {
    window.SupabaseAuth.checkInitialSession();
  }
});

function loadTemplate(tplKey) {
  const tpl = PRESETS[tplKey] || PRESETS.benthenk;
  AppState.currentTemplate = tplKey;
  AppState.items = JSON.parse(JSON.stringify(tpl.items));
  AppState.currentCatalog = tpl.catalog || [];

  document.getElementById('store-name').value = tpl.storeName;
  document.getElementById('store-tagline').value = tpl.tagline || '';
  document.getElementById('store-address').value = tpl.address;
  document.getElementById('store-phone').value = tpl.phone;
  document.getElementById('tx-no').value = tpl.txNo || generateTxId();
  document.getElementById('tx-date').value = tpl.date || getNowDate();
  document.getElementById('tx-time').value = tpl.time || getNowTime();
  document.getElementById('tx-cashier').value = tpl.cashier;
  document.getElementById('tx-sales').value = tpl.sales || '';
  document.getElementById('tx-customer').value = tpl.customer || '';
  document.getElementById('payment-method').value = tpl.paymentMethod || 'TUNAI';
  document.getElementById('footer-note').value = tpl.footer;
  document.getElementById('wifi-info').value = tpl.wifi || '';
  document.getElementById('qr-text').value = tpl.qr || '';
  document.getElementById('show-barcode').checked = !!tpl.showBarcode;
  document.getElementById('show-qrcode').checked = !!tpl.showQrcode;
  if (document.getElementById('calc-service-label')) {
    document.getElementById('calc-service-label').value = tpl.serviceLabel || 'Layanan';
  }
  if (document.getElementById('calc-service')) {
    document.getElementById('calc-service').value = tpl.serviceFee || 0;
  }

  const logoImg = document.getElementById('t-logo');
  if (tpl.showLogo && tpl.logoUrl) {
    AppState.currentLogoData = tpl.logoUrl;
    logoImg.src = tpl.logoUrl;
    logoImg.style.display = 'block';
  } else {
    AppState.currentLogoData = null;
    logoImg.style.display = 'none';
  }

  document.querySelectorAll('.template-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.template === tplKey);
  });

  renderItemRows();
  updateCalculation();
  renderCatalogModal();
}

// Render dynamic items in form
function renderItemRows() {
  const tbody = document.getElementById('items-tbody');
  tbody.innerHTML = '';

  AppState.items.forEach((item, index) => {
    const unit = item.unit || 'pcs';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <input type="text" class="item-name-input" data-index="${index}" value="${item.name}" placeholder="Nama barang...">
        <div style="display:flex; align-items:center; gap:6px; margin-top:4px;">
          <span style="font-size:10px; color:var(--text-muted);">Satuan:</span>
          <input type="text" class="item-unit-input" data-index="${index}" value="${unit}" style="width:65px; padding:2px 5px; font-size:11px;">
        </div>
      </td>
      <td>
        <input type="number" class="item-qty-input" data-index="${index}" value="${item.qty}" min="1" step="1">
      </td>
      <td>
        <input type="number" class="item-price-input" data-index="${index}" value="${item.price}" min="0" step="500">
      </td>
      <td style="font-weight: 600; font-size: 0.82rem; color: #93c5fd;">
        ${formatNumber(item.qty * item.price)}
      </td>
      <td>
        <button type="button" class="btn btn-danger-outline btn-sm btn-del-item" data-index="${index}" style="padding: 3px 8px;">✕</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Re-bind table inputs
  tbody.querySelectorAll('.item-name-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = e.target.dataset.index;
      AppState.items[idx].name = e.target.value;
      updateCalculation();
    });
  });

  tbody.querySelectorAll('.item-unit-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = e.target.dataset.index;
      AppState.items[idx].unit = e.target.value;
      updateCalculation();
    });
  });

  tbody.querySelectorAll('.item-qty-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = e.target.dataset.index;
      AppState.items[idx].qty = parseFloat(e.target.value) || 0;
      updateCalculation();
      renderItemRows();
    });
  });

  tbody.querySelectorAll('.item-price-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = e.target.dataset.index;
      AppState.items[idx].price = parseFloat(e.target.value) || 0;
      updateCalculation();
      renderItemRows();
    });
  });

  tbody.querySelectorAll('.btn-del-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index, 10);
      AppState.items.splice(idx, 1);
      renderItemRows();
      updateCalculation();
    });
  });
}

// Calculate totals and update Live Preview
function updateCalculation() {
  const storeName = document.getElementById('store-name').value;
  const storeTagline = document.getElementById('store-tagline').value;
  const storeAddress = document.getElementById('store-address').value;
  const storePhone = document.getElementById('store-phone').value;
  const txNo = document.getElementById('tx-no').value;
  const txDate = document.getElementById('tx-date').value;
  const txTime = document.getElementById('tx-time').value;
  const txCashier = document.getElementById('tx-cashier').value;
  const txSales = document.getElementById('tx-sales').value;
  const txCustomer = document.getElementById('tx-customer').value;

  const discount = parseFloat(document.getElementById('calc-discount').value) || 0;
  const taxPct = parseFloat(document.getElementById('calc-tax').value) || 0;
  const serviceLabelInput = document.getElementById('calc-service-label');
  const serviceLabel = (serviceLabelInput ? serviceLabelInput.value : '').trim() || 'Layanan';
  const serviceFee = parseFloat(document.getElementById('calc-service').value) || 0;
  const payMethod = document.getElementById('payment-method').value;
  let payAmount = parseFloat(document.getElementById('pay-amount').value) || 0;

  const footerNote = document.getElementById('footer-note').value;
  const wifiInfo = document.getElementById('wifi-info').value;
  const qrText = document.getElementById('qr-text').value;
  const showBarcode = document.getElementById('show-barcode').checked;
  const showQrcode = document.getElementById('show-qrcode').checked;

  // Compute Subtotal
  let subtotal = 0;
  AppState.items.forEach(it => {
    subtotal += (it.qty * it.price);
  });

  const taxAmount = Math.round((Math.max(0, subtotal - discount)) * (taxPct / 100));
  const grandTotal = Math.max(0, subtotal - discount + taxAmount + serviceFee);

  // If payAmount is 0 or unassigned, default to grandTotal for cashless
  if (payAmount === 0 && grandTotal > 0 && payMethod !== 'TUNAI') {
    payAmount = grandTotal;
    document.getElementById('pay-amount').value = grandTotal;
  }
  const changeAmount = payAmount - grandTotal;

  // Update Left Summary Box
  document.getElementById('sum-subtotal').textContent = formatNumber(subtotal);

  const sumRowDisc = document.getElementById('sum-row-discount');
  if (discount > 0) {
    sumRowDisc.style.display = 'flex';
    document.getElementById('sum-discount').textContent = '- ' + formatNumber(discount);
  } else {
    sumRowDisc.style.display = 'none';
  }

  const sumRowTax = document.getElementById('sum-row-tax');
  if (taxPct > 0) {
    sumRowTax.style.display = 'flex';
    document.getElementById('sum-tax').textContent = `+ ${formatNumber(taxAmount)} (${taxPct}%)`;
  } else {
    sumRowTax.style.display = 'none';
  }

  const sumRowSrv = document.getElementById('sum-row-service');
  if (serviceFee > 0) {
    sumRowSrv.style.display = 'flex';
    const sumSrvLabel = document.getElementById('sum-service-label');
    if (sumSrvLabel) sumSrvLabel.textContent = serviceLabel + ':';
    document.getElementById('sum-service').textContent = '+ ' + formatNumber(serviceFee);
  } else {
    sumRowSrv.style.display = 'none';
  }

  document.getElementById('sum-grandtotal').textContent = formatNumber(grandTotal);
  document.getElementById('sum-change').textContent = formatNumber(changeAmount);

  // Update Live Thermal Preview (matching UD Benthenk photo)
  document.getElementById('t-store-name').textContent = storeName;
  const tagEl = document.getElementById('t-store-tagline');
  if (storeTagline.trim()) {
    tagEl.textContent = storeTagline;
    tagEl.style.display = 'block';
  } else {
    tagEl.style.display = 'none';
  }
  document.getElementById('t-store-address').textContent = storeAddress;
  document.getElementById('t-store-phone').textContent = storePhone;

  document.getElementById('t-tx-no').textContent = txNo;
  document.getElementById('t-tx-date').textContent = txDate;
  document.getElementById('t-tx-time').textContent = txTime;
  document.getElementById('t-tx-cashier').textContent = txCashier;

  const salesRow = document.getElementById('t-tx-sales-row');
  if (txSales.trim()) {
    salesRow.style.display = 'inline';
    document.getElementById('t-tx-sales').textContent = txSales;
  } else {
    salesRow.style.display = 'none';
  }

  const custRow = document.getElementById('t-customer-row');
  if (txCustomer.trim()) {
    custRow.style.display = 'flex';
    document.getElementById('t-tx-customer').textContent = txCustomer;
  } else {
    custRow.style.display = 'none';
  }

  // Render items in preview (format: "1 pcs x 150.000" and total right-aligned "150.000")
  const tItemsContainer = document.getElementById('t-items-container');
  tItemsContainer.innerHTML = '';
  AppState.items.forEach(it => {
    const itemBlock = document.createElement('div');
    itemBlock.className = 't-item-block';
    const unitStr = it.unit ? ` ${it.unit}` : ' pcs';
    itemBlock.innerHTML = `
      <div class="t-item-name">${it.name}</div>
      <div class="t-item-calc">
        <span>${it.qty}${unitStr} x ${formatNumber(it.price)}</span>
        <span>${formatNumber(it.qty * it.price)}</span>
      </div>
    `;
    tItemsContainer.appendChild(itemBlock);
  });

  // Summary in preview
  document.getElementById('t-sum-subtotal').textContent = formatNumber(subtotal);

  const tRowDisc = document.getElementById('t-row-discount');
  if (discount > 0) {
    tRowDisc.style.display = 'flex';
    document.getElementById('t-sum-discount').textContent = '- ' + formatNumber(discount);
  } else {
    tRowDisc.style.display = 'none';
  }

  const tRowTax = document.getElementById('t-row-tax');
  if (taxPct > 0) {
    tRowTax.style.display = 'flex';
    document.getElementById('t-sum-tax').textContent = `+ ${formatNumber(taxAmount)}`;
  } else {
    tRowTax.style.display = 'none';
  }

  const tRowSrv = document.getElementById('t-row-service');
  if (serviceFee > 0) {
    tRowSrv.style.display = 'flex';
    const tSumSrvLabel = document.getElementById('t-sum-service-label');
    if (tSumSrvLabel) tSumSrvLabel.textContent = serviceLabel;
    document.getElementById('t-sum-service').textContent = `+ ${formatNumber(serviceFee)}`;
  } else {
    tRowSrv.style.display = 'none';
  }

  document.getElementById('t-sum-grandtotal').textContent = formatNumber(grandTotal);
  document.getElementById('t-pay-method').textContent = payMethod;
  document.getElementById('t-pay-amount').textContent = formatNumber(payAmount > 0 ? payAmount : grandTotal);

  const changeRow = document.getElementById('t-row-change');
  if (changeRow) {
    if (payMethod === 'TUNAI' && changeAmount > 0) {
      changeRow.style.display = 'flex';
      document.getElementById('t-sum-change').textContent = formatNumber(changeAmount);
    } else {
      changeRow.style.display = 'none';
    }
  }

  // Footer in preview
  document.getElementById('t-footer-text').textContent = footerNote;
  const wifiEl = document.getElementById('t-wifi-text');
  if (wifiInfo && wifiInfo.trim()) {
    wifiEl.textContent = wifiInfo;
    wifiEl.style.display = 'block';
  } else {
    wifiEl.style.display = 'none';
  }

  // Render Barcode
  const barcodeContainer = document.getElementById('t-barcode-container');
  if (showBarcode && txNo) {
    barcodeContainer.style.display = 'flex';
    barcodeContainer.innerHTML = window.BarcodeEngine.renderSVG(txNo, 220, 36);
  } else {
    barcodeContainer.style.display = 'none';
    barcodeContainer.innerHTML = '';
  }

  // Render QR Code
  const qrContainer = document.getElementById('t-qrcode-container');
  if (showQrcode && qrText) {
    qrContainer.style.display = 'flex';
    qrContainer.innerHTML = window.QRCodeEngine.generateSVG(qrText, 95);
  } else {
    qrContainer.style.display = 'none';
    qrContainer.innerHTML = '';
  }
}

// Bind all DOM events
function bindEvents() {
  const allInputs = document.querySelectorAll('.form-column input, .form-column select, .form-column textarea');
  allInputs.forEach(input => {
    input.addEventListener('input', updateCalculation);
    input.addEventListener('change', updateCalculation);
  });

  // Template switch
  document.querySelectorAll('.template-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      loadTemplate(pill.dataset.template);
    });
  });

  // Generate Tx ID
  document.getElementById('btn-gen-tx').addEventListener('click', () => {
    document.getElementById('tx-no').value = generateTxId();
    document.getElementById('tx-date').value = getNowDate();
    document.getElementById('tx-time').value = getNowTime();
    updateCalculation();
    showToast("Nomor nota & waktu diperbarui", "info");
  });

  // Add Item button
  document.getElementById('btn-add-item').addEventListener('click', () => {
    AppState.items.push({ name: "ITEM BARU", qty: 1, unit: "pcs", price: 10000 });
    renderItemRows();
    updateCalculation();
  });

  // Quick Pay Amount Buttons
  document.getElementById('btn-pay-exact').addEventListener('click', () => {
    let sub = 0;
    AppState.items.forEach(it => sub += it.qty * it.price);
    const disc = parseFloat(document.getElementById('calc-discount').value) || 0;
    const taxPct = parseFloat(document.getElementById('calc-tax').value) || 0;
    const srv = parseFloat(document.getElementById('calc-service').value) || 0;
    const taxAmount = Math.round((Math.max(0, sub - disc)) * (taxPct / 100));
    const total = Math.max(0, sub - disc + taxAmount + srv);
    document.getElementById('pay-amount').value = total;
    updateCalculation();
  });

  document.getElementById('btn-pay-50k').addEventListener('click', () => {
    document.getElementById('pay-amount').value = 50000;
    updateCalculation();
  });

  document.getElementById('btn-pay-100k').addEventListener('click', () => {
    document.getElementById('pay-amount').value = 100000;
    updateCalculation();
  });

  // Paper Width Selector (58mm vs 80mm)
  const wrap = document.getElementById('receipt-wrap');
  const btn58 = document.getElementById('btn-paper-58mm');
  const btn80 = document.getElementById('btn-paper-80mm');

  // Spacing & Ink Selector
  const paper = document.getElementById('receipt-paper');
  const spacingSel = document.getElementById('spacing-selector');
  const inkSel = document.getElementById('ink-selector');

  const applyPaperClasses = () => {
    paper.classList.remove('spacing-tight', 'spacing-normal', 'spacing-loose', 'ink-heavy', 'ink-dotmatrix');
    paper.classList.add(`spacing-${spacingSel.value}`);
    paper.classList.add(`ink-${inkSel.value}`);
  };

  spacingSel.addEventListener('change', applyPaperClasses);
  inkSel.addEventListener('change', applyPaperClasses);
  applyPaperClasses(); // apply default tight spacing and heavy ink on startup

  btn58.addEventListener('click', () => {
    AppState.paperWidth = '58mm';
    wrap.classList.remove('width-80mm');
    wrap.classList.add('width-58mm');
    btn58.style.background = 'rgba(59, 130, 246, 0.25)';
    btn80.style.background = 'transparent';
    document.body.classList.remove('print-80mm');
    document.body.classList.add('print-58mm');
    showToast("Ukuran kertas diatur ke 58 mm", "info");
  });

  btn80.addEventListener('click', () => {
    AppState.paperWidth = '80mm';
    wrap.classList.remove('width-58mm');
    wrap.classList.add('width-80mm');
    btn80.style.background = 'rgba(59, 130, 246, 0.25)';
    btn58.style.background = 'transparent';
    document.body.classList.remove('print-58mm');
    document.body.classList.add('print-80mm');
    showToast("Ukuran kertas diatur ke 80 mm", "info");
  });

  // Logo upload preview
  const logoInput = document.getElementById('store-logo-input');
  logoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (re) => {
        AppState.currentLogoData = re.target.result;
        const logoImg = document.getElementById('t-logo');
        logoImg.src = re.target.result;
        logoImg.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });

  // Reset / New Order
  document.getElementById('btn-new-order').addEventListener('click', () => {
    document.getElementById('tx-no').value = generateTxId();
    document.getElementById('tx-date').value = getNowDate();
    document.getElementById('tx-time').value = getNowTime();
    AppState.items = [];
    renderItemRows();
    updateCalculation();
    showToast("Transaksi baru siap!", "success");
  });

  // Open / Close Catalog Modal
  const catModal = document.getElementById('catalog-modal');
  document.getElementById('btn-open-catalog').addEventListener('click', () => {
    catModal.classList.add('active');
  });
  document.getElementById('btn-close-catalog').addEventListener('click', () => {
    catModal.classList.remove('active');
  });

  // Open / Close History Modal
  const histModal = document.getElementById('history-modal');
  document.getElementById('btn-open-history').addEventListener('click', () => {
    renderHistoryList();
    histModal.classList.add('active');
  });
  document.getElementById('btn-close-history').addEventListener('click', () => {
    histModal.classList.remove('active');
  });

  document.getElementById('btn-clear-history').addEventListener('click', () => {
    if (confirm("Hapus semua riwayat transaksi tersimpan?")) {
      localStorage.removeItem('thermalpos_history');
      renderHistoryList();
      renderHistoryCount();
      showToast("Riwayat transaksi telah dihapus", "info");
    }
  });

  // PRINT: Standard Browser / System Driver Print
  document.getElementById('btn-print-browser').addEventListener('click', () => {
    saveCurrentTransactionToHistory();
    window.print();
  });

  // PRINT: Direct Web Bluetooth (ESC/POS)
  document.getElementById('btn-print-bt').addEventListener('click', async () => {
    try {
      showToast("Mencari Printer Bluetooth...", "info");
      const escposData = buildEscPosPayload();
      await window.ThermalPrinterDevice.printBluetooth(escposData);
      saveCurrentTransactionToHistory();
      showToast("Berhasil mencetak ke Bluetooth!", "success");
    } catch (err) {
      alert("Koneksi Bluetooth: " + err.message);
    }
  });

  // PRINT: Direct USB / Serial (ESC/POS)
  document.getElementById('btn-print-usb').addEventListener('click', async () => {
    try {
      showToast("Membuka Port USB / Serial...", "info");
      const escposData = buildEscPosPayload();
      await window.ThermalPrinterDevice.printUSB(escposData);
      saveCurrentTransactionToHistory();
      showToast("Berhasil mencetak ke Printer USB!", "success");
    } catch (err) {
      alert("Koneksi USB / Serial: " + err.message);
    }
  });

  // Save as Image (PNG)
  document.getElementById('btn-save-image').addEventListener('click', () => {
    saveReceiptAsImage();
  });

  // Cash Drawer Pulse
  document.getElementById('btn-open-drawer').addEventListener('click', async () => {
    try {
      const builder = new window.EscPosBuilder(AppState.paperWidth);
      builder.openCashDrawer();
      const payload = builder.getUint8Array();
      if (window.ThermalPrinterDevice.bluetoothCharacteristic) {
        await window.ThermalPrinterDevice.printBluetooth(payload);
        showToast("Perintah buka laci kasir terkirim!", "success");
      } else {
        showToast("Hubungkan ke printer Bluetooth/USB terlebih dahulu", "info");
      }
    } catch (e) {
      alert(e.message);
    }
  });

  // --- Supabase Authentication Modal & Events ---
  const authModal = document.getElementById('auth-modal');
  const btnAuthAction = document.getElementById('btn-auth-action');
  const btnCloseAuth = document.getElementById('btn-close-auth');
  const authAlert = document.getElementById('auth-alert');

  const tabBtnLogin = document.getElementById('tab-btn-login');
  const tabBtnRegister = document.getElementById('tab-btn-register');
  const tabBtnConfig = document.getElementById('tab-btn-config');

  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');
  const formConfig = document.getElementById('form-config');

  const showAuthAlert = (message, type = 'error') => {
    if (!authAlert) return;
    authAlert.textContent = message;
    authAlert.style.display = 'block';
    if (type === 'error') {
      authAlert.style.background = 'rgba(239, 68, 68, 0.15)';
      authAlert.style.border = '1px solid rgba(239, 68, 68, 0.4)';
      authAlert.style.color = '#fca5a5';
    } else if (type === 'success') {
      authAlert.style.background = 'rgba(16, 185, 129, 0.15)';
      authAlert.style.border = '1px solid rgba(16, 185, 129, 0.4)';
      authAlert.style.color = '#6ee7b7';
    } else {
      authAlert.style.background = 'rgba(59, 130, 246, 0.15)';
      authAlert.style.border = '1px solid rgba(59, 130, 246, 0.4)';
      authAlert.style.color = '#93c5fd';
    }
  };

  const hideAuthAlert = () => {
    if (authAlert) authAlert.style.display = 'none';
  };

  const switchAuthTab = (activeTab) => {
    hideAuthAlert();
    [tabBtnLogin, tabBtnRegister, tabBtnConfig].forEach(btn => btn?.classList.remove('active'));
    [formLogin, formRegister, formConfig].forEach(form => {
      if (form) form.style.display = 'none';
    });

    if (activeTab === 'login') {
      tabBtnLogin?.classList.add('active');
      if (formLogin) formLogin.style.display = 'grid';
    } else if (activeTab === 'register') {
      tabBtnRegister?.classList.add('active');
      if (formRegister) formRegister.style.display = 'grid';
    } else if (activeTab === 'config') {
      tabBtnConfig?.classList.add('active');
      if (formConfig) {
        formConfig.style.display = 'grid';
        const cfg = window.SupabaseAuth.getConfig();
        const urlInput = document.getElementById('cfg-supabase-url');
        const keyInput = document.getElementById('cfg-supabase-key');
        if (urlInput) urlInput.value = cfg.url || '';
        if (keyInput) keyInput.value = cfg.anonKey || '';
      }
    }
  };

  tabBtnLogin?.addEventListener('click', () => switchAuthTab('login'));
  tabBtnRegister?.addEventListener('click', () => switchAuthTab('register'));
  tabBtnConfig?.addEventListener('click', () => switchAuthTab('config'));

  // Header button click (Login modal or Logout confirmation)
  btnAuthAction?.addEventListener('click', async () => {
    if (window.SupabaseAuth && window.SupabaseAuth.currentUser) {
      const email = window.SupabaseAuth.currentUser.email || 'akun ini';
      if (confirm(`Apakah Anda yakin ingin keluar dari ${email}?`)) {
        await window.SupabaseAuth.logout();
        showToast('Anda telah keluar dari akun', 'info');
      }
    } else {
      switchAuthTab('login');
      authModal?.classList.add('active');
    }
  });

  btnCloseAuth?.addEventListener('click', () => {
    authModal?.classList.remove('active');
    hideAuthAlert();
  });

  // Close modal when clicking backdrop
  authModal?.addEventListener('click', (e) => {
    if (e.target === authModal) {
      authModal.classList.remove('active');
      hideAuthAlert();
    }
  });

  // Keyboard accessibility: Close modal on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && authModal?.classList.contains('active')) {
      authModal.classList.remove('active');
      hideAuthAlert();
    }
  });

  // Handle Login submission
  formLogin?.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAuthAlert();
    const email = document.getElementById('login-email')?.value;
    const password = document.getElementById('login-password')?.value;
    const submitBtn = document.getElementById('btn-submit-login');

    if (!email || !password) {
      showAuthAlert('Email dan kata sandi wajib diisi.');
      return;
    }

    try {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>⏳</span> Memproses...';
      }
      await window.SupabaseAuth.login(email, password);
      authModal?.classList.remove('active');
      formLogin.reset();
      showToast(`Berhasil masuk sebagai ${email}`, 'success');
    } catch (err) {
      showAuthAlert(err.message || 'Gagal masuk ke akun.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>🔓</span> Masuk ke Akun';
      }
    }
  });

  // Handle Register submission
  formRegister?.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAuthAlert();
    const name = document.getElementById('reg-name')?.value;
    const email = document.getElementById('reg-email')?.value;
    const password = document.getElementById('reg-password')?.value;
    const confirmPassword = document.getElementById('reg-confirm-password')?.value;
    const submitBtn = document.getElementById('btn-submit-register');

    if (!email || !password) {
      showAuthAlert('Email dan kata sandi wajib diisi.');
      return;
    }
    if (password !== confirmPassword) {
      showAuthAlert('Konfirmasi kata sandi tidak cocok.');
      return;
    }
    if (password.length < 6) {
      showAuthAlert('Kata sandi minimal harus 6 karakter.');
      return;
    }

    try {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>⏳</span> Mendaftarkan...';
      }
      const data = await window.SupabaseAuth.register(email, password, name);
      if (data.user && !data.session) {
        showAuthAlert('Pendaftaran berhasil! Silakan periksa email Anda untuk konfirmasi akun.', 'success');
      } else {
        authModal?.classList.remove('active');
        formRegister.reset();
        showToast(`Akun ${email} berhasil didaftarkan!`, 'success');
      }
    } catch (err) {
      showAuthAlert(err.message || 'Pendaftaran gagal.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>✨</span> Daftarkan Akun Baru';
      }
    }
  });

  // Handle Forgot Password
  document.getElementById('btn-forgot-password')?.addEventListener('click', async () => {
    const email = document.getElementById('login-email')?.value;
    if (!email) {
      showAuthAlert('Masukkan email Anda di kolom email terlebih dahulu untuk reset kata sandi.', 'info');
      document.getElementById('login-email')?.focus();
      return;
    }
    try {
      showAuthAlert('Mengirim tautan reset kata sandi...', 'info');
      await window.SupabaseAuth.resetPassword(email);
      showAuthAlert(`Tautan reset kata sandi telah dikirim ke ${email}. Silakan periksa email Anda.`, 'success');
    } catch (err) {
      showAuthAlert(err.message || 'Gagal mengirim email reset kata sandi.');
    }
  });

  // Handle Supabase Config Save
  formConfig?.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAuthAlert();
    const url = document.getElementById('cfg-supabase-url')?.value;
    const key = document.getElementById('cfg-supabase-key')?.value;
    try {
      window.SupabaseAuth.saveConfig(url, key);
      showAuthAlert('Konfigurasi Supabase berhasil disimpan dan diinisialisasi ulang.', 'success');
      showToast('Konfigurasi Supabase diperbarui', 'success');
    } catch (err) {
      showAuthAlert(err.message || 'Gagal menyimpan konfigurasi.');
    }
  });

  // Handle Reset Config to Default
  document.getElementById('btn-reset-config')?.addEventListener('click', () => {
    window.SupabaseAuth.resetConfig();
    switchAuthTab('config');
    showAuthAlert('Konfigurasi telah dikembalikan ke pengaturan bawaan.', 'info');
    showToast('Pengaturan Supabase direset ke default', 'info');
  });
}

// Build ESC/POS Byte Array matching Benthenk style
function buildEscPosPayload() {
  const storeName = document.getElementById('store-name').value;
  const storeTagline = document.getElementById('store-tagline').value;
  const storeAddress = document.getElementById('store-address').value;
  const storePhone = document.getElementById('store-phone').value;
  const txNo = document.getElementById('tx-no').value;
  const txDate = document.getElementById('tx-date').value;
  const txTime = document.getElementById('tx-time').value;
  const txCashier = document.getElementById('tx-cashier').value;
  const txSales = document.getElementById('tx-sales').value;

  const discount = parseFloat(document.getElementById('calc-discount').value) || 0;
  const taxPct = parseFloat(document.getElementById('calc-tax').value) || 0;
  const serviceLabel = (document.getElementById('calc-service-label')?.value || '').trim() || 'Layanan';
  const serviceFee = parseFloat(document.getElementById('calc-service').value) || 0;
  const payMethod = document.getElementById('payment-method').value;
  const payAmount = parseFloat(document.getElementById('pay-amount').value) || 0;
  const footerNote = document.getElementById('footer-note').value;

  let subtotal = 0;
  AppState.items.forEach(it => subtotal += it.qty * it.price);
  const taxAmount = Math.round((Math.max(0, subtotal - discount)) * (taxPct / 100));
  const grandTotal = Math.max(0, subtotal - discount + taxAmount + serviceFee);

  const builder = new window.EscPosBuilder(AppState.paperWidth);

  // Header
  builder.align('center')
    .bold(true)
    .size(1, 1)
    .line(storeName)
    .bold(false);

  if (storeTagline.trim()) builder.line(storeTagline);
  if (storeAddress.trim()) builder.line(storeAddress);
  if (storePhone.trim()) builder.line(storePhone);

  builder.divider('-');

  // Meta lines matching photo:
  // INV/2026/09/0839
  // 2026-09-30          Kasir: pagi
  // 05:13               Sales: wiwik
  builder.twoColumns(txNo, '')
    .twoColumns(txDate, `Kasir: ${txCashier}`)
    .twoColumns(txTime, txSales ? `Sales: ${txSales}` : '')
    .divider('-');

  // Items
  AppState.items.forEach(it => {
    const unitStr = it.unit ? ` ${it.unit}` : ' pcs';
    builder.align('left').line(it.name);
    builder.twoColumns(`${it.qty}${unitStr} x ${formatNumber(it.price)}`, formatNumber(it.qty * it.price));
  });

  builder.divider('-');

  // Summary
  builder.twoColumns('Subtotal', formatNumber(subtotal));
  if (discount > 0) builder.twoColumns('Diskon', '-' + formatNumber(discount));
  if (taxPct > 0) builder.twoColumns(`PPN (${taxPct}%)`, '+' + formatNumber(taxAmount));
  if (serviceFee > 0) builder.twoColumns(serviceLabel, '+' + formatNumber(serviceFee));

  builder.bold(true)
    .twoColumns('TOTAL', formatNumber(grandTotal))
    .bold(false)
    .divider('-')
    .twoColumns(payMethod, formatNumber(payAmount))
    .divider('-');

  // Footer centered
  builder.align('center');
  footerNote.split('\n').forEach(line => {
    if (line.trim()) builder.line(line.trim());
  });

  builder.feed(3)
    .cut();

  return builder.getUint8Array();
}

// Render Catalog Grid in Modal
function renderCatalogModal() {
  const grid = document.getElementById('catalog-grid-items');
  grid.innerHTML = '';
  AppState.currentCatalog.forEach(catItem => {
    const card = document.createElement('div');
    card.className = 'catalog-card';
    card.innerHTML = `
      <div class="catalog-card-name">${catItem.name}</div>
      <div class="catalog-card-price">${formatNumber(catItem.price)}</div>
    `;
    card.addEventListener('click', () => {
      const existing = AppState.items.find(i => i.name === catItem.name);
      if (existing) {
        existing.qty += 1;
      } else {
        AppState.items.push({ name: catItem.name, qty: 1, unit: catItem.unit || 'pcs', price: catItem.price });
      }
      renderItemRows();
      updateCalculation();
      showToast(`+1 ${catItem.name}`, 'success');
    });
    grid.appendChild(card);
  });
}

// Save transaction to local storage
function saveCurrentTransactionToHistory() {
  const history = JSON.parse(localStorage.getItem('thermalpos_history') || '[]');
  const txNo = document.getElementById('tx-no').value;

  if (history.length > 0 && history[0].txNo === txNo) return;

  let sub = 0;
  AppState.items.forEach(it => sub += it.qty * it.price);
  const discount = parseFloat(document.getElementById('calc-discount').value) || 0;
  const taxPct = parseFloat(document.getElementById('calc-tax').value) || 0;
  const serviceLabel = (document.getElementById('calc-service-label')?.value || '').trim() || 'Layanan';
  const serviceFee = parseFloat(document.getElementById('calc-service').value) || 0;
  const grandTotal = Math.max(0, sub - discount + Math.round((sub - discount) * (taxPct / 100)) + serviceFee);

  const newEntry = {
    txNo: txNo,
    date: document.getElementById('tx-date').value,
    time: document.getElementById('tx-time').value,
    cashier: document.getElementById('tx-cashier').value,
    sales: document.getElementById('tx-sales').value,
    customer: document.getElementById('tx-customer').value,
    serviceLabel: serviceLabel,
    serviceFee: serviceFee,
    grandTotal: grandTotal,
    items: JSON.parse(JSON.stringify(AppState.items))
  };

  history.unshift(newEntry);
  if (history.length > 50) history.pop();
  localStorage.setItem('thermalpos_history', JSON.stringify(history));
  renderHistoryCount();

  // Cloud sync to Supabase if authenticated
  if (window.SupabaseAuth && window.SupabaseAuth.currentUser) {
    window.SupabaseAuth.syncTransactionToCloud(newEntry);
  }
}

function renderHistoryCount() {
  const history = JSON.parse(localStorage.getItem('thermalpos_history') || '[]');
  const el = document.getElementById('history-count');
  if (el) el.textContent = `${history.length} transaksi`;
}

function renderHistoryList() {
  const history = JSON.parse(localStorage.getItem('thermalpos_history') || '[]');
  const listEl = document.getElementById('history-list');
  listEl.innerHTML = '';

  if (history.length === 0) {
    listEl.innerHTML = '<div style="padding: 24px; text-align: center; color: var(--text-dim);">Belum ada riwayat transaksi.</div>';
    return;
  }

  history.forEach((tx, idx) => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
      <div>
        <div style="font-weight: 700; font-size: 0.88rem;">${tx.txNo}</div>
        <div style="font-size: 0.75rem; color: var(--text-muted);">${tx.date || ''} ${tx.time || ''} • Kasir: ${tx.cashier}</div>
        <div style="font-size: 0.78rem; color: #60a5fa; font-weight: 600; margin-top: 2px;">${formatNumber(tx.grandTotal)}</div>
      </div>
      <button type="button" class="btn btn-outline btn-sm btn-load-history" data-index="${idx}">
        Muat & Cetak
      </button>
    `;
    listEl.appendChild(item);
  });

  listEl.querySelectorAll('.btn-load-history').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.dataset.index;
      const tx = history[idx];
      document.getElementById('tx-no').value = tx.txNo;
      if (tx.date) document.getElementById('tx-date').value = tx.date;
      if (tx.time) document.getElementById('tx-time').value = tx.time;
      document.getElementById('tx-cashier').value = tx.cashier;
      document.getElementById('tx-sales').value = tx.sales || '';
      document.getElementById('tx-customer').value = tx.customer || '';
      if (document.getElementById('calc-service-label')) {
        document.getElementById('calc-service-label').value = tx.serviceLabel || 'Layanan';
      }
      if (document.getElementById('calc-service')) {
        document.getElementById('calc-service').value = tx.serviceFee || 0;
      }
      AppState.items = JSON.parse(JSON.stringify(tx.items));
      renderItemRows();
      updateCalculation();
      document.getElementById('history-modal').classList.remove('active');
      showToast(`Transaksi ${tx.txNo} dimuat`, 'success');
    });
  });
}

// Convert receipt to HTML Canvas and trigger PNG download
function saveReceiptAsImage() {
  const paper = document.getElementById('receipt-paper');
  showToast("Menyiapkan gambar nota...", "info");

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const width = AppState.paperWidth === '80mm' ? 560 : 380;
  const height = Math.max(paper.offsetHeight * 1.5, 620);
  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 16px Courier New, monospace';
  ctx.textAlign = 'center';

  let y = 30;
  const storeName = document.getElementById('store-name').value;
  ctx.font = '900 19px Arial Black, Roboto Condensed, sans-serif';
  ctx.fillText(storeName, width / 2, y);
  y += 22;

  ctx.font = '700 13.5px Roboto Condensed, Arial, sans-serif';
  const address = document.getElementById('store-address').value;
  if (address) {
    ctx.fillText(address, width / 2, y);
    y += 19;
  }
  const phone = document.getElementById('store-phone').value;
  if (phone) {
    ctx.fillText(phone, width / 2, y);
    y += 19;
  }

  // Divider
  ctx.beginPath();
  ctx.setLineDash([4, 3]);
  ctx.moveTo(15, y);
  ctx.lineTo(width - 15, y);
  ctx.stroke();
  y += 18;

  // Meta
  ctx.textAlign = 'left';
  ctx.font = '700 13px Roboto Condensed, Arial, sans-serif';
  ctx.fillText(document.getElementById('tx-no').value, 15, y);
  y += 18;
  ctx.fillText(document.getElementById('tx-date').value, 15, y);
  ctx.textAlign = 'right';
  ctx.fillText('Kasir: ' + document.getElementById('tx-cashier').value, width - 15, y);
  y += 18;
  ctx.textAlign = 'left';
  ctx.fillText(document.getElementById('tx-time').value, 15, y);
  const sales = document.getElementById('tx-sales').value;
  if (sales) {
    ctx.textAlign = 'right';
    ctx.fillText('Sales: ' + sales, width - 15, y);
  }
  y += 20;

  // Divider
  ctx.beginPath();
  ctx.moveTo(15, y);
  ctx.lineTo(width - 15, y);
  ctx.stroke();
  y += 18;

  // Items
  let subtotal = 0;
  AppState.items.forEach(it => {
    ctx.textAlign = 'left';
    ctx.font = '800 13.5px Roboto Condensed, Arial, sans-serif';
    ctx.fillText(it.name, 15, y);
    y += 18;

    ctx.font = '700 13px Roboto Condensed, Arial, sans-serif';
    const unitStr = it.unit ? ` ${it.unit}` : ' pcs';
    ctx.fillText(`${it.qty}${unitStr} x ${formatNumber(it.price)}`, 15, y);
    ctx.textAlign = 'right';
    const total = it.qty * it.price;
    subtotal += total;
    ctx.fillText(formatNumber(total), width - 15, y);
    y += 20;
  });

  // Divider
  ctx.beginPath();
  ctx.moveTo(15, y);
  ctx.lineTo(width - 15, y);
  ctx.stroke();
  y += 18;

  // Summary
  const discount = parseFloat(document.getElementById('calc-discount').value) || 0;
  const taxPct = parseFloat(document.getElementById('calc-tax').value) || 0;
  const serviceLabel = (document.getElementById('calc-service-label')?.value || '').trim() || 'Layanan';
  const serviceFee = parseFloat(document.getElementById('calc-service').value) || 0;
  const taxAmount = Math.round((Math.max(0, subtotal - discount)) * (taxPct / 100));
  const grandTotal = Math.max(0, subtotal - discount + taxAmount + serviceFee);

  ctx.textAlign = 'left';
  ctx.font = '700 13px Roboto Condensed, Arial, sans-serif';
  ctx.fillText('Subtotal', 15, y);
  ctx.textAlign = 'right';
  ctx.fillText(formatNumber(subtotal), width - 15, y);
  y += 18;

  if (discount > 0) {
    ctx.textAlign = 'left';
    ctx.fillText('Diskon', 15, y);
    ctx.textAlign = 'right';
    ctx.fillText('- ' + formatNumber(discount), width - 15, y);
    y += 18;
  }
  if (taxPct > 0) {
    ctx.textAlign = 'left';
    ctx.fillText(`PPN (${taxPct}%)`, 15, y);
    ctx.textAlign = 'right';
    ctx.fillText('+ ' + formatNumber(taxAmount), width - 15, y);
    y += 18;
  }
  if (serviceFee > 0) {
    ctx.textAlign = 'left';
    ctx.fillText(serviceLabel, 15, y);
    ctx.textAlign = 'right';
    ctx.fillText('+ ' + formatNumber(serviceFee), width - 15, y);
    y += 18;
  }
  y += 4;

  ctx.font = '900 18px Arial Black, Roboto Condensed, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('TOTAL', 15, y);
  ctx.textAlign = 'right';
  ctx.fillText(formatNumber(grandTotal), width - 15, y);
  y += 20;

  // Divider
  ctx.beginPath();
  ctx.moveTo(15, y);
  ctx.lineTo(width - 15, y);
  ctx.stroke();
  y += 18;

  // Payment
  const payMethod = document.getElementById('payment-method').value;
  const payAmount = parseFloat(document.getElementById('pay-amount').value) || grandTotal;
  ctx.font = '800 14px Roboto Condensed, Segoe UI, Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(payMethod, 15, y);
  ctx.textAlign = 'right';
  ctx.fillText(formatNumber(payAmount), width - 15, y);
  y += 20;

  // Divider
  ctx.beginPath();
  ctx.moveTo(15, y);
  ctx.lineTo(width - 15, y);
  ctx.stroke();
  y += 24;

  // Footer Notes
  ctx.font = '600 13px Roboto Condensed, Segoe UI, Arial, sans-serif';
  ctx.textAlign = 'center';
  const footerLines = document.getElementById('footer-note').value.split('\n');
  footerLines.forEach(l => {
    if (l.trim()) {
      ctx.fillText(l.trim(), width / 2, y);
      y += 18;
    }
  });

  y += 10;

  // Trim canvas to content
  const trimmedCanvas = document.createElement('canvas');
  trimmedCanvas.width = width;
  trimmedCanvas.height = y;
  const tCtx = trimmedCanvas.getContext('2d');
  tCtx.drawImage(canvas, 0, 0);

  const link = document.createElement('a');
  link.download = `Nota_${document.getElementById('tx-no').value.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
  link.href = trimmedCanvas.toDataURL('image/png');
  link.click();
  showToast("Gambar nota berhasil diunduh!", "success");
}
