---
name: "9router-ui-generator"
description: "Panduan dan standar implementasi untuk mereplikasi antarmuka pengguna bergaya modern AI gateway/router seperti 9router.com menggunakan React, Tailwind CSS, Lucide Icons, dan Shadcn UI."
---

# 9Router UI Design System & Component Guidelines

Skill ini memandu AI untuk menghasilkan antarmuka pengguna (UI/UX) web dengan estetika tech/developer-centric, clean, minimalis, dan modern khas 9router.com.

## Karakteristik Desain Utama

* **Skema Warna:**
  * Background: Slate/Zinc gelap atau putih bersih (`#09090b` / `bg-zinc-950` untuk Dark Mode, `#ffffff` / `bg-white` untuk Light Mode).
  * Brand & Accent: Emerald/Teal cerah (`#10b981` / `#14b8a6`) atau Electric Indigo/Violet untuk highlight rute, status latency, dan badge API.
  * Border: Garis tipis dan presisi (`border-zinc-200` atau `border-zinc-800/80`).
  * Text: Kontras tajam dengan teks sekunder semi-muted (`text-zinc-500` / `text-zinc-400`).

* **Tipografi & Ikon:**
  * Font Body/Headings: Clean sans-serif sans-ornamen (Inter, Geist Sans).
  * Code & Metrics: Monospace font (Geist Mono, JetBrains Mono) untuk endpoint, latency, token per detik, dan konfigurasi JSON/cURL.
  * Icon Set: Lucide React (stroke width: 1.5–1.75).

* **Micro-Interactions & Surface:**
  * Glassmorphism halus (`backdrop-blur-md bg-white/70` atau `bg-zinc-900/50`).
  * Grid subtle atau dot-pattern background pada hero section.
  * Status indicator: Pulsing dots (`animate-pulse`) untuk status online/fallback node.

---

## Blok Komponen Inti

Setiap kali membuat halaman atau komponen berbasis template ini, sertakan blok-blok berikut:

### 1. Minimal Navbar
Navbar sticky dengan logo brand sederhana, link navigasi minimal, pemilih mode (light/dark), dan tombol CTA "Get API Key" atau "Dashboard".

### 2. High-Impact Hero Section
* **Badge:** Tagline pill kecil di atas judul (misal: `New: Smart Model Fallbacks v2`).
* **Title:** Heading tebal berskala besar dengan gradient text halus pada kata kunci.
* **Dual Action:** Tombol primer kontras tinggi berdampingan dengan tombol sekunder outline cURL copy.

### 3. Interactive Code/Routing Demonstration
Elemen interaktif utama menyerupai visualisasi rute LLM:
* Menampilkan rute fallback (e.g. `Client -> Router -> OpenAI / Anthropic / Local Ollama`).
* Tab switcher untuk cURL, Node.js, dan Python.
* Syntax highlighter minimalis dengan tombol copy 1-klik.

### 4. Metrics & Provider Grid
* Grid kartu dengan border tipis menampilkan metrik real-time: Uptime (99.99%), Latency (<15ms), dan Active Providers.
* Logo/badge provider AI (OpenAI, Claude, DeepSeek, Gemini, Mistral, Groq).

---

## Contoh Boilerplate Komponen (React + Tailwind)

Gunakan struktur Tailwind berikut saat mengimplementasikan halaman landing atau dashboard:

```tsx
import React, { useState } from "react";
import { ArrowRight, Check, Copy, Cpu, ShieldCheck, Zap } from "lucide-react";

export default function HeroRouter() {
  const [copied, setCopied] = useState(false);
  const snippet = `curl [https://api.9router.com/v1/chat/completions](https://api.9router.com/v1/chat/completions) \\
  -H "Authorization: Bearer $ROUTER_KEY" \\
  -d '{"model": "auto:fastest", "messages": [{"role": "user", "content": "Ping"}]}'`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-zinc-950 text-zinc-100 py-24 px-6 md:px-12">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Ultra-low Latency AI Gateway
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight">
          Route AI requests with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">zero downtime</span>.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-zinc-400 text-base md:text-lg max-w-2xl">
          Unified API layer with automatic failover, load balancing, and real-time cost optimization across all major LLM providers.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button className="px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium transition flex items-center gap-2">
            Start Free Routing <ArrowRight className="w-4 h-4"/>
          </button>
          <button className="px-6 py-3 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 font-medium transition">
            View Documentation
          </button>
        </div>

        {/* Code Box Terminal */}
        <div className="mt-14 w-full max-w-2xl text-left bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-950/60 text-xs text-zinc-400 font-mono">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2">bash</span>
            </span>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 hover:text-zinc-200 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400"/> : <Copy className="w-3.5 h-3.5"/>}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="p-4 text-xs md:text-sm font-mono text-zinc-300 overflow-x-auto leading-relaxed">
            {snippet}
          </pre>
        </div>
      </div>
    </section>
  );
}