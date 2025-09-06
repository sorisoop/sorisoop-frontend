import { InputBookCount, InputPeriod, MissionFlow, ReadByCategory } from "@/features/parents/mission/components";

export default function CategoryMissionFlow() {
  return (
    <>
      <MissionFlow.ReadByCategory>
        <ReadByCategory />
      </MissionFlow.ReadByCategory>
      <MissionFlow.InputBookCount>
        <InputBookCount />
      </MissionFlow.InputBookCount>
      <MissionFlow.InputPeriod>
        <InputPeriod />
      </MissionFlow.InputPeriod>
    </>
  );
}
