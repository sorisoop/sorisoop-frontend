import { useForm, Controller, FormProvider } from "react-hook-form";
import CharacterSelector from "@/features/voice/components/character-selector";
import NameField from "@/features/voice/components/name-field";
import type { VoiceFormValues } from "@/features/voice/types";
import RecordButton from "@/features/voice/components/record-button";
import RecordingDrawer from "@/features/voice/components/recording-drawer";
import BottomActionButton from "@/features/voice/components/bottom-action-button";
import Preview from "@/features/voice/components/preview";
import BackHeaderLayout from "@/shared/layouts/back-header-layout";
import { useAddVoice } from "@/entities/voice/api/mutations";
import { RecordingSessionProvider } from "@/features/voice/providers";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CANDIDATES } from "@/features/voice/constants";

export default function VoiceAddPage() {
  const navigate = useNavigate();
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
    addVoice(
      {
        voiceFile: data.voiceFile,
        request: {
          title: data.title,
          imageUrl: data.imageUrl,
        },
      },
      {
        onSuccess: () => {
          toast.success("목소리가 등록되었습니다!");
          navigate("/voice");
        },
        onError: () => {
          toast.error("등록에 실패했습니다. 다시 시도해주세요.");
        },
      }
    );
  };

  return (
    <BackHeaderLayout title="목소리 추가하기">
      <RecordingSessionProvider>
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
      </RecordingSessionProvider>
    </BackHeaderLayout>
  );
}
