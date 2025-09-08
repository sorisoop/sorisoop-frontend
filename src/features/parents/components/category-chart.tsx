import { useState } from "react";
import { Bar, BarChart, XAxis, YAxis, LabelList, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { ChartContainer } from "@/shared/components/ui/chart";
import { useCategoryStatistics } from "@/entities/statistics/api/hooks";

export default function CategoryChart({ childId, nickname }: { childId: number; nickname: string }) {
  const { data: categories } = useCategoryStatistics(childId);
  const [duration, setDuration] = useState(30);

  const selected = categories.find((c) => c.duration === duration);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{nickname} 카테고리별 읽기 통계</CardTitle>
        <Select value={String(duration)} onValueChange={(v) => setDuration(Number(v))}>
          <SelectTrigger className="w-24 h-8 text-xs">
            <SelectValue placeholder="기간 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">30일</SelectItem>
            <SelectItem value="90">90일</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {selected ? (
          <ChartContainer
            config={{
              readCount: { label: "읽은 횟수", color: "var(--chart-1)" },
            }}
          >
            <BarChart
              accessibilityLayer
              data={selected.categoryStatisticsDtoList}
              layout="vertical"
              margin={{ right: 16 }}
            >
              <XAxis type="number" dataKey="readCount" hide />
              <YAxis dataKey="categoryName" type="category" tickLine={false} tickMargin={16} axisLine={false} />
              <Bar dataKey="readCount" radius={5}>
                {selected.categoryStatisticsDtoList.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "var(--chart-1)" : "var(--chart-5)"} />
                ))}
                <LabelList
                  dataKey="categoryName"
                  position="insideLeft"
                  offset={8}
                  className="fill-white"
                  fontSize={12}
                />
                <LabelList dataKey="readCount" position="right" className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          </ChartContainer>
        ) : (
          <p className="text-sm text-muted-foreground">데이터 없음</p>
        )}
      </CardContent>
    </Card>
  );
}
