import Head from 'next/head';
import { useState, useEffect } from 'react';

const SESSION_KEY = 'portal_auth';

export default function Portal() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [fetchError, setFetchError] = useState('');
  const [savedPassword, setSavedPassword] = useState('');

  // Restore session
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      setSavedPassword(stored);
      setAuthed(true);
    }
  }, []);

  // Load data once authenticated
  useEffect(() => {
    if (!authed || !savedPassword) return;
    setLoading(true);
    setFetchError('');
    fetch(`/api/portal/data?password=${encodeURIComponent(savedPassword)}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.error) {
          setFetchError(json.error);
        } else {
          setData(json);
        }
      })
      .catch(() => setFetchError('Network error. Please refresh.'))
      .finally(() => setLoading(false));
  }, [authed, savedPassword]);

  function handleLogin(e) {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setLoginError('');
    fetch(`/api/portal/data?password=${encodeURIComponent(password)}`)
      .then((r) => {
        if (r.status === 401) throw new Error('Wrong password.');
        return r.json();
      })
      .then((json) => {
        if (json.error) throw new Error(json.error);
        sessionStorage.setItem(SESSION_KEY, password);
        setSavedPassword(password);
        setData(json);
        setAuthed(true);
      })
      .catch((err) => setLoginError(err.message || 'Login failed.'))
      .finally(() => setLoading(false));
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setData(null);
    setPassword('');
    setSavedPassword('');
  }

  function handleRefresh() {
    setData(null);
    setFetchError('');
    setLoading(true);
    fetch(`/api/portal/data?password=${encodeURIComponent(savedPassword)}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.error) setFetchError(json.error);
        else setData(json);
      })
      .catch(() => setFetchError('Network error. Please refresh.'))
      .finally(() => setLoading(false));
  }

  function formatDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }) + ' CST';
  }

  return (
    <>
      <Head>
        <title>Staff Portal</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={s.page}>
        <header style={s.header}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Beisser Lumber Company" style={s.logo} />
          <div style={s.headerRight}>
            <span style={s.headerLabel}>Staff Portal</span>
            {authed && (
              <button style={s.logoutBtn} onClick={handleLogout}>
                Sign Out
              </button>
            )}
          </div>
        </header>

        <main style={s.main}>
          {!authed ? (
            <div style={s.loginWrap}>
              <div style={s.loginCard}>
                <LockIcon />
                <h1 style={s.loginHeading}>Staff Portal Access</h1>
                <p style={s.loginSub}>Enter your portal password to view submissions.</p>
                <form onSubmit={handleLogin} style={s.form}>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    style={s.input}
                    autoFocus
                    autoComplete="current-password"
                  />
                  {loginError && <p style={s.errorMsg}>{loginError}</p>}
                  <button type="submit" style={s.loginBtn} disabled={loading}>
                    {loading ? 'Checking…' : 'Sign In'}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div style={s.dashboard}>
              {/* Stats row */}
              <div style={s.statsRow}>
                <div style={s.statCard}>
                  <span style={s.statNumber}>{data ? data.visits.toLocaleString() : '—'}</span>
                  <span style={s.statLabel}>Page Visits</span>
                </div>
                <div style={s.statCard}>
                  <span style={s.statNumber}>{data ? data.submissions.length.toLocaleString() : '—'}</span>
                  <span style={s.statLabel}>Total Submissions</span>
                </div>
                <button style={s.refreshBtn} onClick={handleRefresh} disabled={loading}>
                  {loading ? 'Loading…' : 'Refresh'}
                </button>
              </div>

              {fetchError && (
                <div style={s.errorBanner}>{fetchError}</div>
              )}

              {loading && !data && (
                <p style={s.loadingText}>Loading submissions…</p>
              )}

              {data && (
                <>
                  <h2 style={s.tableHeading}>
                    Submissions ({data.submissions.length})
                  </h2>

                  {data.submissions.length === 0 ? (
                    <p style={s.emptyText}>No submissions yet.</p>
                  ) : (
                    <div style={s.tableWrap}>
                      <table style={s.table}>
                        <thead>
                          <tr>
                            {['Date / Time', 'Name', 'Business', 'Email', 'Phone', 'Acct #', 'Notes'].map((h) => (
                              <th key={h} style={s.th}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {data.submissions.map((sub, i) => (
                            <tr key={i} style={i % 2 === 0 ? s.trEven : s.trOdd}>
                              <td style={s.td}>{formatDate(sub.submittedAt)}</td>
                              <td style={s.td}>{sub.fullName}</td>
                              <td style={s.td}>{sub.businessName}</td>
                              <td style={s.td}>
                                <a href={`mailto:${sub.email}`} style={s.emailLink}>{sub.email}</a>
                              </td>
                              <td style={s.td}>{sub.phone}</td>
                              <td style={s.td}>{sub.accountNumber || '—'}</td>
                              <td style={{ ...s.td, ...s.notesCell }}>{sub.notes || '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </main>

        <footer style={s.footer}>
          &copy; Beisser Lumber Company 2026 &mdash; Staff Portal
        </footer>
      </div>
    </>
  );
}

function LockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
      fill="none" stroke="#1a5c2a" strokeWidth="1.8" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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
  header: {
    width: '100%',
    background: '#ffffff',
    padding: '14px 32px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
  },
  logo: { height: '50px', width: 'auto' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '20px' },
  headerLabel: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#555',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #ccc',
    borderRadius: '6px',
    padding: '6px 14px',
    fontSize: '0.8rem',
    color: '#555',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  main: {
    flex: 1,
    padding: '40px 24px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  },

  /* Login */
  loginWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
  },
  loginCard: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '48px 40px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  loginHeading: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#1a5c2a',
    margin: '8px 0 0',
  },
  loginSub: {
    fontSize: '0.9rem',
    color: '#666',
    margin: 0,
    textAlign: 'center',
  },
  form: { width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' },
  input: {
    width: '100%',
    padding: '11px 14px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  errorMsg: { color: '#c0392b', fontSize: '0.85rem', margin: 0 },
  loginBtn: {
    width: '100%',
    padding: '12px',
    background: '#1a5c2a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },

  /* Dashboard */
  dashboard: { display: 'flex', flexDirection: 'column', gap: '24px' },
  statsRow: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  statCard: {
    background: '#ffffff',
    borderRadius: '10px',
    padding: '20px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    minWidth: '140px',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a5c2a',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: '0.8rem',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  refreshBtn: {
    marginLeft: 'auto',
    padding: '10px 22px',
    background: '#1a5c2a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  errorBanner: {
    background: '#fdf2f2',
    border: '1px solid #f5c6c6',
    borderRadius: '8px',
    padding: '14px 18px',
    color: '#c0392b',
    fontSize: '0.9rem',
  },
  loadingText: { color: '#888', fontSize: '0.95rem' },
  tableHeading: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#222',
    margin: 0,
  },
  emptyText: { color: '#888', fontSize: '0.95rem' },

  /* Table */
  tableWrap: {
    overflowX: 'auto',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: '#ffffff',
    fontSize: '0.875rem',
  },
  th: {
    padding: '12px 14px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#ffffff',
    background: '#1a5c2a',
    whiteSpace: 'nowrap',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  td: {
    padding: '11px 14px',
    borderBottom: '1px solid #ececec',
    color: '#333',
    verticalAlign: 'top',
  },
  trEven: {},
  trOdd: { background: '#f9f9f9' },
  notesCell: {
    maxWidth: '220px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    color: '#555',
  },
  emailLink: { color: '#1a5c2a', textDecoration: 'underline' },

  /* Footer */
  footer: {
    padding: '20px',
    fontSize: '0.78rem',
    color: '#aaa',
    textAlign: 'center',
    background: '#f5f5f5',
  },
};
