import { BackHeaderLayout } from "@/shared/layouts";
import { useState } from "react";
import { useChildrenProfiles } from "@/entities/profile/api/hooks";

type ChildProfile = {
  id: number;
  nickname: string;
  profileImage: string;
};

type Props = {
  onSelectComplete: (profileId: number) => void;
};

export default function SelectChild({ onSelectComplete }: Props) {
  const [selectedChild, setSelectedChild] = useState<number | null>(null);
  const { data: childProfiles } = useChildrenProfiles();

  return (
    <BackHeaderLayout title="미션 만들기">
      <div className="flex flex-col min-h-[calc(100vh-52px)]">
        <div className="flex-1 pt-6 md:pt-8 pb-24">
          <div className="text-base font-bold mb-6 md:mb-8 text-center">
            아이를 선택해주세요.
          </div>

          {childProfiles && (
            <div className="flex justify-center">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-12 md:gap-x-14 md:gap-y-16 px-4 max-w-7xl">
                {childProfiles.map((profile: ChildProfile) => {
                  const isSelected = selectedChild === profile.id;

                  return (
                    <button
                      key={profile.id}
                      onClick={() => setSelectedChild(profile.id)}
                      className={`
                        flex flex-col items-center justify-center
                        rounded-2xl border transition duration-200
                        ${
                          isSelected
                            ? "border-yellow-400 bg-yellow-100 shadow-md"
                            : "border-gray-300 bg-white"
                        }
                        w-full
                        aspect-[3/4]
                        max-w-[200px]
                        sm:max-w-[240px]
                        md:max-w-[280px]
                        lg:max-w-[320px]
                        p-4 sm:p-5 md:p-6
                      `}
                    >
                      <img
                        src={profile.profileImage}
                        alt={profile.nickname}
                        draggable={false}
                        className="rounded-full object-cover mb-3 sm:mb-4 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 transition-all"
                      />
                      <span className="text-sm sm:text-base font-semibold">
                        {profile.nickname}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-screen-xl bg-white border-t py-4">
          <div className="px-4">
            <button
              onClick={() => selectedChild && onSelectComplete(selectedChild)}
              disabled={!selectedChild}
              className={`w-full py-3 rounded-xl font-semibold text-white transition ${selectedChild ? "bg-yellow-400" : "bg-gray-300"}`}
            >
              선택
            </button>
          </div>
        </div>
      </div>
    </BackHeaderLayout>
  );
}