import React from 'react';

function StatCard({ icon, iconBg, value, valueColor, label }) {
  return (
    <div style={styles.card}>
      <div style={{ ...styles.icon, background: iconBg }}>{icon}</div>
      <div>
        <div style={{ ...styles.val, color: valueColor || 'var(--text)' }}>{value}</div>
        <div style={styles.lbl}>{label}</div>
      </div>
    </div>
  );
}

export default function StatStrip({ students }) {
  const total   = students.length;
  const present = students.filter(s => s.status === 'P').length;
  const absent  = students.filter(s => s.status === 'A' || s.status === 'L').length;
  const rate    = total ? Math.round((present / total) * 100) : 0;

  return (
    <div style={styles.strip}>
      <StatCard icon="👥" iconBg="var(--accent-l)" value={total}          label="Total Students" />
      <StatCard icon="✅" iconBg="var(--green-l)"  value={present}        label="Present Today"  valueColor="var(--green)" />
      <StatCard icon="❌" iconBg="var(--red-l)"    value={absent}         label="Absent Today"   valueColor="var(--red)" />
      <StatCard icon="📊" iconBg="var(--yellow-l)" value={`${rate}%`}    label="Attendance Rate" valueColor="var(--yellow)" />
    </div>
  );
}

const styles = {
  strip: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 14,
    marginBottom: 24,
  },
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '18px 20px',
    boxShadow: 'var(--shadow)',
    display: 'flex',
    alignItems: 'center',
    gap: 14,
  },
  icon: {
    width: 44, height: 44,
    borderRadius: 12,
    display: 'grid', placeItems: 'center',
    fontSize: 20,
    flexShrink: 0,
  },
  val:  { fontSize: '1.6rem', fontWeight: 800, lineHeight: 1 },
  lbl:  { fontSize: '.72rem', color: 'var(--muted)', marginTop: 3, fontWeight: 500 },
};
