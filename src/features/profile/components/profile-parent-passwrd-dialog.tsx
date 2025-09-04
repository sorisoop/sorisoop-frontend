import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelectProfile } from "@/entities/profile/api/mutations";
import { useProfileParentPasswordContext } from "@/features/profile/hooks/use-profile-parent-password-context";

export function ProfileParentPasswordDialog() {
  const { open, setOpen, targetId } = useProfileParentPasswordContext();
  const { mutate: selectProfile } = useSelectProfile();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    if (targetId) {
      const payload = password && password.trim() !== "" ? password : null;

      selectProfile(
        { profileId: targetId, password: payload },
        {
          onSuccess: () => {
            setOpen(false);
            navigate("/parents");
          },
          onError: () => {
            toast.error("비밀번호가 올바르지 않습니다.");
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left">비밀번호 확인</DialogTitle>
          <DialogDescription className="sr-only">부모 프로필에 접근하려면 비밀번호를 입력하세요.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleConfirm();
          }}
          className="space-y-4"
        >
          <Input
            type="text"
            name="username"
            autoComplete="username"
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
          />

          <Input
            type="password"
            placeholder="비밀번호 입력"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} className="cursor-pointer" type="button">
              취소
            </Button>
            <Button onClick={handleConfirm} className="text-secondary font-semibold cursor-pointer" type="submit">
              확인
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
