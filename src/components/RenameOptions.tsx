import type { RenameOptions as RenameOptionsType } from '../utils/renameUtils';

interface RenameOptionsProps {
  options: RenameOptionsType;
  onOptionChange: <K extends keyof RenameOptionsType>(
    key: K,
    value: RenameOptionsType[K],
  ) => void;
  disabled?: boolean;
}

export function RenameOptions({ options, onOptionChange, disabled }: RenameOptionsProps) {
  return (
    <div style={styles.panel}>
      <TextField
        label="Prefix"
        value={options.prefix}
        placeholder="e.g. project_"
        onChange={v => onOptionChange('prefix', v)}
        disabled={disabled}
      />
      <TextField
        label="Suffix"
        value={options.suffix}
        placeholder="e.g. _final"
        onChange={v => onOptionChange('suffix', v)}
        disabled={disabled}
      />

      <div style={styles.divider} />

      <TextField
        label="Find"
        value={options.findText}
        placeholder="Text to find..."
        onChange={v => onOptionChange('findText', v)}
        disabled={disabled}
      />
      <TextField
        label="Replace"
        value={options.replaceText}
        placeholder="Replacement text..."
        onChange={v => onOptionChange('replaceText', v)}
        disabled={disabled}
      />

      <div style={styles.divider} />

      <div style={styles.sectionLabel}>Number Sequence</div>
      <div style={styles.row}>
        <div style={{ flex: 1 }}>
          <NumberField
            label="Start"
            value={options.numberStart}
            min={0}
            onChange={v => onOptionChange('numberStart', v)}
            disabled={disabled}
          />
        </div>
        <div style={{ width: 12 }} />
        <div style={{ flex: 1 }}>
          <NumberField
            label="Padding"
            value={options.numberPadding}
            min={1}
            max={10}
            onChange={v => onOptionChange('numberPadding', v)}
            disabled={disabled}
          />
        </div>
      </div>
      <div style={styles.radioRow}>
        <span style={styles.radioLabel}>Position:</span>
        <label style={styles.radio}>
          <input
            type="radio"
            name="numberPosition"
            checked={options.numberPosition === 'prefix'}
            onChange={() => onOptionChange('numberPosition', 'prefix')}
            disabled={disabled}
          />
          <span>Prefix</span>
        </label>
        <label style={styles.radio}>
          <input
            type="radio"
            name="numberPosition"
            checked={options.numberPosition === 'suffix'}
            onChange={() => onOptionChange('numberPosition', 'suffix')}
            disabled={disabled}
          />
          <span>Suffix</span>
        </label>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  placeholder,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        style={styles.input}
      />
    </div>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  onChange,
  disabled,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={e => onChange(Number(e.target.value))}
        disabled={disabled}
        style={styles.input}
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--color-border)',
    padding: 20,
    backgroundColor: 'var(--color-surface)',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
  },
  input: {
    padding: '8px 12px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text)',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color var(--transition-fast)',
    width: '100%',
  },
  divider: {
    height: 1,
    backgroundColor: 'var(--color-border)',
    margin: '4px 0',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: 700,
    color: 'var(--color-text)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  row: {
    display: 'flex',
    gap: 12,
  },
  radioRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    paddingTop: 4,
  },
  radioLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
  },
  radio: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 13,
    color: 'var(--color-text)',
    cursor: 'pointer',
  },
};
