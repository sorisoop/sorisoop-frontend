export function ProfileRoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30 -z-10" />
      <div className="w-full max-w-4xl px-4 py-8">{children}</div>
    </div>
  );
}
