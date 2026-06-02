import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code, BookOpen, Webhook, Key, Send, Inbox, Users, ShieldCheck, Activity } from "lucide-react";
import { CodeTabs } from "@/components/CodeTabs";

export const metadata: Metadata = {
  title: "Dokumentasi API",
  description: "Dokumentasi REST API & Webhook untuk integrasi Rizquna WhatsApp Gateway ke sistem Anda.",
};

const SEND_TEXT = {
  curl: `curl -X POST https://wa.rizquna.id/api/v1/messages \\
  -H "Authorization: Bearer rzq_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "6281234567890",
    "type": "text",
    "text": { "body": "Halo dari Rizquna!" }
  }'`,
  node: `import fetch from "node-fetch";

const res = await fetch("https://wa.rizquna.id/api/v1/messages", {
  method: "POST",
  headers: {
    "Authorization": "Bearer rzq_YOUR_API_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    to: "6281234567890",
    type: "text",
    text: { body: "Halo dari Rizquna!" },
  }),
});
console.log(await res.json());`,
  php: `<?php
$ch = curl_init("https://wa.rizquna.id/api/v1/messages");
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST           => true,
  CURLOPT_HTTPHEADER     => [
    "Authorization: Bearer rzq_YOUR_API_KEY",
    "Content-Type: application/json",
  ],
  CURLOPT_POSTFIELDS     => json_encode([
    "to"   => "6281234567890",
    "type" => "text",
    "text" => ["body" => "Halo dari Rizquna!"],
  ]),
]);
echo curl_exec($ch);
curl_close($ch);`,
  python: `import requests

res = requests.post(
    "https://wa.rizquna.id/api/v1/messages",
    headers={
        "Authorization": "Bearer rzq_YOUR_API_KEY",
        "Content-Type": "application/json",
    },
    json={
        "to": "6281234567890",
        "type": "text",
        "text": {"body": "Halo dari Rizquna!"},
    },
    timeout=10,
)
print(res.json())`,
};

const SEND_TEMPLATE = {
  curl: `curl -X POST https://wa.rizquna.id/api/v1/messages \\
  -H "Authorization: Bearer rzq_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "6281234567890",
    "type": "template",
    "template": {
      "name": "order_confirmation",
      "language": { "code": "id" },
      "components": [{
        "type": "body",
        "parameters": [
          { "type": "text", "text": "Andi" },
          { "type": "text", "text": "RZQ-1023" }
        ]
      }]
    }
  }'`,
  node: `await fetch("https://wa.rizquna.id/api/v1/messages", {
  method: "POST",
  headers: {
    "Authorization": "Bearer rzq_YOUR_API_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    to: "6281234567890",
    type: "template",
    template: {
      name: "order_confirmation",
      language: { code: "id" },
      components: [{
        type: "body",
        parameters: [
          { type: "text", text: "Andi" },
          { type: "text", text: "RZQ-1023" },
        ],
      }],
    },
  }),
});`,
  php: `<?php
$payload = [
  "to"   => "6281234567890",
  "type" => "template",
  "template" => [
    "name"     => "order_confirmation",
    "language" => ["code" => "id"],
    "components" => [[
      "type" => "body",
      "parameters" => [
        ["type" => "text", "text" => "Andi"],
        ["type" => "text", "text" => "RZQ-1023"],
      ],
    ]],
  ],
];
$ch = curl_init("https://wa.rizquna.id/api/v1/messages");
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST           => true,
  CURLOPT_HTTPHEADER     => [
    "Authorization: Bearer rzq_YOUR_API_KEY",
    "Content-Type: application/json",
  ],
  CURLOPT_POSTFIELDS     => json_encode($payload),
]);
echo curl_exec($ch);`,
  python: `import requests

requests.post(
    "https://wa.rizquna.id/api/v1/messages",
    headers={"Authorization": "Bearer rzq_YOUR_API_KEY"},
    json={
        "to": "6281234567890",
        "type": "template",
        "template": {
            "name": "order_confirmation",
            "language": {"code": "id"},
            "components": [{
                "type": "body",
                "parameters": [
                    {"type": "text", "text": "Andi"},
                    {"type": "text", "text": "RZQ-1023"},
                ],
            }],
        },
    },
)`,
};

