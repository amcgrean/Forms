import { useState } from 'react';

const SALES_REPS = [
  "Select N/A if unknown", "Andrew Galindo", "Ben Richter", "Bev Withers", "Brad Fielding", "Dave Anker", "Dusty Eyerly", "Evan Combs", "Garret Pettyjohn", "Jacob Wolf", "Jamey Meyer", "Joe Gerjets", "John Murphy", "Josh Meyn", "Katelyn Jaimes", "Kevin Vander Zwaag", "Mark Guthrie", "Matt Bruce", "Mike Schmit", "Paul Neal", "Steve Keiser", "Steve Taylor", "Tom Nahas", "TJ Greiner", "Zac Lamb"
];

const INITIAL = {
  streetAddress: '', addressLine2: '', city: '', yourName: '', yourEmail: '', salesRep: '',
  pointOfContact: '', billingParty: '', builderName: '', builderPhone: '', builderEmail: '',
  homeOccupied: '', closeDate: '', homeownerName: '', homeownerPhone: '', homeownerEmail: '',
  relatedSalesOrder: '', relatedPurchaseOrder: '', issueDescription: ''
};

export default function ServiceRequestForm({ onSuccess }) {
  const [fields, setFields] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const [serverError, setServerError] = useState('');

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFields((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) {
      setErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!fields.streetAddress || !fields.city || !fields.yourName || !fields.salesRep || !fields.pointOfContact || !fields.billingParty || !fields.issueDescription || !fields.homeOccupied || !fields.builderName) {
      alert("Please fill out all required fields.");
      return;
    }
    
    setStatus('loading');
    setServerError('');

    try {
      const res = await fetch('/api/service-request', {
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
        <p style={styles.successText}>Service request submitted successfully!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={styles.form}>
      
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Project Location</h3>
        <Field label="Street Address" name="streetAddress" type="text" value={fields.streetAddress} onChange={handleChange} required />
        <Field label="Address Line 2" name="addressLine2" type="text" value={fields.addressLine2} onChange={handleChange} />
        <Field label="City" name="city" type="text" value={fields.city} onChange={handleChange} required />
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Your Information</h3>
        <Field label="Your Name" name="yourName" type="text" value={fields.yourName} onChange={handleChange} required />
        <Field label="Your Email" name="yourEmail" type="email" value={fields.yourEmail} onChange={handleChange} placeholder="Leave blank if salesperson" />
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Beisser Sales Rep <span style={styles.required}>*</span></label>
          <select name="salesRep" value={fields.salesRep} onChange={handleChange} style={styles.input} required>
            <option value="" disabled>Select a sales rep...</option>
            {SALES_REPS.map(rep => <option key={rep} value={rep}>{rep}</option>)}
          </select>
        </div>
      </div>

      <div style={{ ...styles.section, display: 'flex', gap: '16px', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div style={{ ...styles.fieldGroup, flex: 1 }}>
          <label style={styles.label}>Point of Contact <span style={styles.required}>*</span></label>
          <select name="pointOfContact" value={fields.pointOfContact} onChange={handleChange} style={styles.input} required>
            <option value="" disabled>Select...</option>
            <option>Salesman</option>
            <option>Builder</option>
            <option>Homeowner</option>
          </select>
        </div>
        <div style={{ ...styles.fieldGroup, flex: 1 }}>
          <label style={styles.label}>Billing Party <span style={styles.required}>*</span></label>
          <select name="billingParty" value={fields.billingParty} onChange={handleChange} style={styles.input} required>
            <option value="" disabled>Select...</option>
            <option>Unknown</option><option>Beisser</option><option>Builder</option><option>Homeowner</option>
          </select>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Builder Info</h3>
        <Field label="Builder/Contractor Name" name="builderName" type="text" value={fields.builderName} onChange={handleChange} required />
        <Field label="Builder Phone" name="builderPhone" type="tel" value={fields.builderPhone} onChange={handleChange} />
        <Field label="Builder Email" name="builderEmail" type="email" value={fields.builderEmail} onChange={handleChange} />
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Homeowner Info</h3>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Home Occupied? <span style={styles.required}>*</span></label>
          <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}>
              <input type="radio" name="homeOccupied" value="Yes" onChange={handleChange} required /> Yes
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}>
              <input type="radio" name="homeOccupied" value="No" onChange={handleChange} required /> No
            </label>
          </div>
        </div>
        <Field label="Close Date" name="closeDate" type="date" value={fields.closeDate} onChange={handleChange} />
        <Field label="Homeowner Name" name="homeownerName" type="text" value={fields.homeownerName} onChange={handleChange} />
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}><Field label="Phone" name="homeownerPhone" type="tel" value={fields.homeownerPhone} onChange={handleChange} /></div>
          <div style={{ flex: 1 }}><Field label="Email" name="homeownerEmail" type="email" value={fields.homeownerEmail} onChange={handleChange} /></div>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Discussion of Problem</h3>
        <Field label="Related Sales Order(s)" name="relatedSalesOrder" type="text" value={fields.relatedSalesOrder} onChange={handleChange} placeholder="e.g. SO-12345" />
        <Field label="Related Purchase Order(s)" name="relatedPurchaseOrder" type="text" value={fields.relatedPurchaseOrder} onChange={handleChange} placeholder="e.g. PO-98765" />
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Issue Description <span style={styles.required}>*</span></label>
          <textarea name="issueDescription" value={fields.issueDescription} onChange={handleChange} required rows={4} style={styles.textarea} />
        </div>
      </div>

      {status === 'error' && serverError && (
        <p style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '6px', fontSize: '0.875rem', color: '#c0392b' }}>
          {serverError}
        </p>
      )}

      <button type="submit" disabled={status === 'loading'} style={{ ...styles.submitButton, opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}>
        {status === 'loading' ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
}

function Field({ label, name, type, value, onChange, required, placeholder }) {
  return (
    <div style={styles.fieldGroup}>
      <label style={styles.label} htmlFor={name}>{label}{required && <span style={styles.required}> *</span>}</label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} style={styles.input} />
    </div>
  );
}

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px 36px 32px', textAlign: 'left', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', maxWidth: '800px', margin: '40px auto' },
  section: { display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid #eeeeee' },
  sectionTitle: { fontSize: '1.1rem', fontWeight: '700', color: '#1a5c2a', margin: '0 0 8px 0' },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: '4px' },
  label: { fontSize: '0.875rem', fontWeight: '600', color: '#333333' },
  required: { color: '#c0392b' },
  input: { padding: '10px 14px', border: '1px solid #cccccc', borderRadius: '6px', fontSize: '0.95rem', color: '#222222', background: '#ffffff', outline: 'none', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' },
  textarea: { padding: '10px 14px', border: '1px solid #cccccc', borderRadius: '6px', fontSize: '0.95rem', color: '#222222', background: '#ffffff', outline: 'none', resize: 'vertical', fontFamily: 'inherit', width: '100%', lineHeight: '1.5', boxSizing: 'border-box' },
  submitButton: { background: '#1a5c2a', color: '#ffffff', border: 'none', borderRadius: '999px', padding: '13px', fontSize: '1rem', fontWeight: '600', width: '100%', fontFamily: 'inherit', marginTop: '16px' },
  successBox: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '32px 36px', textAlign: 'center', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', maxWidth: '800px', margin: '40px auto' },
  successText: { fontSize: '1rem', color: '#1a5c2a', fontWeight: '500', maxWidth: '380px', lineHeight: '1.6' },
};
