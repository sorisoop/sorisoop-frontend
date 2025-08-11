import { useState } from "react";
import CharacterSelector from "@/features/voice/components/character-selector";
import NameField from "@/features/voice/components/name-field";
import type { CharacterCandidate } from "@/features/voice/types";
import RecordButton from "@/features/voice/components/record-button";
import RecordingDrawer from "@/features/voice/components/recording-drawer";
import BottomActionButton from "@/features/voice/components/bottom-action-button";
import Preview from "@/features/voice/components/preview";
import BackHeaderLayout from "@/shared/layouts/back-header-layou";

const CANDIDATES: CharacterCandidate[] = [
  {
    id: "mom",
    name: "엄마",
    avatar: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?q=80&w=400&auto=format&fit=crop&h=400",
  },
  {
    id: "kid",
    name: "아이",
    avatar: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?q=80&w=400&auto=format&fit=crop&h=400",
  },
  {
    id: "sis",
    name: "누나",
    avatar: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=400&auto=format&fit=crop&h=400",
  },
  {
    id: "dad",
    name: "아빠",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop&h=400",
  },
];

export default function VoiceNewPage() {
  const [selectedId, setSelectedId] = useState<string>(CANDIDATES[0].id);
  const [name, setName] = useState("");
  const [recordOpen, setRecordOpen] = useState(false);

  return (
    <BackHeaderLayout title="목소리 추가하기">
      <section className="pt-4">
        <RecordingDrawer open={recordOpen} onOpenChange={setRecordOpen}>
          <CharacterSelector items={CANDIDATES} selectedId={selectedId} onSelect={setSelectedId} />
          <NameField value={name} onChange={setName} />

          <RecordingDrawer.IfRecorded>
            <Preview />
          </RecordingDrawer.IfRecorded>

          <RecordingDrawer.Trigger>
            <RecordButton />
          </RecordingDrawer.Trigger>
          <RecordingDrawer.Content />
        </RecordingDrawer>
      </section>
      <BottomActionButton />
    </BackHeaderLayout>
  );
}
