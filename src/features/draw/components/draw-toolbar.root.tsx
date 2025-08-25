export function DrawToolbarRoot({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex gap-3 ${className}`}>{children}</div>;
}
