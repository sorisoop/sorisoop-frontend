import { CreateFairyTale, InputPeriod, MissionFlow } from "@/features/parents/mission/components";

export default function CreateFairyTaleMissionFlow() {
  return (
    <>
      <MissionFlow.CreateFairyTale>
        <CreateFairyTale />
      </MissionFlow.CreateFairyTale>
      <MissionFlow.InputPeriod>
        <InputPeriod />
      </MissionFlow.InputPeriod>
    </>
  );
}
