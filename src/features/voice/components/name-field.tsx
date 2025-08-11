import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";

type NameFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function NameField({ value, onChange }: NameFieldProps) {
  return (
    <>
      <div className="grid md:grid-cols-12 md:items-center">
        <div className="md:col-span-4 self-center">
          <label htmlFor="voice-name" className="text-base md:text-lg font-semibold block">
            이름
          </label>
          <p className="hidden md:block text-sm text-muted-foreground">7자 이내의 한글, 영문만 입력이 가능합니다.</p>
        </div>

        <div className="md:col-span-8">
          <div className="md:flex md:justify-end">
            <div className="w-full md:max-w-sm lg:max-w-md border-b border-input md:border-b-0 focus-within:border-primary md:focus-within:border-transparent transition-colors">
              <Input
                id="voice-name"
                placeholder="이름 입력 (예: 엄마)"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={cn(
                  "h-12 w-full",
                  "text-left md:text-right",
                  "placeholder:text-muted-foreground md:[&::placeholder]:text-right",
                  "border-none rounded-none bg-transparent px-0 py-0 shadow-none",
                  "focus:outline-none focus:ring-0 focus-visible:ring-0"
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 border-0 md:border-b border-border" />
    </>
  );
}
