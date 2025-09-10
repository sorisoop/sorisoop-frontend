import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Camera } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";
import type { ProfileResponse } from "@/entities/profile/model";
import { useProfileManageDialogContext } from "../hooks";
import { useUpdateProfile } from "@/entities/profile/api/mutations";
import { toast } from "sonner";
import { SpinnerIcon } from "@/shared/components/ui/spinner";
import type { AddProfileFormSubmit } from "./profile-add-form";

const updateProfileSchema = z.object({
  id: z.number().int(),
  nickname: z.string().min(1, "닉네임을 입력해주세요"),
  role: z.enum(["PARENT", "CHILD"]),
  age: z.number().int().min(1, "나이를 입력해주세요"),
  gender: z.enum(["M", "F"]),
  profileImage: z.string().nullable().optional(),
});

type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
export type UpdateProfileFormSubmit = Omit<AddProfileFormSubmit, "password"> & { id: number };

export default function ProfileManageDialogUpdate({ profile }: { profile: ProfileResponse }) {
  const { setSelectedProfile } = useProfileManageDialogContext();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      id: profile.id,
      nickname: profile.nickname,
      role: profile.role,
      age: profile.age,
      gender: profile.gender,
      profileImage: profile.profileImage,
    },
    mode: "onChange",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const profileImage = watch("profileImage");
  const role = watch("role");
  const gender = watch("gender");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profileImage", URL.createObjectURL(file), { shouldValidate: true });
      setImageFile(file);
    }
  };

  const onSubmit = (data: UpdateProfileFormValues) => {
    updateProfile(
      { ...data, file: imageFile },
      {
        onSuccess: () => {
          setSelectedProfile(null);
          toast.success("프로필이 수정되었습니다", { position: "top-right" });
        },
      }
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full px-2">
      <div className="flex justify-center">
        <div className="relative w-24 h-24 mb-2">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profileImage || "/placeholder.png"} alt="프로필 이미지" />
            <AvatarFallback>프로필</AvatarFallback>
          </Avatar>
          <Label
            htmlFor="profileImage"
            className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow"
          >
            <Input type="file" accept="image/*" id="profileImage" onChange={handleImageChange} className="hidden" />
            <Camera className="!w-4 !h-4 text-secondary" />
          </Label>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="nickname">닉네임</Label>
        <Input id="nickname" placeholder="닉네임" {...register("nickname")} />
      </div>

      <div className="space-y-2">
        <Label>프로필 유형</Label>
        <div className="grid grid-cols-2 gap-3">
          {["PARENT", "CHILD"].map((v) => (
            <Button
              key={v}
              type="button"
              variant="outline"
              onClick={() => setValue("role", v as "PARENT" | "CHILD", { shouldValidate: true })}
              className={cn("cursor-pointer h-10 border-border", role === v && "border-primary text-primary")}
            >
              {v === "PARENT" ? "부모" : "아이"}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>성별</Label>
        <div className="grid grid-cols-2 gap-3">
          {["M", "F"].map((v) => (
            <Button
              key={v}
              type="button"
              variant="outline"
              onClick={() => setValue("gender", v as "M" | "F", { shouldValidate: true })}
              className={cn("cursor-pointer h-10 border-border", gender === v && "border-primary text-primary")}
            >
              {v === "M" ? "남" : "여"}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="age">나이</Label>
        <Input
          id="age"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="나이 입력"
          {...register("age", { valueAsNumber: true })}
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
          }}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setSelectedProfile(null)}
          disabled={isPending}
          className="cursor-pointer border-border"
        >
          뒤로
        </Button>
        <Button type="submit" disabled={!isValid || isPending} className="cursor-pointer text-secondary font-semibold">
          {isPending ? (
            <div className="flex items-center gap-2">
              <SpinnerIcon className="border-secondary" />
            </div>
          ) : (
            "저장하기"
          )}
        </Button>
      </div>
    </form>
  );
}
