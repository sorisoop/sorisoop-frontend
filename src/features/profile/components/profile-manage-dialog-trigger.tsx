import { useProfileManageDialogContext } from "../hooks";

export function ProfileManageDialogTrigger({ children }: { children: React.ReactElement }) {
  const { setOpen } = useProfileManageDialogContext();

  return (
    <div
      onClick={() => setOpen(true)}
      className="text-center cursor-pointer font-semibold text-secondary"
      role="button"
    >
      {children}
    </div>
  );
}
