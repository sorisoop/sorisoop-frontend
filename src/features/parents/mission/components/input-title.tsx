import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useMissionFlowContext } from "@/features/parents/mission/hooks";
import { MissionStep } from "@/features/parents/mission/types";

export default function InputTitle() {
  const { goToStep, step, missionTitle, setMissionTitle } = useMissionFlowContext();

  const isValid = missionTitle.trim().length > 0;

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold mt-6">미션 제목을 입력해주세요</h2>
      <p className="text-base text-muted-foreground mt-2 mb-6">입력한 제목은 아이에게 보여질 미션 이름이에요</p>

      <Input
        type="text"
        value={missionTitle}
        onChange={(e) => setMissionTitle(e.target.value)}
        placeholder="예: 하루에 한권 읽기"
        className="w-full !px-1 border-0 border-b-2 border-primary rounded-none shadow-none 
                focus-visible:ring-0 focus:outline-none
                !text-lg font-medium text-left placeholder:text-base placeholder:text-muted-foreground"
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, delay: 0.4 }}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-screen-xl w-full bg-background border-t py-4"
        >
          <div className="px-4">
            <Button
              onClick={() => goToStep(MissionStep.SELECT_MISSION_TYPE)}
              disabled={!isValid}
              className="w-full h-10 font-semibold text-secondary cursor-pointer"
            >
              다음
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
