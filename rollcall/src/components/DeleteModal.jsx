import React from 'react';

export default function DeleteModal({ studentId, onConfirm, onCancel }) {
  if (!studentId) return null;

  return (
    <div style={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div style={styles.modal}>
        <h2 style={styles.heading}>Remove Student?</h2>
        <p style={styles.body}>
          This will permanently delete the student and all their attendance records.
          This action cannot be undone.
        </p>
        <div style={styles.btns}>
          <button style={{ ...styles.btn, ...styles.ghost }} onClick={onCancel}>
            Cancel
          </button>
          <button style={{ ...styles.btn, ...styles.danger }} onClick={onConfirm}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,.4)',
    zIndex: 200,
    display: 'grid', placeItems: 'center',
    backdropFilter: 'blur(3px)',
  },
  modal: {
    background: 'var(--surface)',
    borderRadius: 'var(--radius)',
    padding: 28,
    width: '100%', maxWidth: 420,
    margin: 20,
    boxShadow: '0 20px 60px rgba(0,0,0,.2)',
    animation: 'popIn .2s ease',
  },
  heading: { fontSize: '1.1rem', fontWeight: 800, marginBottom: 6 },
  body:    { fontSize: '.85rem', color: 'var(--muted)', marginBottom: 20 },
  btns:    { display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 },
  btn: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700, fontSize: '.85rem',
    border: 'none', cursor: 'pointer',
    borderRadius: 10, padding: '10px 18px',
    transition: 'filter .15s',
  },
  ghost:  { background: 'var(--bg)',   color: 'var(--muted)', border: '1px solid var(--border)' },
  danger: { background: 'var(--red-l)', color: 'var(--red)' },
};
