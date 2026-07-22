import { FileDropZone } from '../components/FileDropZone';
import { RenameOptions } from '../components/RenameOptions';
import { FilePreviewList } from '../components/FilePreviewList';
import { UndoBar } from '../components/UndoBar';
import { useRename } from '../hooks/useRename';

interface RenamePageProps {
  onBack: () => void;
}

export function RenamePage({ onBack }: RenamePageProps) {
  const {
    files,
    preview,
    options,
    isApplying,
    canApply,
    showUndo,
    totalRenamed,
    addFiles,
    removeFile,
    clearFiles,
    updateOptions,
    applyRename,
    undo,
    dismissUndo,
  } = useRename();

  const hasFiles = files.length > 0;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>
        <h1 style={styles.title}>QuickRename</h1>
        <div style={{ width: 60 }} />
      </header>

      <div style={styles.layout}>
        <div style={styles.sidebar}>
          <RenameOptions
            options={options}
            onOptionChange={updateOptions}
            disabled={!hasFiles}
          />

          {hasFiles && (
            <div style={styles.actions}>
              <button
                onClick={clearFiles}
                style={styles.clearBtn}
                disabled={isApplying}
              >
                Clear All
              </button>
              <button
                onClick={applyRename}
                disabled={!canApply || isApplying}
                style={{
                  ...styles.applyBtn,
                  ...(isApplying ? styles.applying : {}),
                }}
              >
                {isApplying ? 'Applying...' : `Apply to ${preview.filter(f => f.originalName !== f.renamedName).length} files`}
              </button>
            </div>
          )}
        </div>

        <div style={styles.main}>
          {!hasFiles ? (
            <div style={styles.emptyState}>
              <FileDropZone
                onFilesAdded={addFiles}
                fileCount={files.length}
              />
              <div style={styles.emptyHint}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Select files, then configure rename options on the left</span>
              </div>
            </div>
          ) : (
            <>
              <FileDropZone
                onFilesAdded={addFiles}
                fileCount={files.length}
              />
              <div style={{ marginTop: 16 }}>
                <FilePreviewList
                  preview={preview}
                  onRemoveFile={removeFile}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {showUndo && (
        <UndoBar
          count={totalRenamed}
          onUndo={undo}
          onDismiss={dismissUndo}
        />
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 12px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text-secondary)',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    fontFamily: 'inherit',
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  layout: {
    display: 'flex',
    flex: 1,
    gap: 24,
    padding: 24,
    maxWidth: 1200,
    width: '100%',
    margin: '0 auto',
  },
  sidebar: {
    width: 300,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  main: {
    flex: 1,
    minWidth: 0,
  },
  actions: {
    display: 'flex',
    gap: 8,
  },
  applyBtn: {
    flex: 1,
    padding: '10px 16px',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    backgroundColor: 'var(--color-primary)',
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    fontFamily: 'inherit',
    opacity: 1,
  },
  applying: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  clearBtn: {
    padding: '10px 16px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text-secondary)',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    fontFamily: 'inherit',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  emptyHint: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
    fontSize: 13,
    color: 'var(--color-text-tertiary)',
  },
};
