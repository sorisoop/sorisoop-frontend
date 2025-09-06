import { useMissionFlowContext } from "../hooks";
import { MissionStep } from "@/features/parents/mission/types";

function FlowStep({ when, children }: { when: MissionStep; children: React.ReactNode }) {
  const { step } = useMissionFlowContext();
  if (step !== when) return null;
  return <>{children}</>;
}

export default function MissionFlowRoot({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

MissionFlowRoot.SelectChild = ({ children }: { children: React.ReactNode }) => (
  <FlowStep when={MissionStep.SELECT_CHILD}>{children}</FlowStep>
);
MissionFlowRoot.InputTitle = ({ children }: { children: React.ReactNode }) => (
  <FlowStep when={MissionStep.INPUT_TITLE}>{children}</FlowStep>
);
MissionFlowRoot.SelectMissionType = ({ children }: { children: React.ReactNode }) => (
  <FlowStep when={MissionStep.SELECT_MISSION_TYPE}>{children}</FlowStep>
);
MissionFlowRoot.ReadByCategory = ({ children }: { children: React.ReactNode }) => (
  <FlowStep when={MissionStep.READ_BY_CATEGORY}>{children}</FlowStep>
);
MissionFlowRoot.ReadSpecificFairyTale = ({ children }: { children: React.ReactNode }) => (
  <FlowStep when={MissionStep.READ_SPECIFIC_FAIRY_TALE}>{children}</FlowStep>
);
MissionFlowRoot.CreateFairyTale = ({ children }: { children: React.ReactNode }) => (
  <FlowStep when={MissionStep.CREATE_FAIRY_TALE}>{children}</FlowStep>
);
MissionFlowRoot.InputBookCount = ({ children }: { children: React.ReactNode }) => (
  <FlowStep when={MissionStep.INPUT_BOOK_COUNT}>{children}</FlowStep>
);
MissionFlowRoot.InputPeriod = ({ children }: { children: React.ReactNode }) => (
  <FlowStep when={MissionStep.INPUT_PERIOD}>{children}</FlowStep>
);
MissionFlowRoot.Completed = ({ children }: { children: React.ReactNode }) => (
  <FlowStep when={MissionStep.COMPLETED}>{children}</FlowStep>
);
MissionFlowRoot.Error = ({ children }: { children: React.ReactNode }) => (
  <FlowStep when={MissionStep.ERROR}>{children}</FlowStep>
);
export const MissionFlow = MissionFlowRoot;
