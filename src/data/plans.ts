export type Plan = {
  name: string;
  desc: string;
  monthly: string;
  yearly: string;
  limits: string[];
  href: string;
  cta: string;
  highlight?: boolean;
  features: Record<string, boolean>;
};

export const PLANS: Plan[] = [
  {
    name: "Free",
    desc: "Mulai kirim pesan WhatsApp tanpa biaya.",
    monthly: "Rp0",
    yearly: "Rp0",
    limits: ["1 nomor WhatsApp", "100 pesan/bulan", "Dashboard dasar", "API access"],
    href: "/register",
    cta: "Mulai Gratis",
    features: {
      "API Gateway & Wrapper": true,
      "Dashboard pengiriman": true,
      "Webhook masuk": false,
      "Manajemen kontak": true,
      "Dukungan prioritas": false,
    },
  },
  {
    name: "Starter",
    desc: "Untuk UMKM dan toko online kecil.",
    monthly: "Rp99rb",
    yearly: "Rp79rb/bln",
    limits: ["1 nomor WhatsApp", "5.000 pesan/bulan", "Webhook", "Email support"],
    href: "/register",
    cta: "Coba Starter",
    features: {
      "API Gateway & Wrapper": true,
      "Dashboard pengiriman": true,
      "Webhook masuk": true,
      "Manajemen kontak": true,
      "Dukungan prioritas": false,
    },
  },
  {
    name: "Growth",
    desc: "Paket populer untuk bisnis berkembang.",
    monthly: "Rp249rb",
    yearly: "Rp199rb/bln",
    limits: ["3 nomor WhatsApp", "25.000 pesan/bulan", "Template & webhook", "Priority support"],
    href: "/register",
    cta: "Pilih Growth",
    highlight: true,
    features: {
      "API Gateway & Wrapper": true,
      "Dashboard pengiriman": true,
      "Webhook masuk": true,
      "Manajemen kontak": true,
      "Dukungan prioritas": true,
    },
  },
  {
    name: "Enterprise",
    desc: "Untuk kebutuhan skala besar dan custom.",
    monthly: "Custom",
    yearly: "Custom",
    limits: ["Nomor unlimited", "Pesan high volume", "SLA khusus", "Integrasi custom"],
    href: "/contact",
    cta: "Hubungi Kami",
    features: {
      "API Gateway & Wrapper": true,
      "Dashboard pengiriman": true,
      "Webhook masuk": true,
      "Manajemen kontak": true,
      "Dukungan prioritas": true,
    },
  },
];

export const FEATURE_GROUPS = [
  {
    title: "Fitur Utama",
    items: ["API Gateway & Wrapper", "Dashboard pengiriman", "Webhook masuk"],
  },
  {
    title: "Manajemen & Dukungan",
    items: ["Manajemen kontak", "Dukungan prioritas"],
  },
];
