import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackHeaderLayout from "@/shared/layouts/back-header-layout";
import CharacterSelector from "@/features/voice/components/character-selector";
import NameField from "@/features/voice/components/name-field";
import { Button } from "@/shared/components/ui/button";
import { SpinnerIcon } from "@/shared/components/ui/spinner";
import { CANDIDATES } from "@/features/voice/constants";
import type { VoiceFormValues } from "@/features/voice/types";
import type { VoiceResponse } from "@/entities/voice/model";
import { useUpdateVoice, useDeleteVoice } from "@/entities/voice/api/mutations";
import { toast } from "sonner";

export default function VoiceEditPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const voice = state?.voice as VoiceResponse | undefined;

  useEffect(() => {
    if (!voice) {
      navigate("/voice");
    }
  }, [voice, navigate]);

  const { control, handleSubmit, watch } = useForm<VoiceFormValues>({
    defaultValues: {
      title: voice?.title ?? "",
      imageUrl: voice?.imageUrl ?? CANDIDATES[0].avatar,
      voiceFile: null,
    },
  });

  const { mutate: updateVoice, isPending: isUpdating } = useUpdateVoice();
  const { mutate: deleteVoice, isPending: isDeleting } = useDeleteVoice();

  const isDisabled = !watch("title") || isUpdating;

  const onSubmit = (data: VoiceFormValues) => {
    if (!voice) return;

    updateVoice(
      {
        voiceId: voice.id,
        request: {
          title: data.title,
          imageUrl: data.imageUrl,
        },
      },
      {
        onSuccess: () => {
          toast.success("목소리가 수정되었습니다!", { position: "top-right" });
          navigate("/voice");
        },
      }
    );
  };

  const handleDelete = () => {
    if (!voice) return;

    deleteVoice(voice.id, {
      onSuccess: () => {
        toast.success("목소리가 삭제되었습니다!", { position: "top-right" });
        navigate("/voice");
      },
    });
  };

  return (
    <BackHeaderLayout
      title="목소리 관리"
      rightButtonLabel={isDeleting ? "삭제 중..." : "삭제"}
      onRightButtonClick={handleDelete}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
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

        <div className="fixed left-0 right-0 bottom-8 sm:bottom-12 mx-auto w-full max-w-screen-xl px-4 md:px-8">
          <Button
            type="submit"
            size="sm"
            disabled={isDisabled}
            className="flex items-center justify-center gap-2 w-full md:w-24 mx-auto h-12 rounded-full text-secondary font-bold cursor-pointer"
          >
            {isUpdating ? (
              <>
                <SpinnerIcon className="w-4 h-4 border-secondary animate-spin" />
                저장 중
              </>
            ) : (
              "수정"
            )}
          </Button>
        </div>
      </form>
    </BackHeaderLayout>
  );
}
