import { useNavigate } from "react-router-dom";
import {
  InputTitle,
  MissionError,
  MissionFlow,
  MissionFlowTransition,
  SelectChild,
  SelectMission,
} from "@/features/parents/mission/components";
import {
  CategoryMissionFlow,
  CreateFairyTaleMissionFlow,
  SpecificFairyTaleMissionFlow,
} from "@/features/parents/mission/components/flow";
import MissionCompleted from "@/features/parents/mission/components/mission-completed";
import { BackHeaderLayout } from "@/shared/layouts";
import { useMissionFlowContext } from "@/features/parents/mission/hooks";
import { MissionStep } from "@/features/parents/mission/types";

export default function MissionPageContent() {
  const navigate = useNavigate();
  const { step, goBack } = useMissionFlowContext();

  const handleBack = () => {
    if (step === MissionStep.SELECT_CHILD || step === MissionStep.COMPLETED || step === MissionStep.ERROR) {
      navigate(-1);
    } else {
      const canGoBack = goBack();
      if (!canGoBack) {
        navigate(-1);
      }
    }
  };

  return (
    <BackHeaderLayout title="미션 만들기" onBackClick={handleBack}>
      <MissionFlowTransition>
        <MissionFlow>
          <MissionFlow.SelectChild>
            <SelectChild />
          </MissionFlow.SelectChild>
          <MissionFlow.InputTitle>
            <InputTitle />
          </MissionFlow.InputTitle>
          <MissionFlow.SelectMissionType>
            <SelectMission />
          </MissionFlow.SelectMissionType>

          <CategoryMissionFlow />
          <SpecificFairyTaleMissionFlow />
          <CreateFairyTaleMissionFlow />

          <MissionFlow.Completed>
            <MissionCompleted />
          </MissionFlow.Completed>

          <MissionFlow.Error>
            <MissionError />
          </MissionFlow.Error>
        </MissionFlow>
      </MissionFlowTransition>
    </BackHeaderLayout>
  );
}
