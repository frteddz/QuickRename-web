export interface RenameOptions {
  prefix: string;
  suffix: string;
  findText: string;
  replaceText: string;
  numberStart: number;
  numberPadding: number;
  numberPosition: 'prefix' | 'suffix';
}

export interface RenameFile {
  id: string;
  path: string;
  originalName: string;
  renamedName: string;
  status: 'pending' | 'renamed' | 'error' | 'skipped';
}

const INVALID_FILENAME_CHARS = /[<>:"/\\|?*\x00-\x1f]/g;
const RESERVED_NAMES = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\..*)?$/i;

export function validateFilename(name: string): string | null {
  if (!name || name.trim().length === 0) return 'Filename cannot be empty';
  if (name.length > 255) return 'Filename is too long (max 255 characters)';
  if (INVALID_FILENAME_CHARS.test(name)) return 'Filename contains invalid characters';
  if (name === '.' || name === '..') return 'Filename cannot be . or ..';
  if (RESERVED_NAMES.test(name)) return 'Filename uses a reserved system name';
  if (name.endsWith(' ') || name.endsWith('.')) return 'Filename cannot end with space or period';
  return null;
}

export function applyRenameRules(
  originalName: string,
  options: RenameOptions,
  index: number,
): string {
  const dotIndex = originalName.lastIndexOf('.');
  const base = dotIndex > 0 ? originalName.slice(0, dotIndex) : originalName;
  const ext = dotIndex > 0 ? originalName.slice(dotIndex) : '';

  let name = base;

  if (options.numberPosition === 'prefix') {
    const num = String(options.numberStart + index).padStart(options.numberPadding, '0');
    name = `${num}_${name}`;
  }

  if (options.prefix) {
    name = `${options.prefix}${name}`;
  }

  if (options.findText) {
    name = name.replaceAll(options.findText, options.replaceText);
  }

  if (options.suffix) {
    name = `${name}${options.suffix}`;
  }

  if (options.numberPosition === 'suffix') {
    const num = String(options.numberStart + index).padStart(options.numberPadding, '0');
    name = `${name}_${num}`;
  }

  return `${name}${ext}`;
}

export function generatePreview(
  files: { id: string; path: string; originalName: string }[],
  options: RenameOptions,
): RenameFile[] {
  return files.map((file, i) => ({
    ...file,
    renamedName: applyRenameRules(file.originalName, options, i),
    status: 'pending' as const,
  }));
}

export function computeChangedRanges(
  original: string,
  renamed: string,
): { type: 'add' | 'remove' | 'keep'; text: string }[] {
  const ranges: { type: 'add' | 'remove' | 'keep'; text: string }[] = [];
  let i = 0;
  let j = 0;

  while (i < original.length || j < renamed.length) {
    if (i < original.length && j < renamed.length && original[i] === renamed[j]) {
      let keep = '';
      while (i < original.length && j < renamed.length && original[i] === renamed[j]) {
        keep += original[i];
        i++;
        j++;
      }
      ranges.push({ type: 'keep', text: keep });
    } else {
      let removed = '';
      while (i < original.length && (j >= renamed.length || original[i] !== renamed[j])) {
        removed += original[i];
        i++;
      }
      if (removed) ranges.push({ type: 'remove', text: removed });

      let added = '';
      while (j < renamed.length && (i >= original.length || original[i] !== renamed[j])) {
        added += renamed[j];
        j++;
      }
      if (added) ranges.push({ type: 'add', text: added });
    }
  }

  return ranges;
}
