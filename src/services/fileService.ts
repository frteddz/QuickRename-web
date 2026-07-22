export interface RenameFile {
  id: string;
  path: string;
  originalName: string;
  renamedName: string;
  status: 'pending' | 'renamed' | 'error' | 'skipped';
}

export interface UndoAction {
  files: { path: string; originalName: string }[];
  timestamp: number;
}

const undoStack: UndoAction[] = [];

export async function renameFiles(files: RenameFile[]): Promise<RenameFile[]> {
  const results: RenameFile[] = [];
  const action: UndoAction['files'] = [];

  for (const file of files) {
    try {
      if (file.originalName === file.renamedName) {
        results.push({ ...file, status: 'skipped' });
        continue;
      }

      await simulateFileOperation(file.path, file.renamedName);
      action.push({ path: file.path, originalName: file.originalName });
      results.push({ ...file, status: 'renamed' });
    } catch {
      results.push({ ...file, status: 'error' });
    }
  }

  if (action.length > 0) {
    undoStack.push({ files: action, timestamp: Date.now() });
  }

  return results;
}

export async function undoLastRename(): Promise<boolean> {
  const action = undoStack.pop();
  if (!action) return false;

  for (const file of action.files) {
    try {
      await simulateFileOperation(file.path, file.originalName);
    } catch {
      return false;
    }
  }

  return true;
}

export function getLastUndoAction(): UndoAction | null {
  return undoStack.length > 0 ? undoStack[undoStack.length - 1] : null;
}

export function getUndoCount(): number {
  return undoStack.reduce((sum, action) => sum + action.files.length, 0);
}

async function simulateFileOperation(_path: string, _newName: string): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 50));
}
