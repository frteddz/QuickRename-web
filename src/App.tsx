import { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { RenamePage } from './pages/RenamePage';
import { useTheme } from './hooks/useTheme';
import { LicenseProvider, useLicense } from './licensing/LicenseProvider';
import { AnimatedBackground } from './components/AnimatedBackground';

type Page = 'home' | 'rename';

export default function App() {
  return <LicenseProvider productKey="QuickRename"><AppInner /></LicenseProvider>;
}

function AppInner() {
  const [page, setPage] = useState<Page>('home');
  const { theme, toggleTheme } = useTheme();
  const { isPro, setShowProModal } = useLicense();

  return (
    <>
      <AnimatedBackground />
      <div style={{ ...styles.app, position: 'relative', zIndex: 1 }}>
      <div style={styles.topBar}>
        {!isPro && (
          <button
            onClick={() => setShowProModal(true)}
            style={{
              ...styles.themeBtn,
              background: 'var(--color-primary)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.8rem',
              width: 'auto',
              padding: '0 12px',
              marginRight: '8px',
            }}
          >
            Unlock Studio Pass
          </button>
        )}
        <button onClick={toggleTheme} style={styles.themeBtn} aria-label="Toggle theme">
          {theme === 'dark' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
      {page === 'home' ? (
        <HomePage onStart={() => setPage('rename')} />
      ) : (
        <RenamePage onBack={() => setPage('home')} />
      )}
    </div>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '12px 24px',
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: 50,
  },
  themeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text-secondary)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    fontFamily: 'inherit',
  },
};
