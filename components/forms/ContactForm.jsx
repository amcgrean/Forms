import { useState } from 'react';

const INITIAL = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  department: '',
  message: '',
};

function validate(fields) {
  const errors = {};
  if (!fields.firstName.trim()) errors.firstName = 'First name is required.';
  if (!fields.lastName.trim()) errors.lastName = 'Last name is required.';
  if (!fields.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!fields.department.trim()) errors.department = 'Please select a department.';
  if (!fields.message.trim()) errors.message = 'Message is required.';
  return errors;
}

export default function ContactForm({ onSuccess }) {
  const [fields, setFields] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Submission failed.');
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
          Thanks! We&apos;ll be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={styles.form}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <div style={{ flex: 1 }}>
          <Field label="First Name" name="firstName" type="text" value={fields.firstName} onChange={handleChange} error={errors.firstName} required />
        </div>
        <div style={{ flex: 1 }}>
          <Field label="Last Name" name="lastName" type="text" value={fields.lastName} onChange={handleChange} error={errors.lastName} required />
        </div>
      </div>
      
      <Field label="Email Address" name="email" type="email" value={fields.email} onChange={handleChange} error={errors.email} required />
      <Field label="Phone Number" name="phone" type="tel" value={fields.phone} onChange={handleChange} placeholder="(555) 123-4567" />

      <div style={styles.fieldGroup}>
        <label style={styles.label} htmlFor="department">Contact a Service team <span style={styles.required}> *</span></label>
        <select
          id="department"
          name="department"
          value={fields.department}
          onChange={handleChange}
          style={{ ...styles.input, ...(errors.department ? styles.inputError : {}) }}
          required
        >
          <option value="" disabled>Select a team...</option>
          <option>Sales/General Inquiry</option>
          <option>Design Team</option>
          <option>Installation Team</option>
          <option>Commercial Sales</option>
          <option>Estimating Team</option>
          <option>Credit Manager</option>
        </select>
        {errors.department && <span style={styles.errorText}>{errors.department}</span>}
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.label} htmlFor="message">Message <span style={styles.required}> *</span></label>
        <textarea
          id="message"
          name="message"
          value={fields.message}
          onChange={handleChange}
          placeholder="How can we help you?"
          rows={4}
          style={{ ...styles.textarea, ...(errors.message ? styles.inputError : {}) }}
          required
        />
        {errors.message && <span style={styles.errorText}>{errors.message}</span>}
      </div>

      {status === 'error' && serverError && (
        <p style={styles.serverError}>{serverError}</p>
      )}

      <button type="submit" disabled={status === 'loading'} style={{ ...styles.submitButton, opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}>
        {status === 'loading' ? 'Sending...' : 'Send Message'}
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
      <input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} aria-invalid={!!error} style={{ ...styles.input, ...(error ? styles.inputError : {}) }} />
      {error && <span style={styles.errorText}>{error}</span>}
    </div>
  );
}

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px 36px 32px', borderTop: '1px solid #eeeeee', textAlign: 'left', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', maxWidth: '600px', margin: '40px auto' },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: '4px' },
  label: { fontSize: '0.875rem', fontWeight: '600', color: '#333333' },
  required: { color: '#c0392b' },
  input: { padding: '10px 14px', border: '1px solid #cccccc', borderRadius: '6px', fontSize: '0.95rem', color: '#222222', background: '#ffffff', outline: 'none', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' },
  inputError: { borderColor: '#c0392b' },
  textarea: { padding: '10px 14px', border: '1px solid #cccccc', borderRadius: '6px', fontSize: '0.95rem', color: '#222222', background: '#ffffff', outline: 'none', resize: 'vertical', fontFamily: 'inherit', width: '100%', lineHeight: '1.5', boxSizing: 'border-box' },
  errorText: { fontSize: '0.8rem', color: '#c0392b' },
  serverError: { padding: '10px 14px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '6px', fontSize: '0.875rem', color: '#c0392b' },
  submitButton: { background: '#1a5c2a', color: '#ffffff', border: 'none', borderRadius: '999px', padding: '13px', fontSize: '1rem', fontWeight: '600', width: '100%', fontFamily: 'inherit', marginTop: '8px' },
  successBox: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '32px 36px', textAlign: 'center', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', maxWidth: '600px', margin: '40px auto' },
  successText: { fontSize: '1rem', color: '#1a5c2a', fontWeight: '500', maxWidth: '380px', lineHeight: '1.6' },
};
