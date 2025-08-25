import { motion, AnimatePresence } from "framer-motion";
import { useDrawFlow } from "../hooks";

const slideVariants = {
  initial: (direction: "forward" | "backward") => ({
    x: direction === "forward" ? "100%" : "-100%",
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: "forward" | "backward") => ({
    x: direction === "forward" ? "-100%" : "100%",
    opacity: 0,
  }),
};

const transition = {
  type: "tween" as const,
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.3,
} as const;

export function DrawFlowTransition({ children }: { children: React.ReactNode }) {
  const { step, direction } = useDrawFlow();

  return (
    <div className="relative w-full min-h-screen overflow-y-auto">
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          className="absolute inset-0 w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
