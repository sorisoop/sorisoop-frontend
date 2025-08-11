import RecordingDrawerRoot from "./root";
import RecordingDrawerTrigger from "./trigger";
import RecordingDrawerContent from "./content";
import RecordingDrawerIfRecorded from "./if-recorded";

const RecordingDrawer = Object.assign(RecordingDrawerRoot, {
  Trigger: RecordingDrawerTrigger,
  Content: RecordingDrawerContent,
  IfRecorded: RecordingDrawerIfRecorded,
});

export default RecordingDrawer;