const WEBHOOK = {
  curl: `# Verifikasi (Meta menghubungi Anda dengan GET)
curl "https://your.app/webhook?hub.mode=subscribe&hub.verify_token=YOUR_TOKEN&hub.challenge=12345"`,
  node: `import express from "express";
const app = express();
app.use(express.json());

// Verifikasi webhook (GET)
app.get("/webhook", (req, res) => {
  if (req.query["hub.verify_token"] === process.env.VERIFY_TOKEN) {
    return res.send(req.query["hub.challenge"]);
  }
  res.sendStatus(403);
});

// Terima event (POST)
app.post("/webhook", (req, res) => {
  console.log("event:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});`,
  php: `<?php
// webhook.php
if ($_SERVER["REQUEST_METHOD"] === "GET") {
  if (($_GET["hub_verify_token"] ?? "") === $_ENV["VERIFY_TOKEN"]) {
    echo $_GET["hub_challenge"] ?? "";
    exit;
  }
  http_response_code(403);
  exit;
}
$body = json_decode(file_get_contents("php://input"), true);
file_put_contents("/tmp/wa-webhook.log", json_encode($body) . "\\n", FILE_APPEND);
http_response_code(200);`,
  python: `from fastapi import FastAPI, Request, HTTPException
app = FastAPI()

@app.get("/webhook")
async def verify(request: Request):
    if request.query_params.get("hub.verify_token") == VERIFY_TOKEN:
        return request.query_params.get("hub.challenge")
    raise HTTPException(403)

@app.post("/webhook")
async def receive(request: Request):
    body = await request.json()
    print("event:", body)
    return {"ok": True}`,
};

const TOPICS = [
  { icon: BookOpen, title: "Getting Started", desc: "Setup workspace, generate API key, dan kirim pesan pertama.", anchor: "#getting-started" },
  { icon: Key, title: "Authentication", desc: "Bearer token, format API key, dan rate limit per workspace.", anchor: "#authentication" },
  { icon: Send, title: "Send Text", desc: "POST /api/v1/messages — pesan teks langsung.", anchor: "#send-text" },
  { icon: Send, title: "Send Template", desc: "Kirim template Meta-approved untuk pesan di luar 24-hour window.", anchor: "#send-template" },
  { icon: Inbox, title: "Receive Messages", desc: "Webhook real-time untuk pesan masuk, status, dan event lain.", anchor: "#webhook" },
  { icon: Users, title: "Contacts & Groups", desc: "Manage kontak, label, atribut custom, dan segmentasi.", anchor: "#contacts" },
  { icon: ShieldCheck, title: "Security", desc: "Enkripsi token, rotasi API key, dan audit log.", anchor: "#security" },
  { icon: Activity, title: "Rate Limits", desc: "Burst & sustained rate limit per paket.", anchor: "#rate-limits" },
];

