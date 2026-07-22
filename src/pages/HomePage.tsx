interface HomePageProps {
  onStart: () => void;
}

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
        <path d="M9 12h6" />
        <path d="M12 9v6" />
      </svg>
    ),
    title: 'Prefix & Suffix',
    desc: 'Add text before or after filenames in one click.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 5h4v4" />
        <path d="M3 20 20 3" />
        <path d="M8.5 9.5 12 8l-1.5 3.5L8 12Z" />
        <path d="M16 14h4v4" />
        <path d="M8 19h4v4" />
      </svg>
    ),
    title: 'Find & Replace',
    desc: 'Replace specific text patterns across all files.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22" />
        <polyline points="19 15 12 22 5 15" />
      </svg>
    ),
    title: 'Number Sequence',
    desc: 'Auto-number files with custom padding and position.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'Live Preview',
    desc: 'See changes instantly before applying anything.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
    ),
    title: 'Instant Undo',
    desc: 'Revert changes with a single click. No stress.',
  },
];

export function HomePage({ onStart }: HomePageProps) {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.iconWrap}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        </div>
        <h1 style={styles.title}>QuickRename</h1>
        <p style={styles.subtitle}>Bulk File Renamer</p>
        <p style={styles.description}>
          Rename hundreds of files in seconds. Add prefixes, suffixes, replace text,
          or auto-number — with a live preview and one-click undo.
        </p>
        <button onClick={onStart} style={styles.cta}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Start Renaming
        </button>
      </div>

      <div style={styles.features}>
        {features.map((feature, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.cardIcon}>{feature.icon}</div>
            <div>
              <h3 style={styles.cardTitle}>{feature.title}</h3>
              <p style={styles.cardDesc}>{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '80px 24px 60px',
    maxWidth: 720,
    margin: '0 auto',
    width: '100%',
    animation: 'fadeIn 0.4s ease forwards',
  },
  hero: {
    textAlign: 'center',
    marginBottom: 64,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 'var(--radius-xl)',
    backgroundColor: 'var(--color-primary-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 700,
    color: 'var(--color-text)',
    marginBottom: 8,
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 500,
    color: 'var(--color-primary)',
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: 'var(--color-text-secondary)',
    maxWidth: 480,
    lineHeight: 1.7,
  },
  cta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 32,
    padding: '14px 32px',
    borderRadius: 'var(--radius-lg)',
    border: 'none',
    backgroundColor: 'var(--color-primary)',
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all var(--transition-normal)',
    fontFamily: 'inherit',
    boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 16,
    width: '100%',
  },
  card: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
    padding: 20,
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    transition: 'all var(--transition-normal)',
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-primary-light)',
    color: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--color-text)',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: 'var(--color-text-secondary)',
    lineHeight: 1.5,
  },
};
