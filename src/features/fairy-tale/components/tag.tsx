import { cn } from "@/shared/lib/utils";

type TagProps = {
  children: React.ReactNode;
  variant?: "default" | "subtle" | "inverted";
  className?: string;
};

export default function Tag({ children, variant = "default", className }: TagProps) {
  const base = "inline-flex items-center h-7 px-3 rounded-full text-xs font-medium whitespace-nowrap";

  const styles = {
    default: "bg-secondary text-secondary-foreground border border-border",
    subtle: "bg-muted text-muted-foreground border border-border",
    inverted: "bg-background/60 text-white border border-white/20 backdrop-blur",
  };

  return <span className={cn(base, styles[variant], className)}>{children}</span>;
}
