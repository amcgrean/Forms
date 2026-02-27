import Head from 'next/head';
import { useState } from 'react';
import RequestForm from '../components/RequestForm';

const PORTAL_SIGNIN_URL = 'https://pro.beisserlumber.com/login';
const MAIN_SITE_URL = 'https://beisserlumber.com';

export default function Home() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Beisser Lumber — Pro Account</title>
        <meta name="description" content="Beisser Lumber Company Customer Portal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={styles.page}>
        <header style={styles.header}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Beisser Lumber Company" style={styles.logo} />
        </header>

        <main style={styles.main}>
          {/* ── Section 1: Account Sign-In ── */}
          <section style={styles.section}>
            <p style={styles.bodyText}>
              I&apos;ve already set up my online Beisser Lumber Company Customer Portal Account
            </p>
            <a href={PORTAL_SIGNIN_URL} style={styles.pillButtonLink}>
              <span style={styles.pillButton}>Account Sign-In</span>
            </a>
          </section>

          <hr style={styles.rule} />

          {/* ── Section 2: Request Account ── */}
          <section style={styles.section}>
            <div style={styles.iconRow}>
              <HardhatIcon />
              <strong style={styles.sectionHeading}>
                I have a Customer Account with Beisser Lumber Company
              </strong>
            </div>
            <p style={styles.bodyText}>
              Click here to request online access connected to your existing Beisser Lumber account.
            </p>
            <button
              style={styles.pillButton}
              onClick={() => setFormOpen((o) => !o)}
              aria-expanded={formOpen}
            >
              {formOpen ? 'Cancel' : 'Request Account'}
            </button>

            <div
              style={{
                ...styles.accordion,
                maxHeight: formOpen ? '1200px' : '0px',
                opacity: formOpen ? 1 : 0,
              }}
              aria-hidden={!formOpen}
            >
              <RequestForm />
            </div>
          </section>

          <hr style={styles.rule} />

          {/* ── Section 3: Main Site ── */}
          <section style={styles.section}>
            <div style={styles.iconRow}>
              <MonitorIcon />
              <strong style={styles.sectionHeading}>Main Site</strong>
            </div>
            <a href={MAIN_SITE_URL} style={styles.linkText}>
              Click here to go back to the main Beisser Lumber Company site
            </a>
          </section>
        </main>

        <footer style={styles.footer}>
          &copy; Beisser Lumber Company 2026. All rights reserved.
        </footer>
      </div>
    </>
  );
}

function HardhatIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a5c2a"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
      <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a5c2a"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#f5f5f5',
    padding: '0 16px',
  },
  header: {
    width: '100%',
    maxWidth: '560px',
    paddingTop: '32px',
    paddingBottom: '24px',
    textAlign: 'center',
  },
  logo: {
    maxWidth: '220px',
    height: 'auto',
  },
  main: {
    width: '100%',
    maxWidth: '560px',
    background: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    overflow: 'hidden',
  },
  section: {
    padding: '32px 36px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    textAlign: 'center',
  },
  rule: {
    border: 'none',
    borderTop: '1px solid #dddddd',
    margin: '0',
  },
  iconRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  sectionHeading: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#222222',
  },
  bodyText: {
    fontSize: '0.95rem',
    color: '#444444',
    maxWidth: '400px',
  },
  pillButtonLink: {
    textDecoration: 'none',
  },
  pillButton: {
    display: 'inline-block',
    background: '#1a5c2a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '999px',
    padding: '12px 32px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    letterSpacing: '0.02em',
    textDecoration: 'none',
    fontFamily: 'inherit',
    transition: 'opacity 0.15s',
  },
  linkText: {
    fontSize: '0.95rem',
    color: '#1a5c2a',
    textDecoration: 'underline',
  },
  accordion: {
    width: '100%',
    overflow: 'hidden',
    transition: 'max-height 0.4s ease, opacity 0.3s ease',
  },
  footer: {
    marginTop: '32px',
    marginBottom: '24px',
    fontSize: '0.8rem',
    color: '#888888',
    textAlign: 'center',
  },
};
