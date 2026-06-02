"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

type Lang = "curl" | "node" | "php" | "python";

const LABELS: Record<Lang, string> = {
  curl: "cURL",
  node: "Node.js",
  php: "PHP",
  python: "Python",
};

export function CodeTabs({ samples }: { samples: Record<Lang, string> }) {
  const [active, setActive] = useState<Lang>("curl");
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(samples[active]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-lg"
      style={{ background: "#0B141A", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center gap-1 px-3 pt-3">
        {(Object.keys(LABELS) as Lang[]).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setActive(l)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              active === l ? "text-white" : "text-gray-400 hover:text-gray-200"
            }`}
            style={active === l ? { background: "rgba(37,211,102,0.15)" } : undefined}
          >
            {LABELS[l]}
          </button>
        ))}
        <button
          type="button"
          onClick={copy}
          className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-300 hover:text-white"
          aria-label="Copy"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Disalin" : "Salin"}
        </button>
      </div>
      <pre className="px-5 pb-5 pt-3 text-xs sm:text-sm text-green-300 font-mono leading-relaxed overflow-x-auto">
        <code>{samples[active]}</code>
      </pre>
    </div>
  );
}