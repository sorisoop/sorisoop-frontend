import { motion } from "framer-motion";
import { useMissionFlowContext } from "@/features/parents/mission/hooks";

export default function MissionFlowTransition({ children }: { children: React.ReactNode }) {
  const { step, direction } = useMissionFlowContext();

  return (
    <div className="relative w-full overflow-hidden [height:calc(100dvh-128px)]">
      <motion.div
        key={step}
        className="absolute inset-0 overflow-y-auto"
        initial={{
          x: direction === "forward" ? "100%" : "-100%",
        }}
        animate={{ x: 0 }}
        transition={{
          type: "tween",
          ease: [0.4, 0.0, 0.2, 1],
          duration: 0.3,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
