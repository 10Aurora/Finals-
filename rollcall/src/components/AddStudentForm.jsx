import React, { useState } from 'react';

export default function AddStudentForm({ onAdd, onToast }) {
  const [form, setForm] = useState({ name: '', id: '', section: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = true;
    if (!form.id.trim())   newErrors.id   = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = onAdd({
      name:    form.name.trim(),
      id:      form.id.trim(),
      section: form.section.trim(),
    });

    if (result?.error) {
      onToast('⚠ ' + result.error);
      setErrors({ id: true });
    } else {
      onToast(`✓ ${form.name.trim()} enrolled!`);
      setForm({ name: '', id: '', section: '' });
      setErrors({});
    }
  };

  const inputStyle = (field) => ({
    ...styles.input,
    borderColor: errors[field] ? 'var(--red)' : 'var(--border)',
    boxShadow:   errors[field] ? '0 0 0 3px rgba(239,68,68,.12)' : 'none',
  });

  return (
    <div style={styles.panel}>
      <div style={styles.head}>
        <span style={styles.title}>// Add Student</span>
      </div>
      <div style={styles.body}>
        <div style={styles.field}>
          <label style={styles.label}>Full Name</label>
          <input
            style={inputStyle('name')}
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Maria Santos"
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Student ID</label>
          <input
            style={inputStyle('id')}
            name="id"
            value={form.id}
            onChange={handleChange}
            placeholder="e.g. 2024-00123"
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Section / Class</label>
          <input
            style={inputStyle('section')}
            name="section"
            value={form.section}
            onChange={handleChange}
            placeholder="e.g. BSIT 2A"
          />
        </div>
        <button style={styles.btn} onClick={handleSubmit}>
          + Enroll Student
        </button>
      </div>
    </div>
  );
}

const styles = {
  panel: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow)',
    overflow: 'hidden',
  },
  head: {
    padding: '16px 20px',
    borderBottom: '1px solid var(--border)',
  },
  title: {
    fontSize: '.72rem',
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    fontWeight: 500,
  },
  body:  { padding: 20 },
  field: { marginBottom: 14 },
  label: {
    display: 'block',
    fontSize: '.75rem',
    fontWeight: 600,
    color: 'var(--muted)',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    border: '1.5px solid var(--border)',
    borderRadius: 10,
    background: 'var(--bg)',
    color: 'var(--text)',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '.88rem',
    padding: '10px 13px',
    outline: 'none',
    transition: 'border-color .2s, box-shadow .2s',
  },
  btn: {
    width: '100%',
    background: 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    padding: '12px',
    fontSize: '.9rem',
    fontWeight: 700,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    cursor: 'pointer',
    transition: 'filter .15s, transform .1s',
  },
};
