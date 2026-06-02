"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

type Props = { userName: string; token: string };
type UiState = "idle" | "creating" | "waiting" | "ready" | "connected" | "error";

interface QrPayload {
  qrImage?: string;
  sessionName?: string;
}

interface ReadyPayload {
  sessionName?: string;
  number?: string;
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function ScanQrClient({ userName, token }: Props) {
  const [state, setState] = useState<UiState>("idle");
  const [qr, setQr] = useState<string | null>(null);
  const [sessionName, setSessionName] = useState<string | null>(null);
  const [message, setMessage] = useState("Belum ada device aktif.");
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [connectedNumber, setConnectedNumber] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const pollingRef = useRef(0);

  const badge = useMemo(() => {
    if (state === "connected") return ["Terhubung", "bg-emerald-100 text-emerald-700 ring-emerald-200"];
    if (state === "error") return ["Error", "bg-red-100 text-red-700 ring-red-200"];
    if (state === "creating" || state === "waiting" || state === "ready") return ["Menunggu QR", "bg-amber-100 text-amber-700 ring-amber-200"];
    return ["Idle", "bg-slate-100 text-slate-600 ring-slate-200"];
  }, [state]);

  useEffect(() => {
    const socket = io({
      path: "/socket.io",
      transports: ["websocket", "polling"],
      auth: { token },
    });
    socketRef.current = socket;

    socket.on("connect", () => setMessage((m) => (m === "Belum ada device aktif." ? "Realtime tersambung. Siap membuat QR." : m)));
    socket.on("qr", (payload: QrPayload) => {
      if (payload?.qrImage && (!sessionName || payload.sessionName === sessionName)) {
        setQr(payload.qrImage);
        setSessionName(payload.sessionName || sessionName);
        setState("ready");
        setProgress(100);
        setCountdown(60);
        setMessage("QR siap. Scan sebelum expired.");
      }
    });
    socket.on("ready", (payload: ReadyPayload) => {
      if (!sessionName || payload?.sessionName === sessionName) {
        setState("connected");
        setQr(null);
        setConnectedNumber(payload?.number || null);
        setMessage("WhatsApp berhasil terhubung.");
      }
    });
    socket.on("auth_failure", () => {
      setState("error");
      setMessage("Autentikasi gagal. Buat QR baru lalu scan ulang.");
    });
    socket.on("disconnected", () => {
      setState("error");
      setMessage("Device terputus. Buat QR baru untuk reconnect.");
    });
    return () => { socket.disconnect(); };
  }, [sessionName, token]);

  useEffect(() => {
    if (!countdown) return;
    const t = setInterval(() => setCountdown((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  async function pollQr(sn: string, token: number) {
    setProgress(8);
    for (let i = 0; i < 30; i++) {
      if (pollingRef.current !== token) return;
      try {
        const res = await fetch(`/api/gateway/devices/${encodeURIComponent(sn)}/qr`, { cache: "no-store" });
        const data = await res.json();
        if (res.ok && data?.status && data?.data?.qrImage) {
          setQr(data.data.qrImage);
          setState("ready");
          setProgress(100);
          setCountdown(60);
          setMessage("QR siap. Scan dari WhatsApp → Perangkat tertaut.");
          return;
        }
      } catch {}
      setProgress(Math.min(95, 8 + (i + 1) * 3));
      setMessage(`Menyiapkan QR... ${i + 1}/30`);
      await wait(2000);
    }
    setState("error");
    setMessage("QR belum siap. Klik ulang tombol untuk membuat sesi baru.");
  }

  async function createDevice() {
    const token = Date.now();
    pollingRef.current = token;
    setState("creating");
    setQr(null);
    setConnectedNumber(null);
    setProgress(3);
    setCountdown(0);
    setMessage("Membuat device baru...");
    try {
      const res = await fetch("/api/gateway/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: `Device ${new Date().toLocaleString("id-ID")}` }),
      });
      const data = await res.json();
      if (!res.ok || !data?.status) throw new Error(data?.message || data?.error || "Gagal membuat device");
      const sn = data.data?.sessionName;
      setSessionName(sn);
      setState("waiting");
      setMessage("Device dibuat. Mengambil QR...");
      setProgress(15);
      if (sn) pollQr(sn, token);
    } catch (e: unknown) {
      setState("error");
      setProgress(0);
      const errMsg = e instanceof Error ? e.message : "Gagal membuat device.";
      setMessage(errMsg);
    }
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border shadow-sm" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
      <div className="flex items-center justify-between border-b px-6 py-5" style={{ borderColor: "var(--border-light)" }}>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--text-tertiary)" }}>Admin aktif</p>
          <h2 className="mt-1 text-lg font-black">{userName}</h2>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${badge[1]}`}>{badge[0]}</span>
      </div>

      <div className="p-6">
        <div className="relative grid aspect-square place-items-center overflow-hidden rounded-[1.5rem] border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
          {qr ? (
            <img src={qr} alt="QR WhatsApp pairing" className="relative z-10 h-[82%] w-[82%] rounded-2xl bg-white p-3 shadow-md" />
          ) : state === "creating" || state === "waiting" ? (
            <div className="relative z-10 text-center">
              <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
              <p className="mt-4 font-bold" style={{ color: "var(--text-secondary)" }}>Menyiapkan QR...</p>
            </div>
          ) : state === "connected" ? (
            <div className="relative z-10 text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-600 text-4xl text-white">✓</div>
              <p className="mt-4 font-black text-emerald-700">WhatsApp Connected</p>
              {connectedNumber && <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>{connectedNumber}</p>}
            </div>
          ) : (
            <div className="relative z-10 text-center" style={{ color: "var(--text-secondary)" }}>
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-white text-4xl shadow-sm">▦</div>
              <p className="mt-4 font-bold">QR belum dibuat</p>
            </div>
          )}
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full" style={{ background: "var(--bg-surface)" }}>
          <div className="h-full rounded-full bg-emerald-600 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        <div className="mt-4 rounded-2xl p-4 text-sm" style={{ background: "var(--bg-secondary)", color: "var(--text-secondary)" }}>
          <p className="font-semibold" style={{ color: "var(--text-primary)" }}>{message}</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {sessionName && <span className="rounded-full px-3 py-1 border" style={{ background: "var(--bg-card)", color: "var(--text-secondary)", borderColor: "var(--border)" }}>{sessionName}</span>}
            {countdown > 0 && <span className="rounded-full bg-amber-50 px-3 py-1 font-bold text-amber-700 ring-1 ring-amber-200">expired ±{countdown}s</span>}
          </div>
        </div>

        <button onClick={createDevice} disabled={state === "creating" || state === "waiting"} className="mt-5 w-full rounded-2xl bg-emerald-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none">
          {state === "creating" || state === "waiting" ? "Sedang membuat QR..." : qr ? "Buat QR Baru" : "Buat Device / Tampilkan QR"}
        </button>

        <ol className="mt-5 space-y-2 text-sm text-slate-500">
          <li>1. Buka WhatsApp di HP.</li>
          <li>2. Pilih <b>Perangkat tertaut</b>.</li>
          <li>3. Tekan <b>Tautkan perangkat</b>, lalu scan QR.</li>
        </ol>
      </div>
    </div>
  );
}
