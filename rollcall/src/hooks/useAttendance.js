import { useState, useEffect } from 'react';

const SEED_STUDENTS = [
  { id: '2024-001', name: 'Maria Santos',   section: 'BSIT 2A', status: '', history: [] },
  { id: '2024-002', name: 'Juan dela Cruz', section: 'BSIT 2A', status: '', history: [] },
  { id: '2024-003', name: 'Ana Reyes',      section: 'BSIT 2A', status: '', history: [] },
  { id: '2024-004', name: 'Carlos Mendoza', section: 'BSIT 2A', status: '', history: [] },
  { id: '2024-005', name: 'Sofia Garcia',   section: 'BSIT 2A', status: '', history: [] },
];

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function useAttendance() {
  const [students, setStudents] = useState(() => {
    const saved = loadFromStorage('rc_students', null);
    return saved && saved.length > 0 ? saved : SEED_STUDENTS;
  });

  const [sessions, setSessions] = useState(() =>
    loadFromStorage('rc_sessions', [])
  );

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('rc_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('rc_sessions', JSON.stringify(sessions));
  }, [sessions]);

  // ── ACTIONS ──────────────────────────────────────────────────

  const addStudent = ({ name, id, section }) => {
    if (students.find(s => s.id === id)) {
      return { error: 'Student ID already exists!' };
    }
    setStudents(prev => [
      ...prev,
      { id, name, section: section || '—', status: '', history: [] },
    ]);
    return { success: true };
  };

  const removeStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const markStudent = (id, status) => {
    setStudents(prev =>
      prev.map(s =>
        s.id === id
          ? { ...s, status: s.status === status ? '' : status }
          : s
      )
    );
  };

  const markAll = (status) => {
    setStudents(prev => prev.map(s => ({ ...s, status })));
  };

  const saveSession = ({ date, subject }) => {
    const unmarked = students.filter(s => !s.status).length;

    // Push history entry to each student
    setStudents(prev =>
      prev.map(s => ({
        ...s,
        history: [
          ...(s.history || []).filter(h => h.date !== date),
          { date, status: s.status || 'A' },
        ],
      }))
    );

    const snapshot = {
      id: Date.now(),
      date,
      subject: subject || 'Class',
      total:   students.length,
      present: students.filter(s => s.status === 'P').length,
      absent:  students.filter(s => s.status === 'A').length,
      late:    students.filter(s => s.status === 'L').length,
      excused: students.filter(s => s.status === 'E').length,
    };
    setSessions(prev => [snapshot, ...prev]);

    return { unmarked };
  };

  const clearHistory = () => {
    setSessions([]);
  };

  return {
    students,
    sessions,
    addStudent,
    removeStudent,
    markStudent,
    markAll,
    saveSession,
    clearHistory,
  };
}
