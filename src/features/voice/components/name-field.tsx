import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";

type NameFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function NameField({ value, onChange }: NameFieldProps) {
  return (
    <>
      <div className="grid sm:grid-cols-12 sm:items-center">
        <div className="sm:col-span-4 self-center">
          <label htmlFor="voice-name" className="text-base sm:text-lg font-semibold block">
            이름
          </label>
          <p className="hidden sm:block text-sm text-muted-foreground">7자 이내의 한글, 영문만 입력이 가능합니다.</p>
        </div>

        <div className="sm:col-span-8">
          <div className="sm:flex sm:justify-end">
            <div className="w-full sm:max-w-sm lg:max-w-md border-b border-input sm:border-b-0 focus-within:border-primary sm:focus-within:border-transparent transition-colors">
              <Input
                id="voice-name"
                placeholder="이름 입력 (예: 엄마)"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={cn(
                  "h-12 w-full",
                  "text-left sm:text-right",
                  "placeholder:text-muted-foreground sm:[&::placeholder]:text-right",
                  "border-none rounded-none bg-transparent px-0 py-0 shadow-none",
                  "focus:outline-none focus:ring-0 focus-visible:ring-0"
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 border-0 sm:border-b border-border" />
    </>
  );
}
