import Head from 'next/head';
import { useState } from 'react';
import RequestForm from '../components/RequestForm';

const PORTAL_SIGNIN_URL = 'https://pro.beisserlumber.com';
const MAIN_SITE_URL = 'https://beisserlumber.com';

export default function Home() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Beisser Lumber — Customer Portal</title>
        <meta name="description" content="Beisser Lumber Company Customer Portal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={s.page}>

        {/* ── Header ── */}
        <header style={s.header}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Beisser Lumber Company" style={s.logo} />
        </header>

        {/* ── Hero Banner ── */}
        <div style={s.hero}>
          <div style={s.heroOverlay}>
            <h1 style={s.heroTitle}>Welcome to our New Customer Portal</h1>
          </div>
        </div>

        {/* ── Benefits Section ── */}
        <section style={s.benefits}>
          <p style={s.benefitsHeading}>
            Benefits of the Beisser Lumber Company Customer Portal include:
          </p>
          <ul style={s.benefitsList}>
            <li>Easy account setup and login.</li>
            <li>24-hour online access to your invoices &amp; statements.</li>
            <li>Pay your account online by credit card or ACH.</li>
            <li>Save preferred payment methods securely online.</li>
            <li>Communicate with your Pro Team via text or email.</li>
          </ul>
        </section>

        {/* ── Three-Column Section ── */}
        <section style={s.columns}>

          {/* Column 1 — Sign In */}
          <div style={s.col}>
            <p style={s.colBody}>
              I&apos;ve already set up my online Beisser Lumber Company Customer Portal Account
            </p>
            <a href={PORTAL_SIGNIN_URL} style={s.pillLink}>
              Account Sign-In
            </a>
          </div>

          <div style={s.divider} />

          {/* Column 2 — Request Account */}
          <div style={{ ...s.col, alignItems: 'center' }}>
            <HardhatIcon />
            <strong style={s.colHeading}>
              I have a Customer Account with Beisser Lumber Company
            </strong>
            <p style={s.colBody}>
              Click here to request online access connected to your existing Beisser Lumber account.
            </p>
            <button
              style={s.pillButton}
              onClick={() => setFormOpen((o) => !o)}
              aria-expanded={formOpen}
            >
              {formOpen ? 'Cancel' : 'Request Account'}
            </button>
          </div>

          <div style={s.divider} />

          {/* Column 3 — Main Site */}
          <div style={{ ...s.col, alignItems: 'center' }}>
            <MonitorIcon />
            <strong style={s.colHeading}>Main Site</strong>
            <a href={MAIN_SITE_URL} style={s.colLink}>
              Click here to go back to the main Beisser Lumber Company site
            </a>
          </div>

        </section>

        {/* ── Accordion Form ── */}
        <div
          style={{
            ...s.accordion,
            maxHeight: formOpen ? '1400px' : '0px',
            opacity: formOpen ? 1 : 0,
          }}
          aria-hidden={!formOpen}
        >
          <div style={s.formWrap}>
            <RequestForm />
          </div>
        </div>

        {/* ── Footer ── */}
        <footer style={s.footer}>
          &copy; Beisser Lumber Company 2026. All rights reserved.
        </footer>

      </div>

      {/* Responsive column stacking on mobile */}
      <style>{`
        @media (max-width: 700px) {
          .col-row {
            flex-direction: column !important;
          }
          .col-divider {
            width: 80% !important;
            height: 1px !important;
            align-self: center;
          }
        }
      `}</style>
    </>
  );
}

function HardhatIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24"
      fill="none" stroke="#1a5c2a" strokeWidth="1.6" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
      <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24"
      fill="none" stroke="#1a5c2a" strokeWidth="1.6" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

const s = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#f5f5f5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: '#222222',
  },

  /* Header */
  header: {
    width: '100%',
    background: '#ffffff',
    padding: '16px 40px',
    borderBottom: '1px solid #e0e0e0',
  },
  logo: {
    height: '60px',
    width: 'auto',
  },

  /* Hero */
  hero: {
    width: '100%',
    minHeight: '180px',
    background: 'linear-gradient(135deg, #2d1a0e 0%, #1a5c2a 60%, #2d4a1e 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroOverlay: {
    padding: '48px 24px',
    textAlign: 'center',
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
    fontWeight: '700',
    letterSpacing: '0.01em',
    margin: 0,
    textShadow: '0 1px 4px rgba(0,0,0,0.4)',
  },

  /* Benefits */
  benefits: {
    width: '100%',
    background: '#ffffff',
    padding: '36px 48px',
    borderBottom: '1px solid #e0e0e0',
  },
  benefitsHeading: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#222222',
    marginBottom: '14px',
  },
  benefitsList: {
    paddingLeft: '22px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    fontSize: '0.95rem',
    color: '#444444',
    lineHeight: '1.6',
  },

  /* Three columns */
  columns: {
    width: '100%',
    background: '#f0f0f0',
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #e0e0e0',
  },
  col: {
    flex: 1,
    padding: '36px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
    textAlign: 'center',
  },
  divider: {
    width: '1px',
    background: '#cccccc',
    margin: '24px 0',
    alignSelf: 'stretch',
  },
  colHeading: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#222222',
    lineHeight: '1.4',
  },
  colBody: {
    fontSize: '0.9rem',
    color: '#444444',
    lineHeight: '1.6',
  },
  colLink: {
    fontSize: '0.9rem',
    color: '#1a5c2a',
    textDecoration: 'underline',
    lineHeight: '1.6',
  },
  pillLink: {
    display: 'inline-block',
    background: '#1a5c2a',
    color: '#ffffff',
    borderRadius: '999px',
    padding: '11px 28px',
    fontSize: '0.9rem',
    fontWeight: '600',
    textDecoration: 'none',
    letterSpacing: '0.02em',
    marginTop: '4px',
  },
  pillButton: {
    display: 'inline-block',
    background: '#1a5c2a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '999px',
    padding: '11px 28px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    letterSpacing: '0.02em',
    fontFamily: 'inherit',
    marginTop: '4px',
    transition: 'opacity 0.15s',
  },

  /* Accordion */
  accordion: {
    width: '100%',
    overflow: 'hidden',
    transition: 'max-height 0.4s ease, opacity 0.3s ease',
    background: '#ffffff',
  },
  formWrap: {
    maxWidth: '640px',
    margin: '0 auto',
    padding: '0 24px',
  },

  /* Footer */
  footer: {
    marginTop: 'auto',
    padding: '24px',
    fontSize: '0.8rem',
    color: '#888888',
    textAlign: 'center',
    background: '#f5f5f5',
  },
};
