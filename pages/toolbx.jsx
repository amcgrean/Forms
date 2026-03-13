import Head from 'next/head';

const PORTAL_SIGNIN_URL = 'https://pro.beisserlumber.com';
const REGISTER_URL = 'https://pro.beisserlumber.com/email-registration';
const MAIN_SITE_URL = 'https://beisserlumber.com/';

const HERO_IMG = 'https://toolbx-ecommerce.s3.us-east-1.amazonaws.com/beisser/windowsdoors-2+(1).png';
const CONTRACTOR_ICON = 'https://toolbx-ecommerce.s3.us-east-1.amazonaws.com/beisser/Contractor+icon+1+(4).png';
const MONITOR_ICON = 'https://toolbx-ecommerce.s3.us-east-1.amazonaws.com/beisser/Screen+Icons+Cute+Outline+1+(4).png';
const LOGO_IMG = 'https://toolbx-order-images.s3.amazonaws.com/470917b9-c47f-4729-82cf-ddd6f079972c.png';

export default function Toolbx() {
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
          body { overflow-x: hidden; }
          .benefits li { margin: 0; }
          .hero-container { position: relative; width: 100%; }
          .welcome-txt {
            color: #fff;
            font-size: 36px !important;
            position: absolute;
            z-index: 1;
            top: 40px;
            left: 80px;
            line-height: 1.25;
          }
          #hero-banner {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }
          .feature-item {
            flex: 1;
            padding: 10px;
            text-align: center;
            border-right: 2px solid #ccc;
          }
          .feature-item-last {
            flex: 1;
            padding: 10px;
            text-align: center;
          }
          .feature-column {
            padding: 50px;
            display: flex;
            justify-content: center;
            background: #f9f9f9;
          }
          .tbx-sign-in-btn {
            background-color: #146834;
            color: #fff;
            border: none;
            border-radius: 999px;
            padding: 12px 28px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            font-family: inherit;
            text-decoration: none;
            display: inline-block;
          }
          .tbx-sign-in-btn:hover { opacity: 0.88; }
          @media (max-width: 1024px) {
            .welcome-txt {
              font-size: 24px !important;
              left: 50px;
              width: 100% !important;
            }
            .feature-column {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
            }
            .feature-item,
            .feature-item-last {
              flex-basis: calc(50% - 30px);
              border-right: none;
              margin-bottom: 50px;
            }
            .feature-item:nth-child(1),
            .feature-item:nth-child(3) {
              border-right: 2px solid #ccc;
            }
          }
          @media (max-width: 700px) {
            .feature-column {
              flex-direction: column;
              padding: 10px;
            }
            .feature-item {
              border-bottom: 2px solid #ccc;
              margin-bottom: 10px;
            }
            .feature-item:nth-child(1),
            .feature-item:nth-child(3) {
              border-right: none;
              padding-bottom: 30px;
            }
          }
          @media (max-width: 430px) {
            .welcome-txt {
              font-size: 20px !important;
              left: 20px;
              width: 100% !important;
            }
            .feature-column { padding: 20px; }
          }
        `}</style>

        <div className="content-container">
          <div className="hero-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img id="hero-banner" src={HERO_IMG} alt="Beisser Payment" />
          </div>
          <h4 className="welcome-txt">Welcome to our<br />New Customer Portal</h4>
          <h4 style={{ marginBottom: '20px', marginTop: '16px', padding: '0 16px' }}>
            Benefits of the Beisser Lumber Company Customer Portal include:
          </h4>
          <ul className="benefits" style={{ textAlign: 'left', padding: '0 32px' }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <h5 style={{ fontWeight: 700, marginBottom: '20px', marginTop: '60px' }}>
                I&apos;ve already set up my online<br />Beisser Lumber Company Customer Portal Account
              </h5>
              <a href={PORTAL_SIGNIN_URL} className="tbx-sign-in-btn">
                Account Sign-In
              </a>
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
                <a href={REGISTER_URL} style={{ color: '#151b67', textDecoration: 'underline' }}>
                  Click here
                </a>
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
