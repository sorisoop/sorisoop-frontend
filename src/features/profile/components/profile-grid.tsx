export function ProfileGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-16 place-items-center max-w-4xl mx-auto">{children}</div>
  );
}
