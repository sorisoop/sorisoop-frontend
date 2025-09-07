import { useMutation } from "@tanstack/react-query";
import { createMission } from "./create";
import type { CreateMissionRequest } from "../models";

export const useCreateMission = () => {
  return useMutation({
    mutationFn: (data: CreateMissionRequest) => createMission(data),
    meta: { displayMode: "toast" },
  });
};
