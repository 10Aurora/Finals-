export function attendanceRate(student) {
  const history = student.history || [];
  if (history.length === 0) return 0;
  const present = history.filter(h => h.status === 'P' || h.status === 'L').length;
  return Math.round((present / history.length) * 100);
}

export function statusLabel(code) {
  return { P: 'Present', A: 'Absent', L: 'Late', E: 'Excused' }[code] || code;
}

export function statusClass(code) {
  return { P: 'present', A: 'absent', L: 'late', E: 'excused' }[code] || '';
}

export function statusDot(code) {
  return { P: '●', A: '●', L: '◐', E: '○' }[code] || '';
}

export function exportCSV(students, date, subject) {
  let csv = `RollCall Attendance Export\n"${subject}" — ${date}\n\n`;
  csv += 'No,Name,Student ID,Section,Status,Attendance Rate\n';
  students.forEach((s, i) => {
    csv += `${i + 1},"${s.name}","${s.id}","${s.section}","${statusLabel(s.status || '—')}","${attendanceRate(s)}%"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = `attendance_${date || 'export'}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
