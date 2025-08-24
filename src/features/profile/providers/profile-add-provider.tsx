import { useState } from "react";
import { ProfileAddContext } from "../contexts";

export function ProfileAddProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);

  return <ProfileAddContext.Provider value={{ isOpen, setOpen }}>{children}</ProfileAddContext.Provider>;
}
