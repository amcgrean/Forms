import { useState } from 'react';

const INITIAL = {
  fullName: '',
  email: '',
  phone: '',
  businessName: '',
  accountNumber: '',
  notes: '',
};

function validate(fields) {
  const errors = {};
  if (!fields.fullName.trim()) errors.fullName = 'Full name is required.';
  if (!fields.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!fields.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!/^[\d\s\-().+]{7,20}$/.test(fields.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!fields.businessName.trim()) errors.businessName = 'Business name is required.';
  return errors;
}

export default function RequestForm({ onSuccess }) {
  const [fields, setFields] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [serverError, setServerError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear the field error on change
    if (errors[name]) {
      setErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');
    setServerError('');

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Submission failed. Please try again.');
      }
      setStatus('success');
      if (onSuccess) onSuccess();
    } catch (err) {
      setStatus('error');
      setServerError(err.message || 'An unexpected error occurred. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div style={styles.successBox}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
          fill="none" stroke="#1a5c2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <p style={styles.successText}>
          Thanks! We&apos;ll review your request and send your invite within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={styles.form}>
      <Field
        label="Full Name"
        name="fullName"
        type="text"
        value={fields.fullName}
        onChange={handleChange}
        error={errors.fullName}
        required
      />
      <Field
        label="Email Address"
        name="email"
        type="email"
        value={fields.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
      <Field
        label="Phone Number"
        name="phone"
        type="tel"
        value={fields.phone}
        onChange={handleChange}
        error={errors.phone}
        required
      />
      <Field
        label="Business / Company Name"
        name="businessName"
        type="text"
        value={fields.businessName}
        onChange={handleChange}
        error={errors.businessName}
        required
      />
      <Field
        label="Customer Account Number"
        name="accountNumber"
        type="text"
        value={fields.accountNumber}
        onChange={handleChange}
        placeholder="If known — check your invoice or statement"
      />

      <div style={styles.fieldGroup}>
        <label style={styles.label} htmlFor="notes">Notes / Message</label>
        <textarea
          id="notes"
          name="notes"
          value={fields.notes}
          onChange={handleChange}
          placeholder="Anything else we should know?"
          rows={4}
          style={styles.textarea}
        />
      </div>

      {status === 'error' && serverError && (
        <p style={styles.serverError}>{serverError}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          ...styles.submitButton,
          opacity: status === 'loading' ? 0.7 : 1,
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
        }}
      >
        {status === 'loading' ? (
          <span style={styles.spinnerRow}>
            <Spinner />
            Submitting…
          </span>
        ) : (
          'Request Account'
        )}
      </button>
    </form>
  );
}

function Field({ label, name, type, value, onChange, error, required, placeholder }) {
  return (
    <div style={styles.fieldGroup}>
      <label style={styles.label} htmlFor={name}>
        {label}
        {required && <span style={styles.required}> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        style={{ ...styles.input, ...(error ? styles.inputError : {}) }}
      />
      {error && (
        <span id={`${name}-error`} style={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{ animation: 'spin 0.8s linear infinite' }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '24px 36px 32px',
    borderTop: '1px solid #eeeeee',
    textAlign: 'left',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#333333',
  },
  required: {
    color: '#c0392b',
  },
  input: {
    padding: '10px 14px',
    border: '1px solid #cccccc',
    borderRadius: '6px',
    fontSize: '0.95rem',
    color: '#222222',
    background: '#ffffff',
    outline: 'none',
    transition: 'border-color 0.15s',
    fontFamily: 'inherit',
    width: '100%',
  },
  inputError: {
    borderColor: '#c0392b',
  },
  textarea: {
    padding: '10px 14px',
    border: '1px solid #cccccc',
    borderRadius: '6px',
    fontSize: '0.95rem',
    color: '#222222',
    background: '#ffffff',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    width: '100%',
    lineHeight: '1.5',
  },
  errorText: {
    fontSize: '0.8rem',
    color: '#c0392b',
  },
  serverError: {
    padding: '10px 14px',
    background: '#fef2f2',
    border: '1px solid #fca5a5',
    borderRadius: '6px',
    fontSize: '0.875rem',
    color: '#c0392b',
  },
  submitButton: {
    background: '#1a5c2a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '999px',
    padding: '13px',
    fontSize: '1rem',
    fontWeight: '600',
    width: '100%',
    fontFamily: 'inherit',
    letterSpacing: '0.02em',
    transition: 'opacity 0.15s',
    marginTop: '8px',
  },
  spinnerRow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'center',
  },
  successBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '32px 36px',
    borderTop: '1px solid #eeeeee',
    textAlign: 'center',
  },
  successText: {
    fontSize: '1rem',
    color: '#1a5c2a',
    fontWeight: '500',
    maxWidth: '380px',
    lineHeight: '1.6',
  },
};
