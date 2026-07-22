import { useState, useCallback, useMemo, useRef } from 'react';
import type { RenameFile, RenameOptions } from '../utils/renameUtils';
import { generatePreview } from '../utils/renameUtils';
import { renameFiles, undoLastRename, getUndoCount } from '../services/fileService';

export { type RenameFile, type RenameOptions };

const defaultOptions: RenameOptions = {
  prefix: '',
  suffix: '',
  findText: '',
  replaceText: '',
  numberStart: 1,
  numberPadding: 3,
  numberPosition: 'prefix',
};

export function useRename() {
  const [files, setFiles] = useState<{ id: string; path: string; originalName: string }[]>([]);
  const [options, setOptions] = useState<RenameOptions>(defaultOptions);
  const [renamedCount, setRenamedCount] = useState(0);
  const [isApplying, setIsApplying] = useState(false);
  const [showUndo, setShowUndo] = useState(false);
  const undoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const preview = useMemo(
    () => generatePreview(files, options),
    [files, options],
  );

  const canApply = useMemo(
    () => files.length > 0 && preview.some(f => f.originalName !== f.renamedName),
    [files, preview],
  );

  const addFiles = useCallback((newFiles: { id: string; path: string; originalName: string }[]) => {
    setFiles(prev => {
      const existing = new Set(prev.map(f => f.path));
      const unique = newFiles.filter(f => !existing.has(f.path));
      return [...prev, ...unique];
    });
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  const updateOptions = useCallback(<K extends keyof RenameOptions>(
    key: K,
    value: RenameOptions[K],
  ) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  }, []);

  const setOptionsBulk = useCallback((newOptions: Partial<RenameOptions>) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
  }, []);

  const applyRename = useCallback(async () => {
    if (!canApply || isApplying) return;
    setIsApplying(true);

    try {
      const results = await renameFiles(preview);
      const renamed = results.filter(r => r.status === 'renamed').length;
      setRenamedCount(prev => prev + renamed);
      setShowUndo(true);
      setFiles([]);

      if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
      undoTimeoutRef.current = setTimeout(() => setShowUndo(false), 10000);
    } finally {
      setIsApplying(false);
    }
  }, [canApply, isApplying, preview]);

  const undo = useCallback(async () => {
    const success = await undoLastRename();
    if (success) {
      setRenamedCount(prev => Math.max(0, prev - 1));
    }
    setShowUndo(false);
    if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
  }, []);

  const totalRenamed = useMemo(() => renamedCount + getUndoCount(), [renamedCount]);

  return {
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
    setOptionsBulk,
    applyRename,
    undo,
    dismissUndo: () => setShowUndo(false),
  };
}
