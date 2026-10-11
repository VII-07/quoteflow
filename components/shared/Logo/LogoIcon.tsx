export function CraneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke="var(--primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="20" y1="14" x2="20" y2="34" />
        <line x1="14" y1="34" x2="26" y2="34" />

        <line x1="10" y1="14" x2="36" y2="14" />

        <path d="M 16 14 L 20 6 L 24 14" />

        <path d="M 20 6 L 36 14" strokeWidth="1.5" />
        <path d="M 20 6 L 10 14" strokeWidth="1.5" />

        <line x1="32" y1="14" x2="32" y2="24" strokeWidth="1.5" />
        <path
          d="M 30 25 C 30 27.5 34 27.5 34 25"
          strokeWidth="1.5"
          fill="none"
        />
      </g>
    </svg>
  );
}
