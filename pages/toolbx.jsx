import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

const PORTAL_SIGNIN_URL = 'https://pro.beisserlumber.com';
const REGISTER_URL = '/';
const MAIN_SITE_URL = 'https://beisserlumber.com/';

const HERO_IMG = 'https://toolbx-ecommerce.s3.us-east-1.amazonaws.com/beisser/windowsdoors-2+(1).png';
const CONTRACTOR_ICON = 'https://toolbx-ecommerce.s3.us-east-1.amazonaws.com/beisser/Contractor+icon+1+(4).png';
const MONITOR_ICON = 'https://toolbx-ecommerce.s3.us-east-1.amazonaws.com/beisser/Screen+Icons+Cute+Outline+1+(4).png';
const LOGO_IMG = 'https://toolbx-order-images.s3.amazonaws.com/470917b9-c47f-4729-82cf-ddd6f079972c.png';

export default function Toolbx() {
  useEffect(() => {
    function sendHeight() {
      const h = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: 'beisser-iframe-height', height: h }, '*');
    }
    sendHeight();
    const ro = new ResizeObserver(sendHeight);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Beisser Lumber Company</title>
        <meta name="description" content="Payment portal for Beisser Lumber Company, manage your personal account with smooth online payments and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* ── Nav bar (matches Toolbx layout) ── */}
      <nav style={s.nav}>
        <a href="/" style={s.logoLink}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Beisser Lumber Company" src={LOGO_IMG} style={s.navLogo} />
        </a>
      </nav>

      {/* ── Main content (mirrors the Toolbx storefront.disabledStorefrontHTML exactly) ── */}
      <div>
        <style>{`
          body { overflow-x: hidden; margin: 0; }
          .benefits li { margin-bottom: 6px; font-size: 15px; }
          .hero-container { position: relative; width: 100%; }
          .welcome-txt {
            color: #fff;
            font-size: 38px;
            font-weight: 700;
            position: absolute;
            z-index: 1;
            top: 50%;
            left: 80px;
            transform: translateY(-50%);
            line-height: 1.2;
            margin: 0;
            text-shadow: 0 1px 4px rgba(0,0,0,0.4);
          }
          #hero-banner {
            width: 100%;
            height: 260px;
            object-fit: cover;
            display: block;
          }
          .feature-item {
            flex: 1;
            padding: 40px 30px;
            text-align: center;
            border-right: 1px solid #ccc;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .feature-item:last-child { border-right: none; }
          .feature-column {
            padding: 60px 80px;
            display: flex;
            justify-content: center;
            background: #f4f4f4;
            min-height: 260px;
          }
          .tbx-sign-in-btn {
            background-color: #146834;
            color: #fff;
            border: none;
            border-radius: 999px;
            padding: 14px 32px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            font-family: inherit;
            text-decoration: none;
            display: inline-block;
            letter-spacing: 0.01em;
          }
          .tbx-sign-in-btn:hover { background-color: #0f5229; }
          @media (max-width: 1024px) {
            .welcome-txt { font-size: 28px; left: 50px; }
            .feature-column { padding: 40px; flex-wrap: wrap; }
            .feature-item {
              flex-basis: calc(50% - 40px);
              border-right: none;
              border-bottom: 1px solid #ccc;
            }
            .feature-item:nth-child(odd) { border-right: 1px solid #ccc; }
          }
          @media (max-width: 700px) {
            .welcome-txt { font-size: 22px; left: 30px; }
            .feature-column { flex-direction: column; padding: 20px; min-height: unset; }
            .feature-item { border-right: none; border-bottom: 1px solid #ccc; }
            .feature-item:last-child { border-bottom: none; }
          }
          @media (max-width: 430px) {
            .welcome-txt { font-size: 18px; left: 20px; }
            #hero-banner { height: 180px; }
          }
        `}</style>

        <div className="content-container">
          <div className="hero-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img id="hero-banner" src={HERO_IMG} alt="Beisser Payment" />
            <h2 className="welcome-txt">Welcome to our<br />New Customer Portal</h2>
          </div>
          <h4 style={{ marginBottom: '16px', marginTop: '32px', padding: '0 60px', fontWeight: 700 }}>
            Benefits of the Beisser Lumber Company Customer Portal include:
          </h4>
          <ul className="benefits" style={{ textAlign: 'left', padding: '0 80px', marginBottom: '32px' }}>
            <li>Easy account setup and login.</li>
            <li>24-hour online access to your invoices &amp; statements.</li>
            <li>Pay your account online by credit card or ACH.</li>
            <li>Save preferred payment methods securely online.</li>
            <li>Communicate with your Pro Team via text or email.</li>
          </ul>
        </div>

        <div className="feature-column">
          {/* Column 1 — Account Sign-In */}
          <div className="feature-item">
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <h5 style={{ fontWeight: 700, marginBottom: '24px', marginTop: '0', textAlign: 'center' }}>
                I&apos;ve already set up my online<br />Beisser Lumber Company Customer Portal Account
              </h5>
              <button
                className="tbx-sign-in-btn"
                onClick={() => { window.open(PORTAL_SIGNIN_URL, '_blank', 'noopener,noreferrer'); }}
              >
                Account Sign-In
              </button>
            </div>
          </div>

          {/* Column 2 — Create Account (original Toolbx registration) */}
          <div className="feature-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={CONTRACTOR_ICON} alt="Contractor" style={{ width: '80px', height: '80px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <h5 style={{ fontWeight: 700, marginTop: '10px' }}>
                I have a Customer Account<br />with Beisser Lumber Company
              </h5>
              <p style={{ fontSize: '14px' }}>
                <Link href={REGISTER_URL} style={{ color: '#151b67', textDecoration: 'underline' }}>
                  Click here
                </Link>
                {' '}to create an<br />online account that connects to your<br />existing account with Beisser Lumber Company
              </p>
            </div>
          </div>

          {/* Column 3 — Main Site */}
          <div className="feature-item" style={{ borderRight: 'none' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={MONITOR_ICON} alt="Main Site" style={{ width: '80px', height: '80px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <h5 style={{ fontWeight: 700, marginTop: '10px' }}>Main Site</h5>
              <p style={{ fontSize: '14px', marginTop: '0' }}>
                <a href={MAIN_SITE_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#151b67', textDecoration: 'underline' }}>
                  Click here
                </a>
                {' '}to go back to the<br />main Beisser Lumber Company site
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '100px' }} />
      </div>

      {/* ── Footer ── */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <p style={s.footerCopy}>© Beisser Lumber Company 2026. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

const s = {
  nav: {
    width: '100%',
    background: '#ffffff',
    borderBottom: '1px solid #e8e8e8',
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
  },
  logoLink: {
    display: 'inline-block',
    textDecoration: 'none',
  },
  navLogo: {
    height: '52px',
    width: 'auto',
  },
  footer: {
    background: '#ffffff',
    borderTop: '1px solid #e8e8e8',
    padding: '24px',
  },
  footerInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  footerCopy: {
    fontSize: '0.8rem',
    color: '#737373',
  },
};
