import React, { useState } from 'react';
import { exportCSV } from '../utils/helpers';

export default function SessionPanel({ students, onSave, onToast }) {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate]       = useState(today);
  const [subject, setSubject] = useState('');

  const inputStyle = {
    width: '100%',
    border: '1.5px solid var(--border)',
    borderRadius: 10,
    background: 'var(--bg)',
    color: 'var(--text)',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '.88rem',
    padding: '10px 13px',
    outline: 'none',
  };

  const handleSave = () => {
    if (!date) { onToast('⚠ Please pick a date first.'); return; }

    const { unmarked } = onSave({ date, subject });

    if (unmarked > 0) {
      const ok = window.confirm(`${unmarked} student(s) not yet marked. Save anyway?`);
      if (!ok) return;
    }

    onToast(`✓ Session saved — ${date}`);
  };

  const handleExport = () => {
    if (students.length === 0) { onToast('⚠ No students to export.'); return; }
    exportCSV(students, date, subject || 'Class');
    onToast('✓ CSV exported!');
  };

  return (
    <div style={styles.panel}>
      <div style={styles.head}>
        <span style={styles.title}>// Session Date</span>
      </div>
      <div style={styles.body}>
        <div style={styles.field}>
          <label style={styles.label}>Date</label>
          <input
            type="date"
            style={inputStyle}
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Subject / Class</label>
          <input
            type="text"
            style={inputStyle}
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="e.g. Web Development"
          />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button style={{ ...styles.btn, ...styles.btnPrimary, flex: 1 }} onClick={handleSave}>
            💾 Save Session
          </button>
          <button style={{ ...styles.btn, ...styles.btnGhost }} onClick={handleExport}>
            ↓ CSV
          </button>
        </div>
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
  btn: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: '.85rem',
    border: 'none',
    cursor: 'pointer',
    borderRadius: 10,
    padding: '10px 18px',
    transition: 'filter .15s',
  },
  btnPrimary: {
    background: 'var(--accent)',
    color: '#fff',
    padding: 12,
    fontSize: '.9rem',
  },
  btnGhost: {
    background: 'var(--bg)',
    color: 'var(--muted)',
    border: '1px solid var(--border)',
  },
};
