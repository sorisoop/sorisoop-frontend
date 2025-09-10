import { useLayoutEffect, useState, useEffect } from "react";
import Joyride from "react-joyride";
import type { Step, CallBackProps } from "react-joyride";

const getMobileSteps = (): Step[] => [
  {
    target: ".mobile-toolbar-color",
    content: "여기서 원하는 색상을 선택하세요",
    disableBeacon: true,
  },
  {
    target: ".mobile-toolbar-brush-eraser",
    content: "필요하면 브러시와 지우개를 바꿀 수 있어요",
    disableBeacon: true,
  },
  {
    target: ".mobile-toolbar-character",
    content: "직접 캐릭터를 그리거나, 제공되는 그림을 참고할 수 있어요.",
    disableBeacon: true,
  },
  {
    target: ".draw-canvas",
    content: "이제 여기에서 캐릭터를 그려주세요!",
    disableBeacon: true,
  },
];

const getDesktopSteps = (): Step[] => [
  {
    target: ".desktop-toolbar-color",
    content: "여기서 원하는 색상을 선택하세요",
    disableBeacon: true,
  },
  {
    target: ".desktop-toolbar-brush-eraser",
    content: "필요하면 브러시와 지우개를 바꿀 수 있어요",
    disableBeacon: true,
  },
  {
    target: ".desktop-toolbar-character",
    content: "직접 캐릭터를 그리거나, 제공되는 그림을 참고할 수 있어요.",
    disableBeacon: true,
  },
  {
    target: ".draw-canvas",
    content: "이제 여기에서 캐릭터를 그려주세요!",
    disableBeacon: true,
  },
];

const useIsLargeScreen = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isLargeScreen;
};

export default function DrawTutorial() {
  const [run, setRun] = useState(false);
  const [tutorialSeen, setTutorialSeen] = useState(false);
  const isLargeScreen = useIsLargeScreen();

  const steps = isLargeScreen ? getDesktopSteps() : getMobileSteps();

  const handleCallback = (data: CallBackProps) => {
    if (data.status === "finished" || data.status === "skipped") {
      setRun(false);
      setTutorialSeen(true);
    }
  };

  useLayoutEffect(() => {
    const startTutorial = () => {
      const targetSelector = isLargeScreen ? ".desktop-toolbar-color" : ".mobile-toolbar-color";
      const targetElement = document.querySelector(targetSelector) as HTMLElement | null;

      if (targetElement && targetElement.offsetParent !== null) {
        setRun(true);
      } else {
        setTimeout(startTutorial, 100);
      }
    };

    const timer = setTimeout(startTutorial, 200);

    return () => clearTimeout(timer);
  }, [isLargeScreen]);

  if (!run || tutorialSeen) return null;

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      locale={{
        back: "이전",
        next: "다음",
        skip: "건너뛰기",
        last: "완료",
      }}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: "#3b82f6",
        },
        tooltip: {
          borderRadius: "8px",
          fontSize: "14px",
        },
        tooltipContent: {
          padding: "12px 16px",
        },
        buttonNext: {
          backgroundColor: "#3b82f6",
          borderRadius: "6px",
          fontSize: "14px",
          padding: "8px 16px",
        },
        buttonSkip: {
          color: "#6b7280",
          fontSize: "14px",
        },
      }}
      callback={handleCallback}
    />
  );
}
