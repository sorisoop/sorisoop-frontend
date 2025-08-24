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

const addProfileSchema = z.object({
  nickname: z.string().min(1, "닉네임을 입력해주세요"),
  role: z.enum(["PARENT", "CHILD"]),
  age: z.coerce.number().int().min(1, "나이를 입력해주세요"),
  gender: z.enum(["M", "F"]),
  profileImage: z.string().nullable().optional(),
});

export type AddProfileFormValues = z.infer<typeof addProfileSchema>;

export interface AddProfileFormSubmit extends AddProfileFormValues {
  file?: File | null;
}

const genderOptions: Array<{ value: "M" | "F"; label: string }> = [
  { value: "M", label: "남" },
  { value: "F", label: "여" },
];

const roleOptions: Array<{ value: "PARENT" | "CHILD"; label: string }> = [
  { value: "PARENT", label: "부모" },
  { value: "CHILD", label: "아이" },
];

export function ProfileAddForm({
  onSubmit,
  isPending,
}: {
  onSubmit: (data: AddProfileFormSubmit) => void;
  isPending: boolean;
}) {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(addProfileSchema),
    defaultValues: {
      nickname: "",
      role: "CHILD",
      age: 1,
      gender: "M",
      profileImage: null,
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

  const onFormSubmit = (data: AddProfileFormValues) => {
    const submitData: AddProfileFormSubmit = {
      ...data,
      file: imageFile,
    };
    onSubmit(submitData);
  };

  return (
    <form
      id="add-profile-form"
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex-1 grid gap-6 w-full max-w-limit mx-auto"
    >
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
            <Camera className="w-4 h-4 text-primary-foreground" />
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
          {roleOptions.map(({ value, label }) => (
            <Button
              key={value}
              type="button"
              variant="outline"
              onClick={() => setValue("role", value, { shouldValidate: true })}
              className={cn("cursor-pointer h-10", role === value && "border-primary text-primary")}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>성별</Label>
        <div className="grid grid-cols-2 gap-3">
          {genderOptions.map(({ value, label }) => (
            <Button
              key={value}
              type="button"
              variant="outline"
              onClick={() => setValue("gender", value, { shouldValidate: true })}
              className={cn("cursor-pointer h-10", gender === value && "border-primary text-primary")}
            >
              {label}
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
          {...register("age")}
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
          }}
        />
      </div>

      <Button type="submit" disabled={!isValid || isPending} className="w-full">
        {isPending ? "추가 중..." : "추가하기"}
      </Button>
    </form>
  );
}
