import { useEffect } from 'react';

interface UndoBarProps {
  count: number;
  onUndo: () => void;
  onDismiss: () => void;
  autoDismissMs?: number;
}

export function UndoBar({ count, onUndo, onDismiss, autoDismissMs = 10000 }: UndoBarProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, autoDismissMs);
    return () => clearTimeout(timer);
  }, [onDismiss, autoDismissMs]);

  return (
    <div style={styles.bar}>
      <span style={styles.text}>
        Renamed {count} file{count !== 1 ? 's' : ''}
      </span>
      <button onClick={onUndo} style={styles.undoBtn}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
        Undo
      </button>
      <button onClick={onDismiss} style={styles.dismissBtn} aria-label="Dismiss">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  bar: {
    position: 'fixed',
    bottom: 24,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '12px 20px',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 100,
    animation: 'slideUp 0.3s ease forwards',
  },
  text: {
    fontSize: 14,
    fontWeight: 500,
    color: 'var(--color-text)',
  },
  undoBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 14px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-primary)',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    fontFamily: 'inherit',
  },
  dismissBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 'var(--radius-sm)',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'var(--color-text-tertiary)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    fontFamily: 'inherit',
  },
};
