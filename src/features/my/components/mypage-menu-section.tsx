export default function MypageMenuSection({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="pt-8">
      {title && (
        <div className="border-b border-border pb-2">
          <p className="text-base text-muted-foreground">{title}</p>
        </div>
      )}
      <div className="flex flex-col gap-6 pt-2">{children}</div>
    </section>
  );
}
