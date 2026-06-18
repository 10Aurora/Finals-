import React, { useState, useEffect, useCallback } from 'react';

export function useToast() {
  const [message, setMessage] = useState('');
  const [visible, setVisible]  = useState(false);

  const showToast = useCallback((msg) => {
    setMessage(msg);
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = setTimeout(() => setVisible(false), 2300);
    return () => clearTimeout(id);
  }, [visible, message]);

  return { message, visible, showToast };
}

export default function Toast({ message, visible }) {
  return (
    <div style={{
      position: 'fixed', bottom: 28, left: '50%',
      transform: `translateX(-50%) translateY(${visible ? '0' : '70px'})`,
      background: '#111827', color: '#fff',
      fontSize: '.8rem',
      fontFamily: "'JetBrains Mono', monospace",
      padding: '11px 24px', borderRadius: 30,
      transition: 'transform .3s ease',
      zIndex: 999, pointerEvents: 'none',
      boxShadow: '0 8px 24px rgba(0,0,0,.2)',
      whiteSpace: 'nowrap',
    }}>
      {message}
    </div>
  );
}