export default function DocsPage() {
  return (
    <>
      <section className="pt-16 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--rizquna-green)" }}>
            Dokumentasi API
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mt-3">
            Mulai <span className="gradient-text">Mengintegrasikan</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
            REST API yang sederhana, dokumentasi lengkap, dan contoh kode untuk semua bahasa populer.
          </p>
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TOPICS.map((t) => {
            const Icon = t.icon;
            return (
              <a
                key={t.title}
                href={t.anchor}
                className="rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:shadow"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-2"
                  style={{ background: "rgba(37,211,102,0.1)", color: "var(--rizquna-green)" }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm">{t.title}</h3>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t.desc}
                </p>
              </a>
            );
          })}
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-14">
        <DocSection id="getting-started" title="Getting Started">
          <ol className="list-decimal pl-6 space-y-1.5">
            <li>Daftar akun di <Link href="/register" className="font-semibold" style={{ color: "var(--rizquna-green)" }}>halaman register</Link>.</li>
            <li>Buka <Link href="/dashboard" className="font-semibold" style={{ color: "var(--rizquna-green)" }}>Dashboard</Link>, klik <strong>API Keys</strong>, lalu buat key baru.</li>
            <li>Hubungkan nomor WhatsApp Business API di panel <Link href="/admin" className="font-semibold" style={{ color: "var(--rizquna-green)" }}>Admin Gateway</Link>.</li>
            <li>Lakukan request pertama Anda dengan contoh kode di bawah.</li>
          </ol>
        </DocSection>

        <DocSection id="authentication" title="Authentication">
          <p>
            Setiap request HTTP harus menyertakan header <code>Authorization: Bearer rzq_YOUR_API_KEY</code>.
            API key dibuat di Dashboard dan hanya ditampilkan satu kali — simpan baik-baik.
          </p>
          <p>
            API key memiliki prefix <code>rzq_</code> diikuti 32 karakter base64url. Format ini
            stabil dan aman untuk penyimpanan di password manager.
          </p>
        </DocSection>

        <DocSection id="send-text" title="Kirim Pesan Teks">
          <p>Pesan teks langsung. Hanya valid untuk kontak yang membalas Anda dalam 24 jam terakhir.</p>
          <CodeTabs samples={SEND_TEXT} />
        </DocSection>

        <DocSection id="send-template" title="Kirim Pesan Template">
          <p>
            Untuk pesan di luar 24-hour window, gunakan template yang sudah di-approve Meta.
            Variabel dinamis <code>{`{{1}}`}</code>, <code>{`{{2}}`}</code> dst diisi via <code>parameters</code>.
          </p>
          <CodeTabs samples={SEND_TEMPLATE} />
        </DocSection>

        <DocSection id="webhook" title="Webhook Real-time">
          <p>
            Setup endpoint webhook untuk menerima pesan masuk, status delivery, dan event lainnya
            dalam real-time. Kami akan retry 5 kali dengan exponential backoff jika endpoint Anda gagal merespon.
          </p>
          <CodeTabs samples={WEBHOOK} />
          <ul className="list-disc pl-6 space-y-1.5">
            <li><strong>message.received</strong> — pesan masuk dari pelanggan</li>
            <li><strong>message.delivered</strong> — pesan terkirim ke device</li>
            <li><strong>message.read</strong> — pesan dibaca</li>
            <li><strong>message.failed</strong> — gagal kirim</li>
          </ul>
        </DocSection>

        <DocSection id="contacts" title="Manajemen Kontak">
          <p>
            Endpoint <code>/api/v1/contacts</code> memungkinkan Anda membuat, mengelompokkan, dan
            memberi atribut custom pada kontak. Setiap kontak bisa di-tag untuk segmentasi
            broadcast yang presisi.
          </p>
        </DocSection>

        <DocSection id="security" title="Keamanan">
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Token WABA dienkripsi <strong>AES-256-GCM</strong></li>
            <li>Password user di-hash dengan <strong>bcrypt</strong> (cost 12)</li>
            <li>API key disimpan sebagai <strong>SHA-256 hash</strong> — plaintext tidak pernah disimpan</li>
            <li>Semua koneksi via <strong>TLS 1.3</strong></li>
            <li>Rotasi API key kapan saja melalui Dashboard</li>
          </ul>
        </DocSection>

        <DocSection id="rate-limits" title="Rate Limits">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--bg-surface)" }}>
                <th className="text-left p-3 font-bold">Paket</th>
                <th className="text-left p-3 font-bold">Burst</th>
                <th className="text-left p-3 font-bold">Sustained</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderTop: "1px solid var(--border-light)" }}>
                <td className="p-3">Free</td><td className="p-3">10 req</td><td className="p-3">1 req/s</td>
              </tr>
              <tr style={{ borderTop: "1px solid var(--border-light)" }}>
                <td className="p-3">Business</td><td className="p-3">60 req</td><td className="p-3">10 req/s</td>
              </tr>
              <tr style={{ borderTop: "1px solid var(--border-light)" }}>
                <td className="p-3">Professional</td><td className="p-3">200 req</td><td className="p-3">50 req/s</td>
              </tr>
              <tr style={{ borderTop: "1px solid var(--border-light)" }}>
                <td className="p-3">Enterprise</td><td className="p-3">Custom</td><td className="p-3">Custom</td>
              </tr>
            </tbody>
          </table>
        </DocSection>
      </article>

      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Code className="w-10 h-10 mx-auto" style={{ color: "var(--rizquna-green)" }} />
          <h3 className="text-2xl sm:text-3xl font-bold mt-4">Butuh bantuan integrasi?</h3>
          <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
            Tim Developer Relations kami senang membantu. Hubungi kami untuk konsultasi atau review
            arsitektur Anda.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:-translate-y-1 shadow-lg mt-6"
            style={{ background: "var(--rizquna-green)" }}
          >
            Hubungi Tim Developer Relations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function DocSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">{title}</h2>
      <div className="text-sm leading-relaxed space-y-4 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-[var(--bg-surface)] [&_code]:font-mono [&_code]:text-[13px]" style={{ color: "var(--text-secondary)" }}>
        {children}
      </div>
    </section>
  );
}