import React, { useState, useEffect } from 'react';

export default function TopBar() {
  const [time, setTime] = useState('');
  const [dateChip, setDateChip] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
      }));
    };
    tick();
    const id = setInterval(tick, 1000);

    setDateChip(new Date().toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric',
    }));

    return () => clearInterval(id);
  }, []);

  return (
    <div style={styles.topbar}>
      <div style={styles.brand}>
        <div style={styles.brandIcon}>📋</div>
        <h1 style={styles.brandName}>
          Roll<span style={{ color: 'var(--accent)' }}>Call</span>
        </h1>
      </div>
      <div style={styles.right}>
        <span style={styles.clock}>{time}</span>
        <span style={styles.chip}>{dateChip}</span>
      </div>
    </div>
  );
}

const styles = {
  topbar: {
    background: 'var(--surface)',
    borderBottom: '1px solid var(--border)',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 1px 8px rgba(0,0,0,.06)',
  },
  brand: { display: 'flex', alignItems: 'center', gap: 10 },
  brandIcon: {
    width: 36, height: 36,
    background: 'var(--accent)',
    borderRadius: 9,
    display: 'grid', placeItems: 'center',
    fontSize: 18,
  },
  brandName: {
    fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.5px',
  },
  right: {
    display: 'flex', alignItems: 'center', gap: 12,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '.75rem', color: 'var(--muted)',
  },
  clock: { fontFamily: "'JetBrains Mono', monospace" },
  chip: {
    background: 'var(--accent-l)',
    color: 'var(--accent)',
    borderRadius: 20,
    padding: '5px 12px',
    fontWeight: 600,
    fontSize: '.75rem',
  },
};
