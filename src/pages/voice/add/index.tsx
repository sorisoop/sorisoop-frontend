import { useForm, Controller, FormProvider } from "react-hook-form";
import CharacterSelector from "@/features/voice/components/character-selector";
import NameField from "@/features/voice/components/name-field";
import type { CharacterCandidate, VoiceFormValues } from "@/features/voice/types";
import RecordButton from "@/features/voice/components/record-button";
import RecordingDrawer from "@/features/voice/components/recording-drawer";
import BottomActionButton from "@/features/voice/components/bottom-action-button";
import Preview from "@/features/voice/components/preview";
import BackHeaderLayout from "@/shared/layouts/back-header-layout";
import { useAddVoice } from "@/entities/voice/api/mutations";

const CANDIDATES: CharacterCandidate[] = [
  { id: "mom", name: "엄마", avatar: "…" },
  { id: "kid", name: "아이", avatar: "…" },
  { id: "sis", name: "누나", avatar: "…" },
  { id: "dad", name: "아빠", avatar: "…" },
];

export default function VoiceAddPage() {
  const { mutate: addVoice, isPending } = useAddVoice();
  const methods = useForm<VoiceFormValues>({
    defaultValues: {
      title: "",
      imageUrl: CANDIDATES[0].avatar,
      voiceFile: null,
    },
  });
  const { handleSubmit, control } = methods;

  const onSubmit = (data: VoiceFormValues) => {
    if (!data.voiceFile) return;
    console.log("폼 제출 데이터", data);
    addVoice({
      voiceFile: data.voiceFile,
      request: {
        title: data.title,
        imageUrl: data.imageUrl,
      },
    });
  };

  return (
    <BackHeaderLayout title="목소리 추가하기">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="pt-4">
            <RecordingDrawer>
              <Controller
                control={control}
                name="imageUrl"
                render={({ field }) => (
                  <CharacterSelector
                    items={CANDIDATES}
                    selectedId={CANDIDATES.find((c) => c.avatar === field.value)?.id ?? ""}
                    onSelect={(id) => {
                      const candidate = CANDIDATES.find((c) => c.id === id);
                      if (candidate) field.onChange(candidate.avatar);
                    }}
                  />
                )}
              />

              <Controller
                control={control}
                name="title"
                rules={{ required: true }}
                render={({ field }) => <NameField value={field.value} onChange={field.onChange} />}
              />

              <RecordingDrawer.IfRecorded>
                <Preview />
              </RecordingDrawer.IfRecorded>

              <RecordingDrawer.Trigger>
                <RecordButton />
              </RecordingDrawer.Trigger>
              <RecordingDrawer.Content />
            </RecordingDrawer>
          </section>

          <BottomActionButton isPending={isPending} />
        </form>
      </FormProvider>
    </BackHeaderLayout>
  );
}
