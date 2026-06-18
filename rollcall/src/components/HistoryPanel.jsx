import React from 'react';

export default function HistoryPanel({ sessions, onClear }) {
  return (
    <div style={styles.panel}>
      <div style={styles.head}>
        <span style={styles.title}>// Session History</span>
        <button style={styles.clearBtn} onClick={() => {
          if (!sessions.length) return;
          if (window.confirm('Clear all saved sessions?')) onClear();
        }}>
          Clear
        </button>
      </div>
      <div style={styles.body}>
        {sessions.length === 0 ? (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>🗓️</div>
            <p>No sessions saved yet.</p>
          </div>
        ) : (
          <div style={styles.list}>
            {sessions.slice(0, 12).map(s => (
              <div key={s.id} style={styles.item}>
                <div>
                  <div style={{ fontWeight: 600 }}>{s.subject}</div>
                  <div style={styles.date}>{s.date}</div>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ ...styles.badge, ...styles.present }}>{s.present}P</span>
                  <span style={{ ...styles.badge, ...styles.absent  }}>{s.absent}A</span>
                  {s.late > 0 && (
                    <span style={{ ...styles.badge, ...styles.late }}>{s.late}L</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '.72rem',
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    fontWeight: 500,
  },
  clearBtn: {
    fontSize: '.75rem',
    padding: '6px 12px',
    borderRadius: 7,
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    background: 'var(--red-l)',
    color: 'var(--red)',
  },
  body: { padding: '12px 20px 20px' },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    maxHeight: 320,
    overflowY: 'auto',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 14px',
    background: 'var(--bg)',
    borderRadius: 10,
    fontSize: '.82rem',
    animation: 'fadeIn .2s ease',
  },
  date: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '.7rem',
    color: 'var(--muted)',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    fontSize: '.72rem',
    fontWeight: 700,
    padding: '4px 10px',
    borderRadius: 20,
  },
  present: { background: 'var(--green-l)', color: 'var(--green)' },
  absent:  { background: 'var(--red-l)',   color: 'var(--red)'   },
  late:    { background: 'var(--yellow-l)',color: 'var(--yellow)' },
  empty: {
    textAlign: 'center',
    padding: '24px 0',
    color: 'var(--muted)',
  },
  emptyIcon: { fontSize: '3rem', marginBottom: 12 },
};
