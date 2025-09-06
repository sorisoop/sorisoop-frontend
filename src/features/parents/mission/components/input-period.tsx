import { useEffect, useState } from "react";
import { Calendar, ChevronRight, Clock } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Picker from "react-mobile-picker";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerDescription,
} from "@/shared/components/ui/drawer";
import { useMissionFlowContext } from "@/features/parents/mission/hooks";
import { useCreateMission } from "@/entities/mission/api/mutations";
import { SpinnerIcon } from "@/shared/components/ui/spinner";
import { MissionStep } from "@/features/parents/mission/types";

export default function InputPeriod() {
  const {
    step,
    missionTitle,
    profileId,
    missionType,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    goToStep,
    targetFairyTaleIds,
    targetCategoryId,
    targetCount,
  } = useMissionFlowContext();
  const [open, setOpen] = useState<"start" | "end" | null>(null);
  const [lastOpen, setLastOpen] = useState<"start" | "end">("start");
  const { mutateAsync: createMission, isPending } = useCreateMission();

  const formatDateToLocal = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    if (!profileId || !missionType) return;

    const payload = {
      title: missionTitle,
      childProfileId: profileId,
      missionType,
      startDate: startDate ? formatDateToLocal(startDate) : null,
      endDate: endDate ? formatDateToLocal(endDate) : null,
      targetFairyTaleIds: missionType === "READ_BOOK" ? targetFairyTaleIds : null,
      targetCategoryId: missionType === "READ_CATEGORY" ? targetCategoryId : null,
      targetCount: missionType === "READ_CATEGORY" || missionType === "CREATE_FAIRY_TALE" ? targetCount : null,
    };

    try {
      await createMission(payload);
      goToStep(MissionStep.COMPLETED);
    } catch {
      goToStep(MissionStep.ERROR);
    }
  };

  useEffect(() => {
    if (open) setLastOpen(open);
  }, [open]);

  const [pickerValue, setPickerValue] = useState({
    year: String(new Date().getFullYear()),
    month: String(new Date().getMonth() + 1),
    day: String(new Date().getDate()),
  });

  const toDate = () => new Date(Number(pickerValue.year), Number(pickerValue.month) - 1, Number(pickerValue.day));

  const handleConfirm = () => {
    const date = toDate();
    if (open === "start") setStartDate(date);
    if (open === "end") setEndDate(date);
    setOpen(null);
  };

  const isValid = !!startDate && !!endDate && endDate > startDate;

  const handlePickerTouch = (e: React.TouchEvent<HTMLDivElement> | React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold mt-6">미션 기간을 선택해주세요</h2>
      <p className="text-base text-muted-foreground mt-2 mb-6">시작일과 마감일을 차례대로 선택하세요</p>

      <div className="">
        <div className="group cursor-pointer" onClick={() => setOpen("start")}>
          <div className="flex items-center justify-between pb-4 rounded transition-all duration-200 hover:border-primary bg-background">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">시작일</p>
                <p className="text-base font-semibold text-foreground">
                  {startDate ? format(startDate, "yyyy년 M월 d일 (EEE)", { locale: ko }) : "날짜를 선택해주세요"}{" "}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>

        <div className="group cursor-pointer" onClick={() => setOpen("end")}>
          <div className="flex items-center justify-between pt-4 rounded transition-all duration-200 hover:border-primary bg-background">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-destructive/10">
                <Clock className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">마감일</p>
                <p className="text-base font-semibold text-foreground">
                  {endDate ? format(endDate, "yyyy년 M월 d일 (EEE)", { locale: ko }) : "날짜를 선택해주세요"}{" "}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>

      <Drawer open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DrawerContent className="p-0 overflow-hidden" data-vaul-no-drag="true" data-swipe-direction="none">
          <DrawerHeader className="px-4 py-2">
            <DrawerTitle className="transition-opacity duration-200">
              {lastOpen === "start" ? "시작일 선택" : "마감일 선택"}
            </DrawerTitle>
            <DrawerDescription className="sr-only">
              {lastOpen === "start" ? "시작일 선택" : "마감일 선택"}
            </DrawerDescription>
          </DrawerHeader>

          <div
            className="flex justify-between gap-6 px-6"
            onTouchStart={handlePickerTouch}
            onTouchMove={handlePickerTouch}
            onTouchEnd={handlePickerTouch}
            onPointerDown={handlePickerTouch}
            onPointerMove={handlePickerTouch}
            onPointerUp={handlePickerTouch}
          >
            <Picker
              value={pickerValue}
              onChange={setPickerValue}
              height={200}
              itemHeight={40}
              wheelMode="normal"
              className="flex w-full"
            >
              <Picker.Column name="year" className="flex-1 text-center">
                {Array.from({ length: 5 }, (_, i) => {
                  const y = new Date().getFullYear() + i;
                  return (
                    <Picker.Item key={y} value={String(y)}>
                      {({ selected }) => (
                        <div className={selected ? "text-primary font-bold" : "text-foreground"}>{y}년</div>
                      )}
                    </Picker.Item>
                  );
                })}
              </Picker.Column>

              <Picker.Column name="month" className="flex-1 text-center">
                {Array.from({ length: 12 }, (_, i) => {
                  const m = i + 1;
                  return (
                    <Picker.Item key={m} value={String(m)}>
                      {({ selected }) => (
                        <div className={selected ? "text-primary font-bold" : "text-foreground"}>{m}월</div>
                      )}
                    </Picker.Item>
                  );
                })}
              </Picker.Column>

              <Picker.Column name="day" className="flex-1 text-center">
                {Array.from({ length: 31 }, (_, i) => {
                  const d = i + 1;
                  return (
                    <Picker.Item key={d} value={String(d)}>
                      {({ selected }) => (
                        <div className={selected ? "text-primary font-bold" : "text-foreground"}>{d}일</div>
                      )}
                    </Picker.Item>
                  );
                })}
              </Picker.Column>
            </Picker>
          </div>

          <DrawerFooter>
            <Button onClick={handleConfirm} className="cursor-pointer text-secondary font-semibold">
              확인
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, delay: 0.4 }}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-screen-xl w-full bg-background py-4 border-t"
        >
          <div className="px-4">
            <Button
              disabled={!isValid || isPending}
              onClick={handleSubmit}
              className="w-full h-10 font-semibold text-secondary cursor-pointer"
            >
              {isPending ? (
                <>
                  <SpinnerIcon className="w-4 h-4 border-secondary animate-spin" />
                  미션 생성 중
                </>
              ) : (
                "완료"
              )}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
