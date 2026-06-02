# Rizquna WA Web — Next.js public site + auth

Production: https://wa.rizquna.id

## Stack

- Next.js 16.2.6 (App Router, standalone output)
- React 19.2
- TailwindCSS 3.4
- better-sqlite3 + bcryptjs + jose (auth)
- Cloudflare Tunnel ingress (token-managed)

## Routing

| Path | Target |
|---|---|
| `/`, `/features`, `/pricing`, `/use-cases`, `/faq`, `/about`, `/contact`, `/docs`, `/blog`, `/changelog`, `/privacy-policy`, `/terms-of-service` | Static Next.js page |
| `/login`, `/register`, `/dashboard` | Dynamic, JWT-cookie session |
| `/api/auth/*` | Register, login, logout |
| `/admin`, `/admin/*` | Rewrite ke wa-gateway (`http://wa_gateway:3000`) |
| `/api/wa/*` | Rewrite ke wa-gateway `/api/*` |

## Ports

- Container internal: `8089`
- Host bind: `127.0.0.1:8088` → Cloudflare Tunnel target
- Cloudflare Tunnel: `wa.rizquna.id` → `http://localhost:8088`

`wa-gateway` (Express) sudah dipindah ke port internal `8090`.

## Env vars (`.env.production`)

| Key | Required | Default | Notes |
|---|---|---|---|
| `AUTH_SECRET` | Yes | — | 32+ char random hex; rotate any time. Existing sessions invalidate. |
| `DATA_DIR` | No | `/app/data` | SQLite location di volume `rizquna_web_data`. |
| `WA_GATEWAY_URL` | No | `http://wa_gateway:3000` | Backend Express target untuk rewrites. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | — | Aktifkan Plausible analytics. |
| `NEXT_PUBLIC_PLAUSIBLE_HOST` | No | `https://plausible.io` | Self-hosted Plausible? Set domainnya. |
| `NEXT_PUBLIC_UMAMI_SRC` + `NEXT_PUBLIC_UMAMI_ID` | No | — | Aktifkan Umami. |
| `NEXT_PUBLIC_GA_ID` | No | — | Aktifkan GA4. |

`AUTH_SECRET` dipakai saat build (untuk Next compile) **dan** runtime. Sudah di-handle env_file + Dockerfile.

## Lifecycle

```bash
cd /home/rizqunaid/wa-rizquna-web
docker compose build
docker compose up -d
docker compose logs -f
docker compose down
```

Container `restart: always` + Docker daemon `enabled` → auto-start saat host reboot.

## Optional: systemd unit

Untuk menambah systemd-level supervision (failsafe kalau Docker daemon dibikin disabled):

```bash
sudo cp wa-rizquna-web.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now wa-rizquna-web.service
```

## Database

SQLite di volume Docker `wa-rizquna-web_rizquna_web_data`.

Backup:

```bash
docker run --rm -v wa-rizquna-web_rizquna_web_data:/data \
  -v "$(pwd)":/backup alpine \
  tar czf /backup/rizquna-data-$(date +%F).tar.gz -C /data .
```

Restore:

```bash
docker compose down
docker run --rm -v wa-rizquna-web_rizquna_web_data:/data \
  -v "$(pwd)":/backup alpine \
  tar xzf /backup/rizquna-data-2026-05-26.tar.gz -C /data
docker compose up -d
```

## Smoke tests

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://wa.rizquna.id/
curl -s -o /dev/null -w "%{http_code}\n" https://wa.rizquna.id/admin
curl -s -o /dev/null -w "%{http_code}\n" https://wa.rizquna.id/sitemap.xml
```

## Auth flow

1. `POST /api/auth/register {name,email,password,phone?,company?}` — bcrypt hash, insert SQLite, set JWT cookie `rzq_session` (HttpOnly, SameSite=Lax, 7d).
2. `POST /api/auth/login {email,password}` — verify, set cookie.
3. `POST /api/auth/logout` — clear cookie.
4. `/dashboard` — server checks `getSession()`, redirects ke `/login` kalau kosong.

## Schema.org JSON-LD

Inject di root layout: `Organization`, `WebSite`, `SoftwareApplication`. Plus `FAQPage` di `/` & `/faq`.

## Pages

| Path | Purpose |
|---|---|
| `/` | Landing dengan hero, fitur, integrasi, pricing, FAQ |
| `/features` | 24 fitur lengkap |
| `/pricing` | 4 plan + tabel comparison + payment info |
| `/how-it-works` | 4 langkah onboarding |
| `/use-cases` | 8 industri |
| `/faq` | 6 kategori, ~20 Q&A |
| `/about` | Misi, visi, nilai |
| `/contact` | Form mailto + WhatsApp + telepon |
| `/docs` | Snippet curl + 6 topik (placeholder) |
| `/blog` | 4 artikel preview (konten placeholder) |
| `/changelog` | 5 release entries |
| `/privacy-policy` | 10 bagian |
| `/terms-of-service` | 10 bagian |
| `/login`, `/register`, `/dashboard` | Auth |
