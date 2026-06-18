import React, { useState } from 'react';
import { attendanceRate, statusLabel, statusClass, statusDot } from '../utils/helpers';

function Badge({ status }) {
  if (!status) return <span style={{ color: 'var(--muted)', fontSize: '.78rem' }}>—</span>;
  const colors = {
    present: { bg: 'var(--green-l)', color: 'var(--green)'  },
    absent:  { bg: 'var(--red-l)',   color: 'var(--red)'    },
    late:    { bg: 'var(--yellow-l)',color: 'var(--yellow)'  },
    excused: { bg: 'var(--blue-l)',  color: 'var(--blue)'   },
  };
  const cls = statusClass(status);
  const c   = colors[cls] || {};
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: '.72rem', fontWeight: 700,
      padding: '4px 10px', borderRadius: 20,
      background: c.bg, color: c.color,
      whiteSpace: 'nowrap',
    }}>
      {statusDot(status)} {statusLabel(status)}
    </span>
  );
}

function AttBtn({ label, active, color, onClick }) {
  const colors = {
    P: { bg: 'var(--green-l)', fg: 'var(--green)', active: 'var(--green)' },
    A: { bg: 'var(--red-l)',   fg: 'var(--red)',   active: 'var(--red)'   },
    L: { bg: 'var(--yellow-l)',fg: 'var(--yellow)',active: 'var(--yellow)' },
    E: { bg: 'var(--blue-l)', fg: 'var(--blue)',  active: 'var(--blue)'  },
  };
  const c = colors[color] || {};
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: '.7rem', fontWeight: 700,
        padding: '5px 10px', borderRadius: 7,
        border: `1.5px solid ${active ? c.active : c.bg}`,
        background: active ? c.active : c.bg,
        color:      active ? '#fff'   : c.fg,
        cursor: 'pointer',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        transition: 'all .15s',
      }}
    >
      {label}
    </button>
  );
}

export default function AttendanceTable({ students, onMark, onMarkAll, onDelete }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                        s.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === '' || s.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div style={styles.panel}>
      {/* Header */}
      <div style={styles.head}>
        <span style={styles.title}>// Attendance Sheet</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ ...styles.btn, ...styles.ghost }} onClick={() => onMarkAll('P')}>All Present</button>
          <button style={{ ...styles.btn, ...styles.ghost }} onClick={() => onMarkAll('A')}>All Absent</button>
        </div>
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <input
          style={{ ...styles.input, flex: 1, minWidth: 140 }}
          placeholder="🔍  Search student…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          style={{ ...styles.input, maxWidth: 160 }}
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="P">Present</option>
          <option value="A">Absent</option>
          <option value="L">Late</option>
          <option value="E">Excused</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        {filtered.length === 0 ? (
          <div style={styles.empty}>
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>📭</div>
            <p style={{ fontSize: '.9rem' }}>
              {students.length === 0
                ? 'No students enrolled yet. Add one from the left panel.'
                : 'No students match your search.'}
            </p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['#', 'Student', 'Section', 'Status', 'Mark', 'Rate', ''].map(h => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => {
                const rate = attendanceRate(s);
                const rateColor = rate >= 75 ? 'var(--green)' : rate >= 50 ? 'var(--yellow)' : 'var(--red)';
                return (
                  <tr key={s.id} style={styles.tr}>
                    <td style={{ ...styles.td, color: 'var(--muted)', fontSize: '.78rem', fontFamily: "'JetBrains Mono', monospace" }}>
                      {i + 1}
                    </td>
                    <td style={styles.td}>
                      <div style={{ fontWeight: 600 }}>{s.name}</div>
                      <div style={{ fontSize: '.72rem', color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>{s.id}</div>
                    </td>
                    <td style={{ ...styles.td, fontSize: '.8rem', color: 'var(--muted)' }}>{s.section}</td>
                    <td style={styles.td}><Badge status={s.status} /></td>
                    <td style={styles.td}>
                      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                        {['P', 'A', 'L', 'E'].map(code => (
                          <AttBtn
                            key={code}
                            label={code}
                            color={code}
                            active={s.status === code}
                            onClick={() => onMark(s.id, code)}
                          />
                        ))}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{ color: rateColor, fontSize: '.8rem', fontWeight: 700 }}>{rate}%</div>
                      <div style={{ width: 80, height: 6, background: 'var(--border)', borderRadius: 99, overflow: 'hidden', marginTop: 4 }}>
                        <div style={{ width: `${rate}%`, height: '100%', background: rateColor, borderRadius: 99, transition: 'width .4s ease' }} />
                      </div>
                    </td>
                    <td style={styles.td}>
                      <button
                        onClick={() => onDelete(s.id)}
                        style={{
                          fontSize: '.7rem', fontWeight: 700,
                          padding: '5px 10px', borderRadius: 7,
                          border: 'none', cursor: 'pointer',
                          background: 'var(--red-l)', color: 'var(--red)',
                        }}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
    alignSelf: 'start',
  },
  head: {
    padding: '16px 20px',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  title: {
    fontSize: '.72rem',
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    fontWeight: 500,
  },
  toolbar: {
    display: 'flex', gap: 10, flexWrap: 'wrap',
    padding: '14px 20px',
    borderBottom: '1px solid var(--border)',
    background: 'var(--bg)',
  },
  input: {
    border: '1.5px solid var(--border)',
    borderRadius: 10,
    background: '#fff',
    color: 'var(--text)',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '.88rem',
    padding: '10px 13px',
    outline: 'none',
  },
  th: {
    fontSize: '.7rem',
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    padding: '10px 16px',
    textAlign: 'left',
    borderBottom: '1px solid var(--border)',
    whiteSpace: 'nowrap',
    background: 'var(--bg)',
  },
  tr: { borderBottom: '1px solid var(--border)' },
  td: { padding: '12px 16px', fontSize: '.875rem', verticalAlign: 'middle' },
  btn: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700, fontSize: '.75rem',
    border: 'none', cursor: 'pointer',
    borderRadius: 7, padding: '6px 12px',
    transition: 'filter .15s',
  },
  ghost: {
    background: 'var(--bg)',
    color: 'var(--muted)',
    border: '1px solid var(--border)',
  },
  empty: {
    textAlign: 'center',
    padding: '48px 20px',
    color: 'var(--muted)',
  },
};
