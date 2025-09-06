import { useNavigate } from "react-router-dom";
import { ParentsLayout } from "@/shared/layouts/parents";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Progress } from "@/shared/components/ui/progress";
import {
  CheckCircle,
  Book,
  BookOpen,
  Trophy,
  Target,
  TrendingUp,
  ChevronRight,
  User,
  Lightbulb,
  Star,
} from "lucide-react";

export default function ParentsPage() {
  const navigate = useNavigate();

  const stats = {
    totalBooksRead: 24,
    booksReadToday: 2,
    currentReadingGoal: 5,
    weeklyProgress: 80,
  };

  const recentReadings = [
    { id: 1, title: "빨간모자", child: "민수", status: "completed", readTime: "15분", completedAt: "14:30" },
    { id: 2, title: "백설공주", child: "민수", status: "reading", readTime: "8분", startedAt: "19:00" },
    { id: 3, title: "신데렐라", child: "지은", status: "completed", readTime: "12분", completedAt: "16:00" },
  ];

  const children = [
    { name: "민수", age: 7, booksReadToday: 1, dailyGoal: 2, favoriteGenre: "모험", missionProgress: 70 },
    { name: "지은", age: 5, booksReadToday: 1, dailyGoal: 1, favoriteGenre: "공주", missionProgress: 100 },
  ];

  const missions = [
    { id: 1, title: "민수의 9월 미션", progress: 50, target: 2 },
    { id: 2, title: "지은의 9월 미션", progress: 100, target: 1 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "reading":
        return BookOpen;
      default:
        return Book;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "완독";
      case "reading":
        return "읽는중";
      default:
        return "대기";
    }
  };

  return (
    <ParentsLayout>
      <div className="py-6 space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">안녕하세요 👋</h1>
          <p className="text-muted-foreground">오늘도 아이들과 함께 동화책을 읽어보세요</p>
        </div>

        {/* 독서 격려 팁 */}
        <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-primary/10 rounded-xl flex-shrink-0">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">오늘의 독서 팁</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                아이가 책을 다 읽었을 때 "어떤 부분이 가장 재미있었어?"라고 물어보세요. 독서가 대화로 이어져서 더욱
                즐거워집니다!
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div
            className="p-6 bg-background border border-border rounded-xl hover:bg-accent/50 cursor-pointer transition-colors"
            onClick={() => navigate("/parents/missions")}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.booksReadToday}</p>
                <p className="text-sm text-muted-foreground">오늘 읽은 책</p>
              </div>
            </div>
          </div>

          <div
            className="p-6 bg-background border border-border rounded-xl hover:bg-accent/50 cursor-pointer transition-colors"
            onClick={() => navigate("/parents/missions")}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-secondary/50 rounded-lg">
                <Target className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.currentReadingGoal}</p>
                <p className="text-sm text-muted-foreground">주간 목표</p>
              </div>
            </div>
          </div>

          <div
            className="p-6 bg-background border border-border rounded-xl hover:bg-accent/50 cursor-pointer transition-colors"
            onClick={() => navigate("/parents/missions/stats")}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-muted rounded-lg">
                <Trophy className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalBooksRead}</p>
                <p className="text-sm text-muted-foreground">총 읽은 책</p>
              </div>
            </div>
          </div>

          <div
            className="p-6 bg-background border border-border rounded-xl hover:bg-accent/50 cursor-pointer transition-colors"
            onClick={() => navigate("/parents/missions/stats")}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.weeklyProgress}%</p>
                <p className="text-sm text-muted-foreground">주간 달성률</p>
              </div>
            </div>
          </div>
        </div>

        {/* 아이별 현황 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              아이별 현황
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80"
              onClick={() => navigate("/parents/children")}
            >
              전체보기 <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {children.map((child) => (
              <div
                key={child.name}
                className="p-4 bg-background border border-border rounded-xl hover:bg-accent/30 hover:scale-[1.01] cursor-pointer transition-all duration-200"
                onClick={() => navigate(`/parents/children/${child.name.toLowerCase()}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-lg font-medium text-primary">{child.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {child.name} ({child.age}세)
                      </p>
                      <p className="text-sm text-muted-foreground">오늘 {child.booksReadToday}권 읽음</p>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {child.favoriteGenre}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="w-24">
                      <Progress value={child.missionProgress} className="h-2" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">{child.missionProgress}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 미션 현황 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              미션 현황
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80"
              onClick={() => navigate("/parents/missions")}
            >
              전체보기 <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {missions.map((mission) => (
              <div
                key={mission.id}
                className="p-4 bg-background border border-border rounded-xl hover:bg-accent/30 hover:scale-[1.01] cursor-pointer transition-all duration-200"
                onClick={() => navigate(`/parents/missions/${mission.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{mission.title}</p>
                    <p className="text-sm text-muted-foreground">목표 {mission.target}권</p>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="w-32">
                      <Progress value={mission.progress} className="h-2" />
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-muted-foreground">{mission.progress}%</p>
                      {mission.progress === 100 && <CheckCircle className="h-4 w-4 text-primary" />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 최근 독서 활동 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              최근 독서 활동
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80"
              onClick={() => navigate("/parents/history")}
            >
              전체보기 <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-2">
            {recentReadings.map((reading) => {
              const StatusIcon = getStatusIcon(reading.status);
              return (
                <div
                  key={reading.id}
                  className="p-3 bg-background border border-border rounded-lg hover:bg-accent/30 cursor-pointer transition-all duration-200"
                  onClick={() => navigate(`/parents/books/${reading.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <StatusIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{reading.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {reading.child} • {reading.readTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {getStatusText(reading.status)}
                      </Badge>
                      {reading.status === "completed" && <Star className="h-3 w-3 text-primary" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ParentsLayout>
  );
}
