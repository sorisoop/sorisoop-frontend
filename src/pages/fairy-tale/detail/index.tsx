import { useParams } from "react-router-dom";

import { FairyTaleDetailDesktop, FairyTaleDetailMobile, FairyTaleDetailView } from "@/features/fairy-tale/components";

import { PICKS } from "@/entities/fairy-tale/api/fairy-tale";

export default function FairyTaleDetailPage() {
  const { id } = useParams();
  const fairyTale = PICKS.find((t) => String(t.id) === id);
  if (!fairyTale) return <div className="p-4">동화를 찾을 수 없습니다.</div>;

  return (
    <FairyTaleDetailView>
      <FairyTaleDetailView.isMobile>
        <FairyTaleDetailMobile fairyTale={fairyTale} />
      </FairyTaleDetailView.isMobile>

      <FairyTaleDetailView.isDeskTop>
        <FairyTaleDetailDesktop fairyTale={fairyTale} />
      </FairyTaleDetailView.isDeskTop>
    </FairyTaleDetailView>
  );
}
