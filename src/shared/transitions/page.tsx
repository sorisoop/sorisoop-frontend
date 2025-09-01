import { motion, type Variants } from "framer-motion";
import { useLocation } from "react-router-dom";
import { usePageDirection } from "@/shared/transitions";

const slideVariants: Variants = {
  initial: ({ direction }: { direction: "forward" | "backward" }) => ({
    x: direction === "forward" ? "100%" : "-100%",
    opacity: 0,
  }),
  animate: { x: 0, opacity: 1 },
  exit: ({ prevDirection }: { prevDirection: "forward" | "backward" }) => ({
    x: prevDirection === "forward" ? "-100%" : "100%",
    opacity: 0,
  }),
};

type PageProps = {
  type: "basic" | "slide";
  children: React.ReactNode;
};

export default function Page({ type, children }: PageProps) {
  const { pathname } = useLocation();
  const { direction, prevDirection } = usePageDirection(pathname);

  const variants: Variants = type === "slide" ? slideVariants : {};
  const custom = type === "slide" ? { direction, prevDirection } : undefined;

  return (
    <motion.main
      variants={variants}
      custom={custom}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      {children}
    </motion.main>
  );
}
