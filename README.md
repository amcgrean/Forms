# Beisser Lumber — Pro Account Request Page

A Next.js application that replaces the self-registration flow on `pro.beisserlumber.com` with a **Request Account** form. Customers submit their info; Beisser staff reviews and sends the invite manually from the ERP.

---

## Local Development

### Prerequisites

- Node.js 18+
- A [Resend](https://resend.com) account with `beisserlumber.com` domain verified

### Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/amcgrean/Forms.git
   cd Forms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create your local env file**
   ```bash
   cp .env.example .env.local
   ```
   Then fill in the values in `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxx
   FROM_EMAIL=noreply@beisserlumber.com
   TO_EMAIL=ar@beisserlumber.com
   ```

4. **Add the Beisser logo**
   Place `logo.png` in the `public/` directory.

5. **Run the dev server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

---

## Resend Domain Verification

Before the email API will work, verify `beisserlumber.com` in Resend:

1. Sign up at [resend.com](https://resend.com)
2. Go to **Domains → Add Domain** → enter `beisserlumber.com`
3. Add the DNS records Resend provides (TXT + MX records) — typically resolves in ~5 minutes
4. Once verified, copy your API key from the Resend dashboard
5. Add it to `.env.local` (locally) and to Vercel environment variables (production)

---

## Vercel Deployment

1. Push this repo to GitHub (already done)
2. Go to [vercel.com](https://vercel.com) → **New Project** → import `amcgrean/Forms`
3. Vercel auto-detects Next.js — no build config needed (`vercel.json` is included)
4. Add environment variables under **Settings → Environment Variables**:
   - `RESEND_API_KEY`
   - `FROM_EMAIL`
   - `TO_EMAIL`
5. Click **Deploy** — auto-deploys on every push to `main`

### Custom Domain (Optional)

To serve the page at `pro-account.beisserlumber.com`:

1. In the Vercel dashboard, go to **Settings → Domains** and add `pro-account.beisserlumber.com`
2. In your DNS provider, add:
   ```
   CNAME  pro-account  cname.vercel-dns.com
   ```
3. Vercel will auto-provision an SSL certificate

---

## WordPress Integration

### Option A: iframe Embed (Preferred)

Create a WordPress page at `/pro-account` and paste:

```html
<iframe
  src="https://pro-account.beisserlumber.com"
  width="100%"
  height="900px"
  frameborder="0"
  style="border:none; display:block;">
</iframe>
```

### Option B: Redirect

Using the WordPress Redirection plugin or `.htaccess`:

```
Redirect 301 /pro-account https://pro-account.beisserlumber.com
```

---

## Environment Variables Reference

| Variable         | Description                                          | Example                          |
|------------------|------------------------------------------------------|----------------------------------|
| `RESEND_API_KEY` | API key from Resend dashboard                        | `re_xxxxxxxxxxxx`                |
| `FROM_EMAIL`     | Verified sender address (must be on verified domain) | `noreply@beisserlumber.com`      |
| `TO_EMAIL`       | Staff recipient for request notifications            | `ar@beisserlumber.com`           |

**Never commit `.env.local` or any file containing real credentials.**

---

## Project Structure

```
├── pages/
│   ├── index.jsx          # Landing page — three-section portal layout
│   └── api/
│       └── submit.js      # Serverless API — validates and emails via Resend
├── components/
│   └── RequestForm.jsx    # Inline accordion form with validation and states
├── public/
│   └── logo.png           # Add manually — not committed to repo
├── styles/
│   └── globals.css        # Brand colors and base reset
├── .env.example           # Template — commit this, never .env.local
├── vercel.json            # Vercel framework config
└── README.md
```
