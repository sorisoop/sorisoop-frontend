import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function MypageMenuItem({
  to,
  onClick,
  children,
}: {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const content = (
    <>
      <span className="text-lg font-medium">{children}</span>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </>
  );

  if (to) {
    return (
      <Link to={to} className="flex justify-between items-center">
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex justify-between items-center w-full text-left cursor-pointer"
    >
      {content}
    </button>
  );
}
