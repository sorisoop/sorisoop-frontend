import { InputPeriod, MissionFlow, ReadSpecificFairyTale } from "@/features/parents/mission/components";

export default function SpecificFairyTaleMissionFlow() {
  return (
    <>
      <MissionFlow.ReadSpecificFairyTale>
        <ReadSpecificFairyTale />
      </MissionFlow.ReadSpecificFairyTale>
      <MissionFlow.InputPeriod>
        <InputPeriod />
      </MissionFlow.InputPeriod>
    </>
  );
}
