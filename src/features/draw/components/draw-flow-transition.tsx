import { motion, AnimatePresence } from "framer-motion";
import { useDrawFlow } from "../hooks";

export function DrawFlowTransition({ children }: { children: React.ReactNode }) {
  const { step, direction } = useDrawFlow();

  const isErrorStep = step === "error" || step === "subscription-required";

  const slideVariants = {
    initial: { x: direction === "forward" ? "100%" : "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
  };

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={step}
          className="absolute inset-0 w-full h-full overflow-y-auto"
          initial={isErrorStep ? fadeVariants.initial : slideVariants.initial}
          animate={isErrorStep ? fadeVariants.animate : slideVariants.animate}
          exit={isErrorStep ? { opacity: 0 } : undefined}
          transition={{
            type: "tween",
            ease: [0.4, 0.0, 0.2, 1],
            duration: 0.3,
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
