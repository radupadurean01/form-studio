# Form Studio — Handoff Checklist

Personal notes for handing the project off to the client. This file is gitignored — keep it local.

---

## Current state of services

| Service | Status | Account / Owner |
|---|---|---|
| GitHub repo | `danielvinersar21/form-studio` | Daniel |
| Netlify | Deploys from `master` branch | Daniel (`daniel.vinersar.ux@gmail.com`) |
| Supabase | Project ref `uzxcskiscnafwynalxja` | Daniel |
| Resend (SMTP) | Free tier, shared sender `onboarding@resend.dev` | Daniel (`daniel.vinersar.ux@gmail.com`) |
| Domain | ❌ Not yet purchased — client to buy | Client |

---

## ⚠️ Known interim limitations

These exist because the client doesn't have a domain yet. All resolved by the post-handoff domain setup below.

- **Magic link emails can only be sent to `daniel.vinersar.ux@gmail.com`** — Resend's sandbox restriction with the shared sender. `ADMIN_ALLOWED_EMAILS` is currently set to that gmail address for this reason.
- **Email "From" address is `onboarding@resend.dev`** — looks unprofessional, will be replaced with `noreply@<client-domain>` once domain is verified.
- **Site is on `form-studio.netlify.app`** — will need DNS pointing once client buys domain.
- **Email rate limit: 30/hour** — fine for admin login, but bump if client needs higher volume later.

---

## ✅ Before handoff (Daniel — to complete)

### Code & deploy
- [ ] Verify production deploy is green and admin login works end-to-end
- [ ] Test all admin sections (testimonials, team, submissions, tour, programs, memberships, settings, legal pages)
- [ ] Test public site on mobile + desktop
- [ ] Run `npm run build` locally to catch any prod-only build errors
- [ ] Confirm all forms submit correctly (contact, etc.)

### Supabase
- [ ] Confirm Site URL is set to production Netlify URL
- [ ] Confirm Redirect URLs allowlist contains both prod and `localhost:3000` callback paths
- [ ] Confirm RLS policies are enabled on all tables (no public write access)
- [ ] Take a database backup (Supabase Dashboard → Database → Backups)

### Netlify env vars (current set — verify all present, NOT marked secret unless noted)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` (general)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` (general)
- [ ] `ADMIN_ALLOWED_EMAILS` (general) — currently `daniel.vinersar.ux@gmail.com`

### Documentation for client
- [ ] Prepare a short admin user guide (how to log in, edit testimonials, manage team, etc.) — could be a Loom video or PDF
- [ ] List of what's pending and why (this file's "Post-handoff" section, cleaned up)
- [ ] Pricing summary: monthly costs (Supabase free tier, Netlify free tier, Resend free tier, future domain ~10€/year)

---

## 🤝 During handoff (with client present)

### Account ownership transfer
- [ ] Add client as **collaborator** on GitHub repo (Settings → Collaborators)
- [ ] Add client as **team member** on Netlify (Site → Team → Invite)
- [ ] Add client as **organization member** on Supabase (Org settings → Invite)
- [ ] Add client as **team member** on Resend (Settings → Team)
- [ ] Demonstrate admin login flow live
- [ ] Walk through each admin section's purpose

### Domain purchase (if client buying during meeting)
- [ ] Recommend a registrar (Cloudflare Registrar = cheapest, no markup; Namecheap = simpler UI)
- [ ] Help client purchase the domain
- [ ] Save registrar account credentials somewhere both have access to (1Password / shared notes)

---

## 🚀 After handoff (client's domain setup — ~30 min total)

Do this once the client has bought their domain (e.g., `formstudio.ro`).

### 1. Point domain at Netlify
- [ ] Netlify → Site settings → Domain management → **Add custom domain** → enter `formstudio.ro`
- [ ] At the registrar (Cloudflare/Namecheap), add the DNS records Netlify shows:
  - Apex `A` record → Netlify's load balancer IP
  - `www` `CNAME` record → `<site>.netlify.app`
- [ ] Wait for DNS propagation (~5–30 min)
- [ ] Netlify auto-provisions free SSL via Let's Encrypt (no action needed)

### 2. Update Supabase Site URL
- [ ] Supabase Dashboard → **Authentication → URL Configuration**
- [ ] Change **Site URL** from `https://form-studio.netlify.app` to `https://formstudio.ro`
- [ ] Update Redirect URLs allowlist:
  - `https://formstudio.ro/admin/auth/callback`
  - `http://localhost:3000/admin/auth/callback` (keep for dev)

### 3. Verify domain in Resend
- [ ] Resend Dashboard → **Domains → Add Domain** → enter `formstudio.ro`
- [ ] Resend shows 3 DNS records (SPF, DKIM, return-path) — add them at the registrar
- [ ] Wait ~5 min, click **Verify** in Resend
- [ ] Status should turn green ✅

### 4. Update Supabase SMTP sender
- [ ] Supabase Dashboard → **Authentication → Emails → SMTP Settings**
- [ ] Change **Sender email** from `onboarding@resend.dev` to `noreply@formstudio.ro`
- [ ] Change **Sender name** to whatever client prefers (e.g., `Form Studio`)
- [ ] Save changes

### 5. Update admin allowlist with client's real email(s)
- [ ] Netlify → Environment variables → edit `ADMIN_ALLOWED_EMAILS`
- [ ] Replace `daniel.vinersar.ux@gmail.com` with client's preferred admin email(s)
- [ ] Trigger redeploy with **Clear cache and deploy site**

### 6. Test end-to-end with client's email
- [ ] Log out of admin
- [ ] Go to `https://formstudio.ro/admin/login`
- [ ] Enter client's admin email
- [ ] Receive magic link from `noreply@formstudio.ro` (check inbox + spam)
- [ ] Click link → land on admin dashboard ✅

### 7. Cleanup
- [ ] Remove Daniel's gmail from `ADMIN_ALLOWED_EMAILS` (unless client wants ongoing dev access)
- [ ] Optionally: delete Daniel's user from Supabase Auth → Users
- [ ] Remove Daniel as collaborator from any service the client wants full ownership of

---

## 📌 Things to mention to the client

- **Free tier limits:** Supabase 500MB DB / 5GB bandwidth / 50K monthly auth users. Netlify 100GB bandwidth/month. Resend 100 emails/day / 3000/month. Plenty of headroom for a small business site.
- **What happens if a quota is exceeded:** services pause, don't auto-charge. Client can upgrade if needed.
- **Backups:** Supabase auto-backups daily on paid plans; on free tier, manual download recommended monthly.
- **Domain auto-renewal:** make sure it's enabled so the site doesn't go dark.
- **Adding more admins later:** just add another email to `ADMIN_ALLOWED_EMAILS` (comma-separated), redeploy.

---

## 🔑 Credentials to share with client (use a password manager / encrypted note)

Don't paste any of these into this file. Share via 1Password, Bitwarden shared vault, or similar.

- GitHub repo URL + invite
- Netlify login (if creating new account, or invite to existing)
- Supabase login + project URL
- Resend login
- Domain registrar login
- Any API keys client should have access to (Supabase anon key — already public, safe; service role key if ever added)

---

## 🧹 Post-handoff for Daniel (housekeeping)

- [ ] Move local `.env.local` into a password manager backup, then optionally delete locally
- [ ] Archive the GitHub repo on personal account if no longer maintaining
- [ ] Update portfolio with launched URL once the domain is live
- [ ] Send invoice / collect final payment 💰
