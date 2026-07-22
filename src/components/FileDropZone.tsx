import { useState, useCallback, useRef, type DragEvent, type ChangeEvent } from 'react';

interface FileDropZoneProps {
  onFilesAdded: (files: { id: string; path: string; originalName: string }[]) => void;
  fileCount: number;
}

function generateId() {
  return `file-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function FileDropZone({ onFilesAdded, fileCount }: FileDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(
    (fileList: FileList | File[]) => {
      const entries = Array.from(fileList).map(file => ({
        id: generateId(),
        path: (file as File & { path?: string }).path || file.name,
        originalName: file.name,
      }));
      onFilesAdded(entries);
    },
    [onFilesAdded],
  );

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const items = e.dataTransfer?.items;
      if (items) {
        const entryFiles: File[] = [];
        const traverse = (entry: FileSystemEntry) => {
          if (entry.isFile) {
            (entry as FileSystemFileEntry).file(file => entryFiles.push(file));
          } else if (entry.isDirectory) {
            const reader = (entry as FileSystemDirectoryEntry).createReader();
            reader.readEntries(entries => {
              entries.forEach(traverse);
            });
          }
        };

        for (let i = 0; i < items.length; i++) {
          const entry = items[i].webkitGetAsEntry();
          if (entry) traverse(entry);
        }

        if (entryFiles.length > 0) {
          setTimeout(() => processFiles(entryFiles), 0);
        }
      } else {
        const files = e.dataTransfer?.files;
        if (files && files.length > 0) processFiles(files);
      }
    },
    [processFiles],
  );

  const handleFileSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        processFiles(files);
        e.target.value = '';
      }
    },
    [processFiles],
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      style={{
        ...styles.container,
        ...(isDragging ? styles.containerDragging : {}),
      }}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        /* @ts-ignore - webkitdirectory is a valid attribute */
        webkitdirectory=""
        directory=""
      />
      <div style={styles.icon}>
        {isDragging ? (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        ) : (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        )}
      </div>
      <p style={styles.text}>
        {isDragging ? 'Drop files here' : 'Drag & drop files or folders here'}
      </p>
      <p style={styles.subtext}>or click to browse</p>
      {fileCount > 0 && (
        <div style={styles.count}>{fileCount} file{fileCount !== 1 ? 's' : ''} selected</div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    border: '2px dashed var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    padding: '40px 24px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all var(--transition-normal)',
    backgroundColor: 'var(--color-surface)',
  },
  containerDragging: {
    borderColor: 'var(--color-primary)',
    backgroundColor: 'var(--color-primary-light)',
    transform: 'scale(1.02)',
  },
  icon: {
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
    color: 'var(--color-text)',
    marginBottom: 4,
  },
  subtext: {
    fontSize: 13,
    color: 'var(--color-text-tertiary)',
  },
  count: {
    marginTop: 16,
    padding: '6px 16px',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-primary-light)',
    color: 'var(--color-primary)',
    fontSize: 13,
    fontWeight: 600,
    display: 'inline-block',
  },
};
