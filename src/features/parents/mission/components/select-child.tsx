import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProfiles } from "@/entities/profile/api/hooks";
import { useMissionFlowContext } from "../hooks";
import { MissionStep } from "../types";
import { Button } from "@/shared/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";

export default function SelectChild() {
  const [selectedChild, setSelectedChild] = useState<number | null>(null);
  const { data: profiles } = useProfiles();
  const { setProfileId, goToStep, step } = useMissionFlowContext();
  const childProfiles = profiles?.filter((p) => p.role === "CHILD") ?? [];

  const handleSelect = () => {
    if (selectedChild) {
      setProfileId(selectedChild);
      goToStep(MissionStep.INPUT_TITLE);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold text-left mt-6">아이를 선택해주세요</h2>
      <p className="text-base text-muted-foreground mt-2 mb-8">선택한 아이 기준으로 미션이 설정됩니다</p>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12 justify-items-start px-2">
        {childProfiles.map((profile) => {
          const isSelected = selectedChild === profile.id;

          return (
            <div key={profile.id} className="flex flex-col items-center gap-3">
              <Avatar
                role="button"
                tabIndex={0}
                aria-label={`${profile.nickname} 프로필 선택`}
                onClick={() => setSelectedChild(profile.id)}
                className={`w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 shadow-md transition-all duration-300 cursor-pointer focus:outline-none
                ${isSelected ? "ring-4 ring-primary" : "ring-2 ring-transparent hover:ring-primary/50"}
                `}
              >
                <AvatarImage
                  src={profile.profileImage ?? "/default.webp"}
                  alt={`${profile.nickname} 프로필 이미지`}
                  className="transition-transform duration-300 hover:scale-105"
                />
                <AvatarFallback aria-hidden>{profile.nickname.charAt(0)}</AvatarFallback>
              </Avatar>

              <span className={`text-sm sm:text-base font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}>
                {profile.nickname}
              </span>
            </div>
          );
        })}
      </div>

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
              onClick={handleSelect}
              disabled={!selectedChild}
              className="w-full h-10 font-semibold text-secondary cursor-pointer"
            >
              선택
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
