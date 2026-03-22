type Props = { label: string; size?: 'sm' | 'md' };

export default function Tag({ label, size = 'sm' }: Props) {
  return (
    <span
      className={`inline-block rounded-md font-mono font-medium ${
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'
      }`}
      style={{
        background: 'var(--accent-muted)',
        color: 'var(--accent)',
        border: '1px solid var(--accent)',
        borderColor: 'var(--accent)',
        opacity: 0.9,
      }}
    >
      {label}
    </span>
  );
}
