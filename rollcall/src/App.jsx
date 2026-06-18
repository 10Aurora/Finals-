import React, { useState } from 'react';
import TopBar          from './components/TopBar';
import StatStrip       from './components/StatStrip';
import AddStudentForm  from './components/AddStudentForm';
import SessionPanel    from './components/SessionPanel';
import HistoryPanel    from './components/HistoryPanel';
import AttendanceTable from './components/AttendanceTable';
import DeleteModal     from './components/DeleteModal';
import Toast, { useToast } from './components/Toast';
import { useAttendance }   from './hooks/useAttendance';

export default function App() {
  const {
    students, sessions,
    addStudent, removeStudent,
    markStudent, markAll,
    saveSession, clearHistory,
  } = useAttendance();

  const { message, visible, showToast } = useToast();
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDelete = (id) => setDeleteTarget(id);

  const handleConfirmDelete = () => {
    removeStudent(deleteTarget);
    showToast('✓ Student removed.');
    setDeleteTarget(null);
  };

  const handleMarkAll = (status) => {
    markAll(status);
    const label = { P: 'Present', A: 'Absent', L: 'Late', E: 'Excused' }[status];
    showToast(`✓ All marked as ${label}`);
  };

  return (
    <>
      <TopBar />

      <div style={styles.main}>
        {/* Stats Strip */}
        <StatStrip students={students} />

        {/* Two-column layout */}
        <div style={styles.layout2}>

          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <AddStudentForm onAdd={addStudent}  onToast={showToast} />
            <SessionPanel   students={students} onSave={saveSession} onToast={showToast} />
            <HistoryPanel   sessions={sessions} onClear={clearHistory} />
          </div>

          {/* Right column */}
          <AttendanceTable
            students={students}
            onMark={markStudent}
            onMarkAll={handleMarkAll}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <DeleteModal
        studentId={deleteTarget}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <Toast message={message} visible={visible} />
    </>
  );
}

const styles = {
  main: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '28px 20px 0',
  },
  layout2: {
    display: 'grid',
    gridTemplateColumns: '340px 1fr',
    gap: 20,
  },
};
