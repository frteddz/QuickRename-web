import type { RenameFile } from '../utils/renameUtils';
import { computeChangedRanges } from '../utils/renameUtils';

interface FilePreviewListProps {
  preview: RenameFile[];
  onRemoveFile?: (id: string) => void;
}

export function FilePreviewList({ preview, onRemoveFile }: FilePreviewListProps) {
  if (preview.length === 0) return null;

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <span style={styles.headerTitle}>Files ({preview.length})</span>
      </div>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Original</th>
              <th style={styles.th}>Renamed</th>
              <th style={styles.statusTh}></th>
              {onRemoveFile && <th style={styles.actionTh}></th>}
            </tr>
          </thead>
          <tbody>
            {preview.map(file => (
              <tr key={file.id} style={styles.tr}>
                <td style={styles.td}>
                  <span style={styles.fileName}>{file.originalName}</span>
                </td>
                <td style={styles.td}>
                  <span style={styles.renamedCell}>
                    <ChangedText
                      original={file.originalName}
                      renamed={file.renamedName}
                    />
                  </span>
                </td>
                <td style={styles.statusTd}>
                  <StatusIcon status={file.status} />
                </td>
                {onRemoveFile && (
                  <td style={styles.actionTd}>
                    <button
                      onClick={() => onRemoveFile(file.id)}
                      style={styles.removeBtn}
                      title="Remove file"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChangedText({ original, renamed }: { original: string; renamed: string }) {
  const ranges = computeChangedRanges(original, renamed);

  return (
    <>
      {ranges.map((range, i) => {
        if (range.type === 'keep') {
          return <span key={i}>{range.text}</span>;
        }
        if (range.type === 'add') {
          return (
            <span key={i} style={styles.added}>{range.text}</span>
          );
        }
        return (
          <span key={i} style={styles.removed}>{range.text}</span>
        );
      })}
    </>
  );
}

function StatusIcon({ status }: { status: RenameFile['status'] }) {
  if (status === 'pending') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }
  if (status === 'renamed') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    );
  }
  if (status === 'error') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--color-border)',
    overflow: 'hidden',
    backgroundColor: 'var(--color-surface)',
  },
  header: {
    padding: '12px 16px',
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface-secondary)',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--color-text)',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 13,
  },
  th: {
    textAlign: 'left',
    padding: '10px 16px',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)',
  },
  statusTh: {
    width: 36,
    padding: '10px 8px',
    borderBottom: '1px solid var(--color-border)',
  },
  actionTh: {
    width: 40,
    padding: '10px 8px',
    borderBottom: '1px solid var(--color-border)',
  },
  tr: {
    borderBottom: '1px solid var(--color-border)',
    transition: 'background-color var(--transition-fast)',
  },
  td: {
    padding: '10px 16px',
    color: 'var(--color-text)',
    maxWidth: 300,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  statusTd: {
    padding: '10px 8px',
    textAlign: 'center',
  },
  actionTd: {
    padding: '10px 8px',
    textAlign: 'center',
  },
  fileName: {
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
  },
  renamedCell: {
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
  },
  added: {
    backgroundColor: 'var(--color-success-light)',
    color: 'var(--color-success)',
    borderRadius: 2,
    padding: '0 2px',
    fontWeight: 600,
  },
  removed: {
    backgroundColor: 'var(--color-error-light)',
    color: 'var(--color-error)',
    borderRadius: 2,
    padding: '0 2px',
    textDecoration: 'line-through',
  },
  removeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'transparent',
    color: 'var(--color-text-tertiary)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
  },
};
